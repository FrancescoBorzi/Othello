import {Injectable} from "angular-ts-decorators";

@Injectable('OthelloHandlerService')
export class OthelloHandlerService {

    /**
     * Calculates the current score of the player id
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

    /**
     * Checks if player id can move on (x, y) coordinates
     *
     * @param matrix
     * @param x
     * @param y
     * @param id
     * @returns {boolean}
     */
    stepControl(matrix: number[][], x: number, y: number, id: number): boolean {

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

    /**
     * Processes the matrix after that player id has moved on (x, y)
     *
     * @param matrix
     * @param x
     * @param j
     * @param id
     */
    stepProcess(matrix, x, j, id): void {
        matrix[x][j] = id;

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

        if (matrix[x + 1][j] == p2) {
            for (let idx = 2; idx < 8; idx++) {
                if ((x + idx) > 8)
                    break;

                if (matrix[x + idx][j] == 0)
                    break;

                if (matrix[x + idx][j] == p1) {
                    idx--;
                    while (idx > 0) {
                        matrix[x + idx][j] = p1;
                        idx--;
                    }
                    break;
                }
            }
        }

        if (matrix[x][j + 1] == p2) {
            for (let idx = 2; idx < 8; idx++) {
                if ((j + idx) > 8)
                    break;

                if (matrix[x][j + idx] == 0)
                    break;

                if (matrix[x][j + idx] == p1) {
                    idx--;
                    while (idx > 0) {
                        matrix[x][j + idx] = p1;
                        idx--;
                    }
                    break;
                }
            }
        }

        if (matrix[x - 1][j] == p2) {
            for (let idx = 2; idx < 8; idx++) {
                if (x - idx < 1)
                    break;

                if (matrix[x - idx][j] == 0)
                    break;

                if (matrix[x - idx][j] == p1) {
                    idx--;
                    while (idx > 0) {
                        matrix[x - idx][j] = p1;
                        idx--;
                    }
                    break;
                }
            }
        }

        if (matrix[x][j - 1] == p2) {
            for (let idx = 2; idx < 8; idx++) {
                if ((j - idx) < 1)
                    break;

                if (matrix[x][j - idx] == 0)
                    break;

                if (matrix[x][j - idx] == p1) {
                    idx--;
                    while (idx > 0) {
                        matrix[x][j - idx] = p1;
                        idx--;
                    }
                    break;
                }
            }
        }

        if (matrix[x + 1][j + 1] == p2) {
            for (let idx = 2; idx < 8; idx++) {
                if ((x + idx) > 8 || (j + idx) > 8)
                    break;

                if (matrix[x + idx][j + idx] == 0)
                    break;

                if (matrix[x + idx][j + idx] == p1) {
                    idx--;
                    while (idx > 0) {
                        matrix[x + idx][j + idx] = p1;
                        idx--;
                    }
                    break;
                }
            }
        }

        if (matrix[x - 1][j - 1] == p2) {
            for (let idx = 2; idx < 8; idx++) {
                if ((x - idx) < 1 || (j - idx) < 1)
                    break;

                if (matrix[x - idx][j - idx] == 0)
                    break;

                if (matrix[x - idx][j - idx] == p1) {
                    idx--;
                    while (idx > 0) {
                        matrix[x - idx][j - idx] = p1;
                        idx--;
                    }
                    break;
                }
            }
        }

        if (matrix[x + 1][j - 1] == p2) {
            for (let idx = 2; idx < 8; idx++) {
                if ((x + idx) > 8 || (j - idx) < 1)
                    break;

                if (matrix[x + idx][j - idx] == 0)
                    break;

                if (matrix[x + idx][j - idx] == p1) {
                    idx--;
                    while (idx > 0) {
                        matrix[x + idx][j - idx] = p1;
                        idx--;
                    }
                    break;
                }
            }
        }

        if (matrix[x - 1][j + 1] == p2) {
            for (let idx = 2; idx < 8; idx++) {
                if ((x - idx) < 1 || (j + idx) > 8)
                    break;

                if (matrix[x - idx][j + idx] == 0)
                    break;

                if (matrix[x - idx][j + idx] == p1) {
                    idx--;
                    while (idx > 0) {
                        matrix[x - idx][j + idx] = p1;
                        idx--;
                    }
                    break;
                }
            }
        }
    };

    /**
     * Returns suggestions for the player id
     *
     * @param matrix
     * @param id
     * @returns {Coord[]}
     */
    getSuggestions(matrix: number[][], id: number): Coord[] {
        let suggestions: Coord[] = [];

        for (let x = 1; x < 9; x++) {
            for (let y = 1; y < 9; y++) {
                if (this.stepControl(matrix, x, y, id)) {
                    suggestions.push({
                        x: x,
                        y: y
                    });
                }
            }
        }

        return suggestions;
    }
}
