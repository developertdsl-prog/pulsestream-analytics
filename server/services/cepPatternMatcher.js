const CepPatternRule = require('../models/CepPatternRule');
const logger = require('../utils/logger');

class CepPatternMatcher {
  /**
   * Evaluates sequential pattern rules across a window of recent events.
   * Example: LoginFailed -> LoginFailed -> AdminAccess (Brute force pattern)
   */
  static async evaluatePatterns(pipelineId, recentEvents) {
    const rules = await CepPatternRule.find({ isEnabled: true });
    const triggeredAlerts = [];

    if (!recentEvents || recentEvents.length === 0 || rules.length === 0) {
      return triggeredAlerts;
    }

    const sortedEvents = [...recentEvents].sort((a, b) => new Date(a.eventTimestamp) - new Date(b.eventTimestamp));

    for (const rule of rules) {
      const sequence = rule.eventSequence;
      if (sequence.length === 0) continue;

      let currentSeqIdx = 0;
      let matchedEvents = [];
      let seqStartTime = null;

      for (const ev of sortedEvents) {
        const expected = sequence[currentSeqIdx];
        const eventType = ev.payload?.eventType || ev.payload?.type;

        if (eventType === expected.eventType) {
          if (currentSeqIdx === 0) {
            seqStartTime = new Date(ev.eventTimestamp).getTime();
          }

          const evTime = new Date(ev.eventTimestamp).getTime();
          if (evTime - seqStartTime <= rule.timeWindowMs) {
            matchedEvents.push(ev);
            currentSeqIdx++;

            if (currentSeqIdx === sequence.length) {
              // Full sequence matched within time window!
              const alert = {
                alertId: `ALERT-${Date.now()}-${rule.ruleId}`,
                ruleId: rule.ruleId,
                ruleName: rule.ruleName,
                severity: rule.severity,
                action: rule.action,
                matchedEventsCount: matchedEvents.length,
                detectedAt: new Date().toISOString()
              };

              logger.warn(`CEP Pattern Triggered: '${rule.ruleName}' [Severity: ${rule.severity}]`);
              triggeredAlerts.push(alert);
              break;
            }
          } else {
            // Window expired -> reset state machine
            currentSeqIdx = 0;
            matchedEvents = [];
          }
        }
      }
    }

    return triggeredAlerts;
  }
}

module.exports = CepPatternMatcher;
