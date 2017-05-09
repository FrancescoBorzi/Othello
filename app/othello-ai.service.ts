import { Injectable } from 'angular-ts-decorators';
import {OthelloHandlerService} from "./othello-handler.service";

@Injectable('OthelloAIService')
export class OthelloAIService {

    private handler: OthelloHandlerService;

    /**
     * @param {OthelloHandlerService} OthelloHandlerService
     */
    constructor(private OthelloHandlerService: OthelloHandlerService) {
        this.handler = OthelloHandlerService;
    }

    /**
     * Calculates the best move for the player id
     * returns Coord or null if there are no moves available
     *
     * @param matrix
     * @param id
     * @returns {Coord|null}
     */
    calculateMove(matrix: number[][], id: number): Coord|null {

        // if one of the edges is available, let's return it
        let edgeCoords = this.checkEdges(matrix, id);
        if (edgeCoords) {
            return edgeCoords;
        }

        // p1 is the player who we are calculating the move for, p2 the opponent
        let p1: number, p2: number;

        if (id == 1) {
            p1 = 1;
            p2 = 2;
        }
        else {
            p1 = 2;
            p2 = 1;
        }

        // generate the available moves
        let moves: CoordScore[] = [];
        let movesCount = 0;

        for (let m = 1; m <= 8; m = (m + 1)) {
            for (let n = 1; n <= 8; n = (n + 1)) {
                if (this.handler.stepControl(matrix, m, n, id)) {
                    moves[movesCount] = {
                        x: m,
                        y: n,
                        score: 0
                    };
                    movesCount++;
                }
            }
        }

        // if there are no moves available, just return null
        if (!movesCount) {
            return null;
        }

        // calculate the basic move scores for all the 8 directions (up, down, right, left, up-right, etc..)
        for (let k = 0; k < movesCount; k++) {
            moves[k].score += this.calculateScoreDirection1(moves[k], matrix, p1, p2);
            moves[k].score += this.calculateScoreDirection2(moves[k], matrix, p1, p2);
            moves[k].score += this.calculateScoreDirection3(moves[k], matrix, p1, p2);
            moves[k].score += this.calculateScoreDirection4(moves[k], matrix, p1, p2);
            moves[k].score += this.calculateScoreDirection5(moves[k], matrix, p1, p2);
            moves[k].score += this.calculateScoreDirection6(moves[k], matrix, p1, p2);
            moves[k].score += this.calculateScoreDirection7(moves[k], matrix, p1, p2);
            moves[k].score += this.calculateScoreDirection8(moves[k], matrix, p1, p2);
        }

        // update the move scores considering the board sides
        this.calculateSideScore(moves);

        let max_k = this.getMaxScoreMove( moves);

        return { x: moves[max_k].x, y: moves[max_k].y};
    };

    /**
     * Checks if player id can move on one of the four edges
     * returning its coordinates (Coord) if that's the case or null if it's not
     *
     * @param matrix
     * @param id
     * @returns {Coord|null}
     */
    private checkEdges(matrix: number[][], id: number): Coord|null {

        if (this.handler.stepControl(matrix, 1, 8, id)) {
            return { x: 1, y: 8};
        }
        else if (this.handler.stepControl(matrix, 8, 1, id)) {
            return { x: 8, y: 1};
        }
        else if (this.handler.stepControl(matrix, 1, 1, id)) {
            return { x: 1, y: 1};
        }
        else if (this.handler.stepControl(matrix, 8, 8, id)) {
            return { x: 8, y: 8};
        } else {
            return null;
        }
    }

    /**
     * Takes in input a CoordScore array and returns the index with the highest score
     *
     * @param moves
     * @returns {number}
     */
    private getMaxScoreMove(moves: CoordScore[]) {
        let max_k = 0;

        for (let k = 0; k < moves.length; k = (k + 1)) {
            if (moves[k].score > moves[max_k].score) {
                max_k = k;
            }
        }
        return max_k;
    }

    /**
     * Takes in input the moves array holding CordScore values and:
     * - adds 100 score points if the move is on the sides of the board
     * - removes 100 score points if the move is adjacent to the sides
     * - removes additional 50 score points if the move is adjacent to an edge
     *
     * @param moves
     */
    private calculateSideScore(moves: CoordScore[]) {
        for (let k = 0; k < moves.length; k = (k + 1)) {
            if (
                (moves[k].x == 1) ||
                (moves[k].x == 8) ||
                (moves[k].y == 1) ||
                (moves[k].y == 8)
            ) {
                moves[k].score += 100;
            }
            else if (
                (moves[k].x == 2) ||
                (moves[k].x == 7) ||
                (moves[k].y == 2) ||
                (moves[k].y == 7)
            ) {
                moves[k].score -= 100;

                if (
                    ((moves[k].x == 2) && (moves[k].y == 2)) ||
                    ((moves[k].x == 2) && (moves[k].y == 7)) ||
                    ((moves[k].x == 7) && (moves[k].y == 2)) ||
                    ((moves[k].x == 7) && (moves[k].y == 7))
                )
                    moves[k].score -= 50;
            }
        }
    }

    /**
     * Calculates the score of the move in the direction: [x+idx][y]
     * where idx is the index that we are iterating
     *
     * @param move
     * @param matrix
     * @param p1
     * @param p2
     * @returns {number}
     */
    private calculateScoreDirection1(move: CoordScore, matrix: number[][], p1: number, p2: number) {
        let score = 0;

        for (let idx = 1; idx < 8; idx++) {
            if ((move.x + idx) > 9)
                break;

            if (matrix[(move.x + idx)][move.y] == 0) {
                return 0;
            }

            if (matrix[(move.x + idx)][move.y] == p2) {
                score++;

                if (matrix[(move.x + idx + 1)][move.y] == p1)
                    break;
            }
        }

        return score;
    }

