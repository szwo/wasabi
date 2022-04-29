import { IndividualRoundScore } from 'hooks/useScores';

/**
 * Helper function for generating Maki frequency map to player IDs
 * @param {Record<string, IndividualRoundScore>} recordedScores scores from the current round to parse for Maki counts
 * @returns {Record<string, Array<string>>} Frequency map showing maki counts and corresponding player ids
 */
const collectMakiCounts = (recordedScores: Record<string, IndividualRoundScore>): Record<string, Array<string>> => {
    const makiCounts: Record<string, Array<string>> = {};

    for (const [playerId, scores] of Object.entries(recordedScores)) {
        const playerMakiCount = scores.makiQty;
        if (playerMakiCount > 0) {
            if (makiCounts[playerMakiCount]) {
                makiCounts[playerMakiCount].push(playerId);
            } else {
                makiCounts[playerMakiCount] = [playerId];
            }
        }
    }

    return makiCounts;
};

/**
 * Helper function for distributing points from Maki winners
 * Updates makiScore for Maki winners
 * @param {number} totalPoints Total points to be distributed (6 for first, 3 for second)
 * @param {Array<string>} winners List of player ids in each Maki group
 * @param {Record<string,number>} makiWinners distribution of Maki winners to points to be awarded, populated by this function
 */
const updateMakiPoints = (totalPoints: number, winners: string[], makiWinners: Record<string, number>) => {
    const points = Math.floor(totalPoints / winners.length);

    for (const winnerId of winners) {
        makiWinners[winnerId] = points;
    }
};

/**
 * Determine who has the most/second most maki count
 * First place gets 6 points added to their score
 * Second place gets 3 points added to their score
 * In a tie, the points are split between those in the tie
 * For odd numbered ties, the points are split rounding down
 * @param {Record<string, IndividualRoundScore>} recordedScores scores from the current round to parse for Maki counts
 * @returns {Record<string,number>} distribution of Maki winners to points to be awarded
 */
export const calculateMakiWinners = (recordedScores: Record<string, IndividualRoundScore>): Record<string, number> => {
    const distribution = collectMakiCounts(recordedScores);
    const orderedKeys = Object.keys(distribution).sort((a, b) => parseInt(b) - parseInt(a));

    const firstPlace = orderedKeys[0];
    const firstPlaceWinners = distribution[firstPlace] || [];

    const makiWinners: Record<string, number> = {};

    if (firstPlaceWinners.length) {
        updateMakiPoints(6, firstPlaceWinners, makiWinners);
    }

    if (orderedKeys.length > 1) {
        const secondPlace = orderedKeys[1];
        const secondPlaceWinners = distribution[secondPlace] || [];
        updateMakiPoints(3, secondPlaceWinners, makiWinners);
    }

    return makiWinners;
};
