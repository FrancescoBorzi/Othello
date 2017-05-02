import {Injectable} from "angular-ts-decorators";

@Injectable('OthelloHandlerService')
export class OthelloHandlerService {

    /**
     * Calculate the current score of the player id
     *
     * @param matrix
     * @param id
     * @returns {number}
     */
    calculateScore(matrix: number[][], id: number): number {
        let count = 0;

        for (let i = 1; i < 9; i++) {
            for (let j = 1; j < 9; j++) {
                if (matrix[i][j] == id)
                    count++;
            }
        }

        return count;
    };

    stepControl(matrix: number[][], x: number, y: number, id: number) {

        // if the spot is not empty, it's not possible to move there
        if (matrix[x][y] !== 0) {
            return false;
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

        // if the spot does not have at least one adjacent enemy piece it's not possible to move there
        if (
            (matrix[x + 1][y] != p2) &&
            (matrix[x][y + 1] != p2) &&
            (matrix[x + 1][y + 1] != p2) &&
            (matrix[x - 1][y] != p2) &&
            (matrix[x][y - 1] != p2) &&
            (matrix[x - 1][y - 1] != p2) &&
            (matrix[x + 1][y - 1] != p2) &&
            (matrix[x - 1][y + 1] != p2)
        ) {
            return false;
        }

        // from now on, return true as soon as a possible direction is found

        if (matrix[x + 1][y] == p2) {
            for (let idx = 2; idx < 8; idx++) {
                if ((x + idx) > 8)
                    break;

                if (matrix[x + idx][y] == 0)
                    break;

                if (matrix[x + idx][y] == p1)
                    return true;
            }
        }

        if (matrix[x][y + 1] == p2) {
            for (let idx = 2; idx < 8; idx++) {
                if ((y + idx) > 8)
                    break;

                if (matrix[x][y + idx] == 0)
                    break;

                if (matrix[x][y + idx] == p1)
                    return true;
            }
        }

        if (matrix[x - 1][y] == p2) {
            for (let idx = 2; idx < 8; idx++) {
                if (x - idx < 1)
                    break;

                if (matrix[x - idx][y] == 0)
                    break;

                if (matrix[x - idx][y] == p1)
                    return true;
            }
        }

        if (matrix[x][y - 1] == p2) {
            for (let idx = 2; idx < 8; idx++) {
                if ((y - idx) < 1)
                    break;

                if (matrix[x][y - idx] == 0)
                    break;

                if (matrix[x][y - idx] == p1)
                    return true;
            }
        }

        if (matrix[x + 1][y + 1] == p2) {
            for (let idx = 2; idx < 8; idx++) {
                if ((x + idx) > 8 || (y + idx) > 8)
                    break;

                if (matrix[x + idx][y + idx] == 0)
                    break;

                if (matrix[x + idx][y + idx] == p1)
                    return true;
            }
        }

        if (matrix[x - 1][y - 1] == p2) {
            for (let idx = 2; idx < 8; idx++) {
                if ((x - idx) < 1 || (y - idx) < 1)
                    break;

                if (matrix[x - idx][y - idx] == 0)
                    break;

                if (matrix[x - idx][y - idx] == p1)
                    return true;
            }
        }

        if (matrix[x + 1][y - 1] == p2) {
            for (let idx = 2; idx < 8; idx++) {
                if ((x + idx) > 8 || (y - idx) < 1)
                    break;

                if (matrix[x + idx][y - idx] == 0)
                    break;

                if (matrix[x + idx][y - idx] == p1)
                    return true;
            }
        }

        if (matrix[x - 1][y + 1] == p2) {
            for (let idx = 2; idx < 8; idx++) {
                if ((x - idx) < 1 || (y + idx) > 8)
                    break;

                if (matrix[x - idx][y + idx] == 0)
                    break;

                if (matrix[x - idx][y + idx] == p1)
                    return true;
            }
        }

        return false;
    }

    stepProcess(matrix, i, j, id) {
        matrix[i][j] = id;

        let p2;
        let p1;

        if (id == 1) {
            p1 = 1;
            p2 = 2;
        }
        else {
            p1 = 2;
            p2 = 1;
        }

        let x;

        if (matrix[i + 1][j] == p2) {
            for (x = 2; x < 8; x++) {
                if ((i + x) > 8)
                    break;

                if (matrix[i + x][j] == 0)
                    break;

                if (matrix[i + x][j] == p1) {
                    x--;
                    while (x > 0) {
                        matrix[i + x][j] = p1;
                        x--;
                    }
                    break;
                }
            }
        }

        if (matrix[i][j + 1] == p2) {
            for (x = 2; x < 8; x++) {
                if ((j + x) > 8)
                    break;

                if (matrix[i][j + x] == 0)
                    break;

                if (matrix[i][j + x] == p1) {
                    x--;
                    while (x > 0) {
                        matrix[i][j + x] = p1;
                        x--;
                    }
                    break;
                }
            }
        }

        if (matrix[i - 1][j] == p2) {
            for (x = 2; x < 8; x++) {
                if (i - x < 1)
                    break;

                if (matrix[i - x][j] == 0)
                    break;

                if (matrix[i - x][j] == p1) {
                    x--;
                    while (x > 0) {
                        matrix[i - x][j] = p1;
                        x--;
                    }
                    break;
                }
            }
        }

        if (matrix[i][j - 1] == p2) {
            for (x = 2; x < 8; x++) {
                if ((j - x) < 1)
                    break;

                if (matrix[i][j - x] == 0)
                    break;

                if (matrix[i][j - x] == p1) {
                    x--;
                    while (x > 0) {
                        matrix[i][j - x] = p1;
                        x--;
                    }
                    break;
                }
            }
        }

        if (matrix[i + 1][j + 1] == p2) {
            for (x = 2; x < 8; x++) {
                if ((i + x) > 8 || (j + x) > 8)
                    break;

                if (matrix[i + x][j + x] == 0)
                    break;

                if (matrix[i + x][j + x] == p1) {
                    x--;
                    while (x > 0) {
                        matrix[i + x][j + x] = p1;
                        x--;
                    }
                    break;
                }
            }
        }

        if (matrix[i - 1][j - 1] == p2) {
            for (x = 2; x < 8; x++) {
                if ((i - x) < 1 || (j - x) < 1)
                    break;

                if (matrix[i - x][j - x] == 0)
                    break;

                if (matrix[i - x][j - x] == p1) {
                    x--;
                    while (x > 0) {
                        matrix[i - x][j - x] = p1;
                        x--;
                    }
                    break;
                }
            }
        }

        if (matrix[i + 1][j - 1] == p2) {
            for (x = 2; x < 8; x++) {
                if ((i + x) > 8 || (j - x) < 1)
                    break;

                if (matrix[i + x][j - x] == 0)
                    break;

                if (matrix[i + x][j - x] == p1) {
                    x--;
                    while (x > 0) {
                        matrix[i + x][j - x] = p1;
                        x--;
                    }
                    break;
                }
            }
        }

        if (matrix[i - 1][j + 1] == p2) {
            for (x = 2; x < 8; x++) {
                if ((i - x) < 1 || (j + x) > 8)
                    break;

                if (matrix[i - x][j + x] == 0)
                    break;

                if (matrix[i - x][j + x] == p1) {
                    x--;
                    while (x > 0) {
                        matrix[i - x][j + x] = p1;
                        x--;
                    }
                    break;
                }
            }
        }
    };

    getSuggestions(matrix, id) {
        let suggestions = [];
        for (let i = 1; i < 9; i++) {
            for (let j = 1; j < 9; j++) {
                if (this.stepControl(matrix, i, j, id)) {
                    suggestions.push({
                        x: i,
                        y: j
                    });
                }
            }
        }
        return suggestions;
    }
}