    /**
     * Calculates the score of the move in the direction: [x][y+idx]
     * where idx is the index that we are iterating
     *
     * @param move
     * @param matrix
     * @param p1
     * @param p2
     * @returns {number}
     */
    private calculateScoreDirection2(move: CoordScore, matrix: number[][], p1: number, p2: number) {
        let score = 0;

        for (let idx = 1; idx < 8; idx++) {
            if ((move.y + idx) > 9)
                break;

            if (matrix[(move.x)][move.y + idx] == 0) {
                return 0;
            }

            if (matrix[(move.x)][move.y + idx] == p2) {
                score++;

                if (matrix[(move.x)][move.y + idx + 1] == p1)
                    break;
            }
        }

        return score;
    }

    /**
     * Calculates the score of the move in the direction: [x][y-idx]
     * where idx is the index that we are iterating
     *
     * @param move
     * @param matrix
     * @param p1
     * @param p2
     * @returns {number}
     */
    private calculateScoreDirection3(move: CoordScore, matrix: number[][], p1: number, p2: number) {
        let score = 0;

        for (let idx = 1; idx < 8; idx++) {
            if ((move.y - idx) < 0)
                break;

            if (matrix[(move.x)][move.y - idx] == 0) {
                return 0;
            }

            if (matrix[(move.x)][move.y - idx] == p2) {
                score++;

                if (matrix[(move.x)][move.y - idx - 1] == p1)
                    break;
            }
        }

        return score;
    }

    /**
     * Calculates the score of the move in the direction: [x-idx][y]
     * where idx is the index that we are iterating
     *
     * @param move
     * @param matrix
     * @param p1
     * @param p2
     * @returns {number}
     */
    private calculateScoreDirection4(move: CoordScore, matrix: number[][], p1: number, p2: number) {
        let score = 0;

        for (let idx = 1; idx < 8; idx++) {
            if ((move.x - idx) < 0)
                break;

            if (matrix[(move.x) - idx][move.y] == 0) {
                return 0;
            }

            if (matrix[(move.x) - idx][move.y] == p2) {
                score++;

                if (matrix[(move.x) - idx - 1][move.y] == p1)
                    break;
            }
        }

        return score;
    }

    /**
     * Calculates the score of the move in the direction: [x+idx][y+idx]
     * where idx is the index that we are iterating
     *
     * @param move
     * @param matrix
     * @param p1
     * @param p2
     * @returns {number}
     */
    private calculateScoreDirection5(move: CoordScore, matrix: number[][], p1: number, p2: number) {
        let score = 0;

        for (let idx = 1; idx < 8; idx++) {
            if ((move.x + idx) > 9 || (move.y + idx) > 9)
                break;

            if (matrix[(move.x) + idx][move.y + idx] == 0) {
                return 0;
            }

            if (matrix[(move.x) + idx][move.y + idx] == p2) {
                score++;

                if (matrix[(move.x) + idx + 1][move.y + idx + 1] == p1)
                    break;
            }
        }

        return score;
    }

    /**
     * Calculates the score of the move in the direction: [x-idx][y-idx]
     * where idx is the index that we are iterating
     *
     * @param move
     * @param matrix
     * @param p1
     * @param p2
     * @returns {number}
     */
    private calculateScoreDirection6(move: CoordScore, matrix: number[][], p1: number, p2: number) {
        let score = 0;

        for (let idx = 1; idx < 8; idx++) {
            if ((move.x - idx) < 0 || (move.y - idx) < 0)
                break;

            if (matrix[move.x - idx][move.y - idx] == 0) {
                return 0;
            }

            if (matrix[(move.x) - idx][move.y - idx] == p2) {
                score++;

                if (matrix[move.x - idx - 1][move.y - idx - 1] == p1)
                    break;
            }
        }

        return score;
    }

    /**
     * Calculates the score of the move in the direction: [x+idx][y-idx]
     * where idx is the index that we are iterating
     *
     * @param move
     * @param matrix
     * @param p1
     * @param p2
     * @returns {number}
     */
    private calculateScoreDirection7(move: CoordScore, matrix: number[][], p1: number, p2: number) {
        let score = 0;

        for (let idx = 1; idx < 8; idx++) {
            if ((move.x + idx) > 9 || (move.y - idx) < 0)
                break;

            if (matrix[(move.x) + idx][move.y - idx] == 0) {
                return 0;
            }

            if (matrix[(move.x) + idx][move.y - idx] == p2) {
                score++;

                if (matrix[(move.x) + idx + 1][move.y - idx - 1] == p1)
                    break;
            }
        }

        return score;
    }

    /**
     * Calculates the score of the move in the direction: [x-idx][y+idx]
     * where idx is the index that we are iterating
     *
     * @param move
     * @param matrix
     * @param p1
     * @param p2
     * @returns {number}
     */
    private calculateScoreDirection8(move: CoordScore, matrix: number[][], p1: number, p2: number) {
        let score = 0;

        for (let idx = 1; idx < 8; idx++) {
            if ((move.x - idx) < 0 || (move.y + idx) > 9)
                break;

            if (matrix[(move.x) - idx][move.y + idx] == 0) {
                return 0;
            }

            if (matrix[(move.x) - idx][move.y + idx] == p2) {
                score++;

                if (matrix[(move.x) - idx - 1][move.y + idx + 1] == p1)
                    break;
            }
        }

        return score;
    }
}
