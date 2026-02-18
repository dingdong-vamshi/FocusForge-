const ScoringStrategy = require('./ScoringStrategy');

class StandardScoringStrategy extends ScoringStrategy {
    calculate(productiveTime, totalTime) {
        if (!totalTime || totalTime === 0) return 0;
        const score = (productiveTime / totalTime) * 100;
        return Math.min(Math.round(score), 100);
    }
}

module.exports = StandardScoringStrategy;
