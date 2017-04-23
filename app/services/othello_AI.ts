import * as angular from 'angular';

class OthelloAIService {

    private othelloHandlerService;

    /**
     * @param {OthelloHandlerService} OthelloHandlerService
     */
    constructor(OthelloHandlerService) {
        this.othelloHandlerService = OthelloHandlerService;
    }

    private checkEdges(matrix: number[][], id: number) : Coord | null {

        if (this.othelloHandlerService.stepControl(matrix, 1, 8, id)) {
            return { x: 1, y: 8};
        }
        else if (this.othelloHandlerService.stepControl(matrix, 8, 1, id)) {
            return { x: 8, y: 1};
        }
        else if (this.othelloHandlerService.stepControl(matrix, 1, 1, id)) {
            return { x: 1, y: 1};
        }
        else if (this.othelloHandlerService.stepControl(matrix, 8, 8, id)) {
            return { x: 8, y: 8};
        } else {
            return null;
        }
    }

    calculateMove(matrix: number[][], id: number): Coord {

        let edgeCoords = this.checkEdges(matrix, id);
        if (edgeCoords) {
            return edgeCoords;
        }

        let coords : Coord = { x: 0, y: 0};

        let p1: number, p2: number;

        if (id == 1) {
            p1 = 1;
            p2 = 2;
        }
        else {
            p1 = 2;
            p2 = 1;
        }

        let count = 0;
        for (let n = 1; n <= 8; n = (n + 1)) {
            for (let m = 1; m <= 8; m = (m + 1)) {
                if (this.othelloHandlerService.stepControl(matrix, n, m, id)) {
                    count = (count + 1);
                }
            }
        }

        let moveScore : number[] = [];
        let cordM : number[] = [];
        let cordN : number[] = [];
        let k = 0;
        let directionScore: number[] = [];

        for (let n = 1; n <= 8; n = (n + 1)) {
            for (let m = 1; m <= 8; m = (m + 1)) {
                if (this.othelloHandlerService.stepControl(matrix, n, m, id)) {
                    cordM[k] = m;
                    cordN[k] = n;
                    k = (k + 1);
                }
            }
        }

        for (k = 0; k < count; k++) {
            directionScore[1] = 0;
            directionScore[2] = 0;
            directionScore[3] = 0;
            directionScore[4] = 0;
            directionScore[5] = 0;
            directionScore[6] = 0;
            directionScore[7] = 0;
            directionScore[8] = 0;

            moveScore[k] = 0;

            // 1
            for (let x = 1; x < 8; x++) {
                if ((cordN[k] + x) > 9)
                    break;

                if (matrix[(cordN[k] + x)][cordM[k]] == 0) {
                    directionScore[1] = 0;
                    break;
                }

                if (matrix[(cordN[k] + x)][cordM[k]] == p2) {
                    directionScore[1]++;

                    if (matrix[(cordN[k] + x + 1)][cordM[k]] == p1)
                        break;
                }
            }
            moveScore[k] += directionScore[1];

            // 2
            for (let x = 1; x < 8; x++) {
                if ((cordM[k] + x) > 9)
                    break;

                if (matrix[(cordN[k])][cordM[k] + x] == 0) {
                    directionScore[2] = 0;
                    break;
                }

                if (matrix[(cordN[k])][cordM[k] + x] == p2) {
                    directionScore[2]++;

                    if (matrix[(cordN[k])][cordM[k] + x + 1] == p1)
                        break;
                }
            }
            moveScore[k] += directionScore[2];

            // 3
            for (let x = 1; x < 8; x++) {
                if ((cordM[k] - x) < 0)
                    break;

                if (matrix[(cordN[k])][cordM[k] - x] == 0) {
                    directionScore[3] = 0;
                    break;
                }

                if (matrix[(cordN[k])][cordM[k] - x] == p2) {
                    directionScore[3]++;

                    if (matrix[(cordN[k])][cordM[k] - x - 1] == p1)
                        break;
                }
            }
            moveScore[k] += directionScore[3];

            // 4
            for (let x = 1; x < 8; x++) {
                if ((cordN[k] - x) < 0)
                    break;

                if (matrix[(cordN[k]) - x][cordM[k]] == 0) {
                    directionScore[4] = 0;
                    break;
                }

                if (matrix[(cordN[k]) - x][cordM[k]] == p2) {
                    directionScore[4]++;

                    if (matrix[(cordN[k]) - x - 1][cordM[k]] == p1)
                        break;
                }
            }
            moveScore[k] += directionScore[4];

            // 5
            for (let x = 1; x < 8; x++) {
                if ((cordN[k] + x) > 9 || (cordM[k] + x) > 9)
                    break;

                if (matrix[(cordN[k]) + x][cordM[k] + x] == 0) {
                    directionScore[5] = 0;
                    break;
                }

                if (matrix[(cordN[k]) + x][cordM[k] + x] == p2) {
                    directionScore[5]++;

                    if (matrix[(cordN[k]) + x + 1][cordM[k] + x + 1] == p1)
                        break;
                }
            }
            moveScore[k] += directionScore[5];

            // 6
            for (let x = 1; x < 8; x++) {
                if ((cordN[k] - x) < 0 || (cordM[k] - x) < 0)
                    break;

                if (matrix[cordN[k] - x][cordM[k] - x] == 0) {
                    directionScore[6] = 0;
                    break;
                }

                if (matrix[(cordN[k]) - x][cordM[k] - x] == p2) {
                    directionScore[6]++;

                    if (matrix[cordN[k] - x - 1][cordM[k] - x - 1] == p1)
                        break;
                }
            }
            moveScore[k] += directionScore[6];

            // 7
            for (let x = 1; x < 8; x++) {
                if ((cordN[k] + x) > 9 || (cordM[k] - x) < 0)
                    break;

                if (matrix[(cordN[k]) + x][cordM[k] - x] == 0) {
                    directionScore[7] = 0;
                    break;
                }

                if (matrix[(cordN[k]) + x][cordM[k] - x] == p2) {
                    directionScore[7]++;

                    if (matrix[(cordN[k]) + x + 1][cordM[k] - x - 1] == p1)
                        break;
                }
            }
            moveScore[k] += directionScore[7];

            // 8
            for (let x = 1; x < 8; x++) {
                if ((cordN[k] - x) < 0 || (cordM[k] + x) > 9)
                    break;

                if (matrix[(cordN[k]) - x][cordM[k] + x] == 0) {
                    directionScore[8] = 0;
                    break;
                }

                if (matrix[(cordN[k]) - x][cordM[k] + x] == p2) {
                    directionScore[8]++;

                    if (matrix[(cordN[k]) - x - 1][cordM[k] + x + 1] == p1)
                        break;
                }
            }

            moveScore[k] += directionScore[8];
        }

        let max_k = 0;

        for (k = 0; k < count; k = (k + 1)) {
            if ((cordN[k] == 1) ||
                (cordN[k] == 8) ||
                (cordM[k] == 1) ||
                (cordM[k] == 8)) {
                moveScore[k] += 100;
            }
            else if ((cordN[k] == 2) ||
                (cordN[k] == 7) ||
                (cordM[k] == 2) ||
                (cordM[k] == 7)) {
                moveScore[k] -= 100;
                if (((cordN[k] == 2) && (cordM[k] == 2)) ||
                    ((cordN[k] == 2) && (cordM[k] == 7)) ||
                    ((cordN[k] == 7) && (cordM[k] == 2)) ||
                    ((cordN[k] == 7) && (cordM[k] == 7)))
                    moveScore[k] -= 50;
            }

            if (moveScore[k] > moveScore[max_k]) {
                max_k = k;
            }
        }

        coords.x = cordN[max_k];
        coords.y = cordM[max_k];

        return coords;
    };
}

export default angular.module('othello.services.ai', []).service('OthelloAIService', OthelloAIService).name;
