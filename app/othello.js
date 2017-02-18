(function (angular) {

  angular.module('othelloApp')
    .component('othello', {
      templateUrl: 'othello.html',
      controller: OthelloController
    });

  function OthelloController($scope, $timeout) {
    var ctrl = this;

    ctrl.$onInit = function () {
      ctrl.matrix = [];

      ctrl.turn = 1;
      ctrl.win = "win_disabled";
      ctrl.white = 0;
      ctrl.black = 0;
      ctrl.playing = false;
    }

    ctrl.start = function () {

      var i, j;

      for (i = 0; i < 10; i++) {
        ctrl.matrix[i] = [];
        for (j = 0; j < 10; j++) {
          ctrl.setValue(i, j, 0);
        }
      }

      ctrl.setValue(4, 4, 1);
      ctrl.setValue(4, 5, 2);
      ctrl.setValue(5, 4, 2);
      ctrl.setValue(5, 5, 1);

      ctrl.black = ctrl.calculateScore(1);
      ctrl.white = ctrl.calculateScore(2);

      ctrl.turn = 1;

      ctrl.win = "win_disabled";
      ctrl.winc = "";

      ctrl.playing = true;
    };

    ctrl.setValue = function (x, y, val) {
      // TODO: this function can now be deleted
      ctrl.matrix[x][y] = val;
    }

    ctrl.calculateScore = function (val) {
      var count = 0;

      for (var i = 1; i < 9; i++) {
        for (var j = 1; j < 9; j++) {
          if (ctrl.matrix[i][j] == val)
            count++;
        }
      }

      return count;
    };

    ctrl.stepControl = function (i, j, id) {

      if (ctrl.matrix[i][j] == 0) {
        var p2;
        var p1;

        if (id == 1) {
          p1 = 1;
          p2 = 2;
        }
        else {
          p1 = 2;
          p2 = 1;
        }

        if ((ctrl.matrix[(i + 1)][j] != p2) &&
          (ctrl.matrix[i][(j + 1)] != p2) &&
          (ctrl.matrix[(i + 1)][(j + 1)] != p2) &&
          (ctrl.matrix[(i - 1)][j] != p2) &&
          (ctrl.matrix[i][(j - 1)] != p2) &&
          (ctrl.matrix[(i - 1)][(j - 1)] != p2) &&
          (ctrl.matrix[(i + 1)][(j - 1)] != p2) &&
          (ctrl.matrix[(i - 1)][(j + 1)] != p2)) {
          return false;
        }

        var x;

        if (ctrl.matrix[i + 1][j] == p2) {
          for (x = 2; x < 8; x++) {
            if ((i + x) > 8)
              break;

            if (ctrl.matrix[i + x][j] == 0)
              break;

            if (ctrl.matrix[i + x][j] == p1)
              return true;
          }
        }

        if (ctrl.matrix[i][j + 1] == p2) {
          for (x = 2; x < 8; x++) {
            if ((j + x) > 8)
              break;

            if (ctrl.matrix[i][j + x] == 0)
              break;

            if (ctrl.matrix[i][j + x] == p1)
              return true;
          }
        }

        if (ctrl.matrix[i - 1][j] == p2) {
          for (x = 2; x < 8; x++) {
            if (i - x < 1)
              break;

            if (ctrl.matrix[i - x][j] == 0)
              break;

            if (ctrl.matrix[i - x][j] == p1)
              return true;
          }
        }

        if (ctrl.matrix[i][j - 1] == p2) {
          for (x = 2; x < 8; x++) {
            if ((j - x) < 1)
              break;

            if (ctrl.matrix[i][j - x] == 0)
              break;

            if (ctrl.matrix[i][j - x] == p1)
              return true;
          }
        }

        if (ctrl.matrix[i + 1][j + 1] == p2) {
          for (x = 2; x < 8; x++) {
            if ((i + x) > 8 || (j + x) > 8)
              break;

            if (ctrl.matrix[i + x][j + x] == 0)
              break;

            if (ctrl.matrix[i + x][j + x] == p1)
              return true;
          }
        }

        if (ctrl.matrix[i - 1][j - 1] == p2) {
          for (x = 2; x < 8; x++) {
            if ((i - x) < 1 || (j - x) < 1)
              break;

            if (ctrl.matrix[i - x][j - x] == 0)
              break;

            if (ctrl.matrix[i - x][j - x] == p1)
              return true;
          }
        }

        if (ctrl.matrix[i + 1][j - 1] == p2) {
          for (x = 2; x < 8; x++) {
            if ((i + x) > 8 || (j - x) < 1)
              break;

            if (ctrl.matrix[i + x][j - x] == 0)
              break;

            if (ctrl.matrix[i + x][j - x] == p1)
              return true;
          }
        }

        if (ctrl.matrix[i - 1][j + 1] == p2) {
          for (x = 2; x < 8; x++) {
            if ((i - x) < 1 || (j + x) > 8)
              break;

            if (ctrl.matrix[i - x][j + x] == 0)
              break;

            if (ctrl.matrix[i - x][j + x] == p1)
              return true;
          }
        }
      }

      return false;
    };

    ctrl.stepProcess = function (i, j, id) {
      ctrl.setValue(i, j, id);

      var p2;
      var p1;

      if (id == 1) {
        p1 = 1;
        p2 = 2;
      }
      else {
        p1 = 2;
        p2 = 1;
      }

      var x;

      if (ctrl.matrix[i + 1][j] == p2) {
        for (x = 2; x < 8; x++) {
          if ((i + x) > 8)
            break;

          if (ctrl.matrix[i + x][j] == 0)
            break;

          if (ctrl.matrix[i + x][j] == p1) {
            x--;
            while (x > 0) {
              ctrl.setValue(i + x, j, p1);
              x--;
            }
            break;
          }
        }
      }

      if (ctrl.matrix[i][j + 1] == p2) {
        for (x = 2; x < 8; x++) {
          if ((j + x) > 8)
            break;

          if (ctrl.matrix[i][j + x] == 0)
            break;

          if (ctrl.matrix[i][j + x] == p1) {
            x--;
            while (x > 0) {
              ctrl.setValue(i, j + x, p1);
              x--;
            }
            break;
          }
        }
      }

      if (ctrl.matrix[i - 1][j] == p2) {
        for (x = 2; x < 8; x++) {
          if (i - x < 1)
            break;

          if (ctrl.matrix[i - x][j] == 0)
            break;

          if (ctrl.matrix[i - x][j] == p1) {
            x--;
            while (x > 0) {
              ctrl.setValue(i - x, j, p1);
              x--;
            }
            break;
          }
        }
      }

      if (ctrl.matrix[i][j - 1] == p2) {
        for (x = 2; x < 8; x++) {
          if ((j - x) < 1)
            break;

          if (ctrl.matrix[i][j - x] == 0)
            break;

          if (ctrl.matrix[i][j - x] == p1) {
            x--;
            while (x > 0) {
              ctrl.setValue(i, j - x, p1);
              x--;
            }
            break;
          }
        }
      }

      if (ctrl.matrix[i + 1][j + 1] == p2) {
        for (x = 2; x < 8; x++) {
          if ((i + x) > 8 || (j + x) > 8)
            break;

          if (ctrl.matrix[i + x][j + x] == 0)
            break;

          if (ctrl.matrix[i + x][j + x] == p1) {
            x--;
            while (x > 0) {
              ctrl.setValue(i + x, j + x, p1);
              x--;
            }
            break;
          }
        }
      }

      if (ctrl.matrix[i - 1][j - 1] == p2) {
        for (x = 2; x < 8; x++) {
          if ((i - x) < 1 || (j - x) < 1)
            break;

          if (ctrl.matrix[i - x][j - x] == 0)
            break;

          if (ctrl.matrix[i - x][j - x] == p1) {
            x--;
            while (x > 0) {
              ctrl.setValue(i - x, j - x, p1);
              x--;
            }
            break;
          }
        }
      }

      if (ctrl.matrix[i + 1][j - 1] == p2) {
        for (x = 2; x < 8; x++) {
          if ((i + x) > 8 || (j - x) < 1)
            break;

          if (ctrl.matrix[i + x][j - x] == 0)
            break;

          if (ctrl.matrix[i + x][j - x] == p1) {
            x--;
            while (x > 0) {
              ctrl.setValue(i + x, j - x, p1);
              x--;
            }
            break;
          }
        }
      }

      if (ctrl.matrix[i - 1][j + 1] == p2) {
        for (x = 2; x < 8; x++) {
          if ((i - x) < 1 || (j + x) > 8)
            break;

          if (ctrl.matrix[i - x][j + x] == 0)
            break;

          if (ctrl.matrix[i - x][j + x] == p1) {
            x--;
            while (x > 0) {
              ctrl.setValue(i - x, j + x, p1);
              x--;
            }
            break;
          }
        }
      }
    };

    ctrl.calculateMove = function (id) {

      var coords = Array(2);

      if (id == 1) {
        p1 = 1;
        p2 = 2;
      }
      else {
        p1 = 2;
        p2 = 1;
      }

      if (ctrl.stepControl(1, 8, id)) {
        coords[0] = 1;
        coords[1] = 8;
      }
      else if (ctrl.stepControl(8, 1, id)) {
        coords[0] = 8;
        coords[1] = 1;
      }
      else if (ctrl.stepControl(1, 1, id)) {
        coords[0] = 1;
        coords[1] = 1;
      }
      else if (ctrl.stepControl(8, 8, id)) {
        coords[0] = 8;
        coords[1] = 8;
      }
      else {
        var count = 0;
        for (var n = 1; n <= 8; n = (n + 1)) {
          for (var m = 1; m <= 8; m = (m + 1)) {
            if (ctrl.stepControl(n, m, id)) {
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
            if (ctrl.stepControl(n, m, id)) {
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

            if (ctrl.matrix[(cordN[k] + x)][cordM[k]] == 0) {
              score1 = 0;
              break;
            }

            if (ctrl.matrix[(cordN[k] + x)][cordM[k]] == p2) {
              score1++;

              if (ctrl.matrix[(cordN[k] + x + 1)][cordM[k]] == p1)
                break;
            }
          }
          moveScore[k] += score1;

          // 2
          for (x = 1; x < 8; x++) {
            if ((cordM[k] + x) > 9)
              break;

            if (ctrl.matrix[(cordN[k])][cordM[k] + x] == 0) {
              score2 = 0;
              break;
            }

            if (ctrl.matrix[(cordN[k])][cordM[k] + x] == p2) {
              score2++;

              if (ctrl.matrix[(cordN[k])][cordM[k] + x + 1] == p1)
                break;
            }
          }
          moveScore[k] += score2;

          // 3
          for (x = 1; x < 8; x++) {
            if ((cordM[k] - x) < 0)
              break;

            if (ctrl.matrix[(cordN[k])][cordM[k] - x] == 0) {
              score3 = 0;
              break;
            }

            if (ctrl.matrix[(cordN[k])][cordM[k] - x] == p2) {
              score3++;

              if (ctrl.matrix[(cordN[k])][cordM[k] - x - 1] == p1)
                break;
            }
          }
          moveScore[k] += score3;

          // 4
          for (x = 1; x < 8; x++) {
            if ((cordN[k] - x) < 0)
              break;

            if (ctrl.matrix[(cordN[k]) - x][cordM[k]] == 0) {
              score4 = 0;
              break;
            }

            if (ctrl.matrix[(cordN[k]) - x][cordM[k]] == p2) {
              score4++;

              if (ctrl.matrix[(cordN[k]) - x - 1][cordM[k]] == p1)
                break;
            }
          }
          moveScore[k] += score4;

          // 5
          for (x = 1; x < 8; x++) {
            if ((cordN[k] + x) > 9 || (cordM[k] + x) > 9)
              break;

            if (ctrl.matrix[(cordN[k]) + x][cordM[k] + x] == 0) {
              score5 = 0;
              break;
            }

            if (ctrl.matrix[(cordN[k]) + x][cordM[k] + x] == p2) {
              score5++;

              if (ctrl.matrix[(cordN[k]) + x + 1][cordM[k] + x + 1] == p1)
                break;
            }
          }
          moveScore[k] += score5;

          // 6
          for (x = 1; x < 8; x++) {
            if ((cordN[k] - x) < 0 || (cordM[k] - x) < 0)
              break;

            if (ctrl.matrix[cordN[k] - x][cordM[k] - x] == 0) {
              score6 = 0;
              break;
            }

            if (ctrl.matrix[(cordN[k]) - x][cordM[k] - x] == p2) {
              score6++;

              if (ctrl.matrix[cordN[k] - x - 1][cordM[k] - x - 1] == p1)
                break;
            }
          }
          moveScore[k] += score6;

          // 7
          for (x = 1; x < 8; x++) {
            if ((cordN[k] + x) > 9 || (cordM[k] - x) < 0)
              break;

            if (ctrl.matrix[(cordN[k]) + x][cordM[k] - x] == 0) {
              score7 = 0;
              break;
            }

            if (ctrl.matrix[(cordN[k]) + x][cordM[k] - x] == p2) {
              score7++;

              if (ctrl.matrix[(cordN[k]) + x + 1][cordM[k] - x - 1] == p1)
                break;
            }
          }
          moveScore[k] += score7;

          // 8
          for (x = 1; x < 8; x++) {
            if ((cordN[k] - x) < 0 || (cordM[k] + x) > 9)
              break;

            if (ctrl.matrix[(cordN[k]) - x][cordM[k] + x] == 0) {
              score8 = 0;
              break;
            }

            if (ctrl.matrix[(cordN[k]) - x][cordM[k] + x] == p2) {
              score8++;

              if (ctrl.matrix[(cordN[k]) - x - 1][cordM[k] + x + 1] == p1)
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

    ctrl.endGame = function () {
      if (ctrl.white > ctrl.black) {
        ctrl.winc = "White wins!";
        ctrl.win = "win_white";
      }
      else if (ctrl.black > ctrl.white) {
        ctrl.winc = "Black wins!";
        ctrl.win = "win_black";
      }
      else {
        ctrl.winc = "Draw!";
        ctrl.win = "win_white";
      }

      ctrl.playing = false;
    };

    ctrl.select = function (x, y) {
      if (ctrl.turn == 1) {
        if (typeof ctrl.matrix[x] == 'undefined')
          return;

        var playermove;
        var move;

        if (!ctrl.stepControl(x, y, 1))
          return;

        ctrl.stepProcess(x, y, 1);
        ctrl.black = ctrl.calculateScore(1);
        ctrl.white = ctrl.calculateScore(2);
        ctrl.turn = 2;

        $timeout(function () { ctrl.CPUmove() }, 1000);
      }
    };

    ctrl.CPUmove = function () {
      if (ctrl.turn == 2) {
        move = ctrl.calculateMove(2);

        if (typeof move[0] == 'undefined' || typeof move[1] == 'undefined') {
          ctrl.turn = 1;
          playermove = ctrl.calculateMove(1);

          if (typeof playermove[0] == 'undefined' || typeof playermove[1] == 'undefined')
            ctrl.endGame();

          return;
        }

        ctrl.stepProcess(move[0], move[1], 2);
        ctrl.black = ctrl.calculateScore(1);
        ctrl.white = ctrl.calculateScore(2);
        ctrl.turn = 1;

        playermove = ctrl.calculateMove(1);
        while (typeof playermove[0] == 'undefined' || typeof playermove[1] == 'undefined') {
          move = ctrl.calculateMove(2);

          if (typeof move[0] == 'undefined' || typeof move[1] == 'undefined')
            ctrl.endGame();

          ctrl.stepProcess(move[0], move[1], 2);
          ctrl.black = ctrl.calculateScore(1);
          ctrl.white = ctrl.calculateScore(2);

          playermove = ctrl.calculateMove(1)
        }
      }
    };
  }

}

)(window.angular);
