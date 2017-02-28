import angular from 'angular';

class OthelloHandlerService {

    calculateScore(matrix, val) {
        let count = 0;

        for (let i = 1; i < 9; i++) {
            for (let j = 1; j < 9; j++) {
                if (matrix[i][j] == val)
                    count++;
            }
        }

        return count;
    };

    stepControl(matrix, i, j, id) {

        if (matrix[i][j] == 0) {
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

            if ((matrix[(i + 1)][j] != p2) &&
                (matrix[i][(j + 1)] != p2) &&
                (matrix[(i + 1)][(j + 1)] != p2) &&
                (matrix[(i - 1)][j] != p2) &&
                (matrix[i][(j - 1)] != p2) &&
                (matrix[(i - 1)][(j - 1)] != p2) &&
                (matrix[(i + 1)][(j - 1)] != p2) &&
                (matrix[(i - 1)][(j + 1)] != p2)) {
                return false;
            }

            let x;

            if (matrix[i + 1][j] == p2) {
                for (x = 2; x < 8; x++) {
                    if ((i + x) > 8)
                        break;

                    if (matrix[i + x][j] == 0)
                        break;

                    if (matrix[i + x][j] == p1)
                        return true;
                }
            }

            if (matrix[i][j + 1] == p2) {
                for (x = 2; x < 8; x++) {
                    if ((j + x) > 8)
                        break;

                    if (matrix[i][j + x] == 0)
                        break;

                    if (matrix[i][j + x] == p1)
                        return true;
                }
            }

            if (matrix[i - 1][j] == p2) {
                for (x = 2; x < 8; x++) {
                    if (i - x < 1)
                        break;

                    if (matrix[i - x][j] == 0)
                        break;

                    if (matrix[i - x][j] == p1)
                        return true;
                }
            }

            if (matrix[i][j - 1] == p2) {
                for (x = 2; x < 8; x++) {
                    if ((j - x) < 1)
                        break;

                    if (matrix[i][j - x] == 0)
                        break;

                    if (matrix[i][j - x] == p1)
                        return true;
                }
            }

            if (matrix[i + 1][j + 1] == p2) {
                for (x = 2; x < 8; x++) {
                    if ((i + x) > 8 || (j + x) > 8)
                        break;

                    if (matrix[i + x][j + x] == 0)
                        break;

                    if (matrix[i + x][j + x] == p1)
                        return true;
                }
            }

            if (matrix[i - 1][j - 1] == p2) {
                for (x = 2; x < 8; x++) {
                    if ((i - x) < 1 || (j - x) < 1)
                        break;

                    if (matrix[i - x][j - x] == 0)
                        break;

                    if (matrix[i - x][j - x] == p1)
                        return true;
                }
            }

            if (matrix[i + 1][j - 1] == p2) {
                for (x = 2; x < 8; x++) {
                    if ((i + x) > 8 || (j - x) < 1)
                        break;

                    if (matrix[i + x][j - x] == 0)
                        break;

                    if (matrix[i + x][j - x] == p1)
                        return true;
                }
            }

            if (matrix[i - 1][j + 1] == p2) {
                for (x = 2; x < 8; x++) {
                    if ((i - x) < 1 || (j + x) > 8)
                        break;

                    if (matrix[i - x][j + x] == 0)
                        break;

                    if (matrix[i - x][j + x] == p1)
                        return true;
                }
            }
        }

        return false;
    };

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

export default angular.module('othello.services.handler', []).service('OthelloHandlerService', OthelloHandlerService).name;
