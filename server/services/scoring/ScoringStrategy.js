/**
 * Strategy Interface for Productivity Scoring
 */
class ScoringStrategy {
    calculate(productiveTime, totalTime) {
        throw new Error("Method 'calculate()' must be implemented.");
    }
}

module.exports = ScoringStrategy;
