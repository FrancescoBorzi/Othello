import angular from 'angular';

class OthelloAIService {

    constructor($http, OthelloHandlerService) {
        'ngInject';
        this.othelloHandlerService = OthelloHandlerService;
    }

    calculateMove(matrix, id) {

        var coords = Array(2);
        var p1, p2;

        if (id == 1) {
            p1 = 1;
            p2 = 2;
        }
        else {
            p1 = 2;
            p2 = 1;
        }

        if (this.othelloHandlerService.stepControl(matrix, 1, 8, id)) {
            coords[0] = 1;
            coords[1] = 8;
        }
        else if (this.othelloHandlerService.stepControl(matrix, 8, 1, id)) {
            coords[0] = 8;
            coords[1] = 1;
        }
        else if (this.othelloHandlerService.stepControl(matrix, 1, 1, id)) {
            coords[0] = 1;
            coords[1] = 1;
        }
        else if (this.othelloHandlerService.stepControl(matrix, 8, 8, id)) {
            coords[0] = 8;
            coords[1] = 8;
        }
        else {
            var count = 0;
            for (var n = 1; n <= 8; n = (n + 1)) {
                for (var m = 1; m <= 8; m = (m + 1)) {
                    if (this.othelloHandlerService.stepControl(matrix, n, m, id)) {
                        count = (count + 1);
                    }
                }
            }

            var moveScore = Array(count);
            var cordM = Array(count);
            var cordN = Array(count);
            var k = 0;
            var x;
            var y;
            var score1;
            var score2;
            var score3;
            var score4;
            var score5;
            var score6;
            var score7;
            var score8;

            for (var n = 1; n <= 8; n = (n + 1)) {
                for (var m = 1; m <= 8; m = (m + 1)) {
                    if (this.othelloHandlerService.stepControl(matrix, n, m, id)) {
                        cordM[k] = m;
                        cordN[k] = n;
                        k = (k + 1);
                    }
                }
            }

            for (k = 0; k < count; k++) {
                score1 = 0;
                score2 = 0;
                score3 = 0;
                score4 = 0;
                score5 = 0;
                score6 = 0;
                score7 = 0;
                score8 = 0;

                moveScore[k] = 0;

                // 1
                for (x = 1; x < 8; x++) {
                    if ((cordN[k] + x) > 9)
                        break;

                    if (matrix[(cordN[k] + x)][cordM[k]] == 0) {
                        score1 = 0;
                        break;
                    }

                    if (matrix[(cordN[k] + x)][cordM[k]] == p2) {
                        score1++;

                        if (matrix[(cordN[k] + x + 1)][cordM[k]] == p1)
                            break;
                    }
                }
                moveScore[k] += score1;

                // 2
                for (x = 1; x < 8; x++) {
                    if ((cordM[k] + x) > 9)
                        break;

                    if (matrix[(cordN[k])][cordM[k] + x] == 0) {
                        score2 = 0;
                        break;
                    }

                    if (matrix[(cordN[k])][cordM[k] + x] == p2) {
                        score2++;

                        if (matrix[(cordN[k])][cordM[k] + x + 1] == p1)
                            break;
                    }
                }
                moveScore[k] += score2;

                // 3
                for (x = 1; x < 8; x++) {
                    if ((cordM[k] - x) < 0)
                        break;

                    if (matrix[(cordN[k])][cordM[k] - x] == 0) {
                        score3 = 0;
                        break;
                    }

                    if (matrix[(cordN[k])][cordM[k] - x] == p2) {
                        score3++;

                        if (matrix[(cordN[k])][cordM[k] - x - 1] == p1)
                            break;
                    }
                }
                moveScore[k] += score3;

                // 4
                for (x = 1; x < 8; x++) {
                    if ((cordN[k] - x) < 0)
                        break;

                    if (matrix[(cordN[k]) - x][cordM[k]] == 0) {
                        score4 = 0;
                        break;
                    }

                    if (matrix[(cordN[k]) - x][cordM[k]] == p2) {
                        score4++;

                        if (matrix[(cordN[k]) - x - 1][cordM[k]] == p1)
                            break;
                    }
                }
                moveScore[k] += score4;

                // 5
                for (x = 1; x < 8; x++) {
                    if ((cordN[k] + x) > 9 || (cordM[k] + x) > 9)
                        break;

                    if (matrix[(cordN[k]) + x][cordM[k] + x] == 0) {
                        score5 = 0;
                        break;
                    }

                    if (matrix[(cordN[k]) + x][cordM[k] + x] == p2) {
                        score5++;

                        if (matrix[(cordN[k]) + x + 1][cordM[k] + x + 1] == p1)
                            break;
                    }
                }
                moveScore[k] += score5;

                // 6
                for (x = 1; x < 8; x++) {
                    if ((cordN[k] - x) < 0 || (cordM[k] - x) < 0)
                        break;

                    if (matrix[cordN[k] - x][cordM[k] - x] == 0) {
                        score6 = 0;
                        break;
                    }

                    if (matrix[(cordN[k]) - x][cordM[k] - x] == p2) {
                        score6++;

                        if (matrix[cordN[k] - x - 1][cordM[k] - x - 1] == p1)
                            break;
                    }
                }
                moveScore[k] += score6;

                // 7
                for (x = 1; x < 8; x++) {
                    if ((cordN[k] + x) > 9 || (cordM[k] - x) < 0)
                        break;

                    if (matrix[(cordN[k]) + x][cordM[k] - x] == 0) {
                        score7 = 0;
                        break;
                    }

                    if (matrix[(cordN[k]) + x][cordM[k] - x] == p2) {
                        score7++;

                        if (matrix[(cordN[k]) + x + 1][cordM[k] - x - 1] == p1)
                            break;
                    }
                }
                moveScore[k] += score7;

                // 8
                for (x = 1; x < 8; x++) {
                    if ((cordN[k] - x) < 0 || (cordM[k] + x) > 9)
                        break;

                    if (matrix[(cordN[k]) - x][cordM[k] + x] == 0) {
                        score8 = 0;
                        break;
                    }

                    if (matrix[(cordN[k]) - x][cordM[k] + x] == p2) {
                        score8++;

                        if (matrix[(cordN[k]) - x - 1][cordM[k] + x + 1] == p1)
                            break;
                    }
                }

                moveScore[k] += score8;
            }

            var max_k = 0;

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

            coords[0] = cordN[max_k];
            coords[1] = cordM[max_k];
        }

        return coords;
    };
}

export default angular.module('othello.services.ai', []).service('OthelloAIService', OthelloAIService).name;
