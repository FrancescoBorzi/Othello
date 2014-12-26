(function (){
  var app = angular.module('othello', [ ]);
  app.controller("othelloController", function($scope, $timeout) {

    this.t = [1, 2, 3, 4, 5, 6, 7, 8];
    $scope.matrix = [];

    $scope.classes = [];
    for(var i = 0; i < 10; i++)
      $scope.classes[i] = new Array(8);

    $scope.turn = 1;
    $scope.win = "win_disabled";
    $scope.white = 0;
    $scope.black = 0;
    $scope.start = "Start";

    this.close = function()
    {
      $scope.win = "win_disabled";
      $scope.winc = "";
    };

    $scope.changeColor = function(x, y, color) {
      $scope.classes[x][y] = "disc-" + color;
    };

    $scope.setValue = function(x, y, val) {
      var color;

      switch (val)
      {
        case 0:
          color = 'empty';
          break;
        case 1:
          color = 'black';
          break;
        case 2:
          color = 'white';
          break;
        default:
          alert('Error: passed wrong color value');
          return;
      };

      $scope.changeColor(x, y, color);
      $scope.matrix[x][y] = val;
    }

    this.init = function() {

      var i, j;

      for(i = 0; i < 10; i++)
      {
        $scope.matrix[i] = new Array(8);
        for(j = 0; j < 10; j++)
        {
          $scope.setValue(i, j, 0);
        }
      }

      $scope.setValue(4, 4, 1);
      $scope.setValue(4, 5, 2);
      $scope.setValue(5, 4, 2);
      $scope.setValue(5, 5, 1);

      $scope.black = $scope.calculateScore(1);
      $scope.white = $scope.calculateScore(2);

      $scope.start = "Restart";
      $scope.turn = 1;

      this.close();
    };

    $scope.calculateScore = function(val) {
      var count = 0;

      for (var i = 1; i < 9; i++)
      {
        for (var j = 1; j < 9; j++)
        {
          if ($scope.matrix[i][j] == val)
            count++;
        }
      }

      return count;
    };

    $scope.stepControl = function(i, j, id) {

      if ($scope.matrix[i][j] == 0)
      {
        var p2;
        var p1;

        if (id == 1)
        {
          p1 = 1;
          p2 = 2;
        }
        else
        {
          p1 = 2;
          p2 = 1;
        }

        if (($scope.matrix[(i + 1)][j] != p2) &&
            ($scope.matrix[i][(j + 1)] != p2) &&
            ($scope.matrix[(i + 1)][(j + 1)] != p2) &&
            ($scope.matrix[(i - 1)][j] != p2) &&
            ($scope.matrix[i][(j - 1)] != p2) &&
            ($scope.matrix[(i - 1)][(j - 1)] != p2) &&
            ($scope.matrix[(i + 1)][(j - 1)] != p2) &&
            ($scope.matrix[(i - 1)][(j + 1)] != p2))
        {
          return false;
        }

        var x;

        if ($scope.matrix[i + 1][j] == p2)
        {
          for (x = 2; x < 8; x++)
          {
            if ((i + x) > 8)
              break;

            if ($scope.matrix[i + x][j] == 0)
              break;

            if ($scope.matrix[i + x][j] == p1)
              return true;
          }
        }

        if ($scope.matrix[i][j + 1] == p2)
        {
          for (x = 2; x < 8; x++)
          {
            if ((j + x) > 8)
              break;

            if ($scope.matrix[i][j + x] == 0)
              break;

            if ($scope.matrix[i][j + x] == p1)
              return true;
          }
        }

        if ($scope.matrix[i - 1][j] == p2)
        {
          for (x = 2; x < 8; x++)
          {
            if (i - x < 1)
              break;

            if ($scope.matrix[i - x][j] == 0)
              break;

            if ($scope.matrix[i - x][j] == p1)
              return true;
          }
        }

        if ($scope.matrix[i][j - 1] == p2)
        {
          for (x = 2; x < 8; x++)
          {
            if ((j - x) < 1)
              break;

            if ($scope.matrix[i][j - x] == 0)
              break;

            if ($scope.matrix[i][j - x] == p1)
              return true;
          }
        }

        if ($scope.matrix[i + 1][j + 1] == p2)
        {
          for (x = 2; x < 8; x++)
          {
            if ((i + x) > 8 || (j + x) > 8)
              break;

            if ($scope.matrix[i + x][j + x] == 0)
              break;

            if ($scope.matrix[i + x][j + x] == p1)
              return true;
          }
        }

        if ($scope.matrix[i - 1][j - 1] == p2)
        {
          for (x = 2; x < 8; x++)
          {
            if ((i - x) < 1 || (j - x) < 1)
              break;

            if ($scope.matrix[i - x][j - x] == 0)
              break;

            if ($scope.matrix[i - x][j - x] == p1)
              return true;
          }
        }

        if ($scope.matrix[i + 1][j - 1] == p2)
        {
          for (x = 2; x < 8; x++)
          {
            if ((i + x) > 8 || (j - x) < 1)
              break;

            if ($scope.matrix[i + x][j - x] == 0)
              break;

            if ($scope.matrix[i + x][j - x] == p1)
              return true;
          }
        }

        if ($scope.matrix[i - 1][j + 1] == p2)
        {
          for (x = 2; x < 8; x++)
          {
            if ((i - x) < 1 || (j + x) > 8)
              break;

            if ($scope.matrix[i - x][j + x] == 0)
              break;

            if ($scope.matrix[i - x][j + x] == p1)
              return true;
          }
        }
      }

      return false;
    };

    $scope.stepProcess = function(i, j, id) {
      $scope.setValue(i, j, id);

      var p2;
      var p1;

      if (id == 1)
      {
        p1 = 1;
        p2 = 2;
      }
      else
      {
        p1 = 2;
        p2 = 1;
      }

      var x;

      if ($scope.matrix[i + 1][j] == p2)
      {
        for (x = 2; x < 8; x++)
        {
          if ((i + x) > 8)
            break;

          if ($scope.matrix[i + x][j] == 0)
            break;

          if ($scope.matrix[i + x][j] == p1)
          {
            x--;
            while (x > 0)
            {
              $scope.setValue(i + x, j, p1);
              x--;
            }
            break;
          }
        }
      }

      if ($scope.matrix[i][j + 1] == p2)
      {
        for (x = 2; x < 8; x++)
        {
          if ((j + x) > 8)
            break;

          if ($scope.matrix[i][j + x] == 0)
            break;

          if ($scope.matrix[i][j + x] == p1)
          {
            x--;
            while (x > 0)
            {
              $scope.setValue(i, j + x, p1);
              x--;
            }
            break;
          }
        }
      }

      if ($scope.matrix[i - 1][j] == p2)
      {
        for (x = 2; x < 8; x++)
        {
          if (i - x < 1)
            break;

          if ($scope.matrix[i - x][j] == 0)
            break;

          if ($scope.matrix[i - x][j] == p1)
          {
            x--;
            while (x > 0)
            {
              $scope.setValue(i - x, j, p1);
              x--;
            }
            break;
          }
        }
      }

      if ($scope.matrix[i][j - 1] == p2)
      {
        for (x = 2; x < 8; x++)
        {
          if ((j - x) < 1)
            break;

          if ($scope.matrix[i][j - x] == 0)
            break;

          if ($scope.matrix[i][j - x] == p1)
          {
            x--;
            while (x > 0)
            {
              $scope.setValue(i, j - x, p1);
              x--;
            }
            break;
          }
        }
      }

      if ($scope.matrix[i + 1][j + 1] == p2)
      {
        for (x = 2; x < 8; x++)
        {
          if ((i + x) > 8 || (j + x) > 8)
            break;

          if ($scope.matrix[i + x][j + x] == 0)
            break;

          if ($scope.matrix[i + x][j + x] == p1)
          {
            x--;
            while (x > 0)
            {
              $scope.setValue(i + x, j + x, p1);
              x--;
            }
            break;
          }
        }
      }

      if ($scope.matrix[i - 1][j - 1] == p2)
      {
        for (x = 2; x < 8; x++)
        {
          if ((i - x) < 1 || (j - x) < 1)
            break;

          if ($scope.matrix[i - x][j - x] == 0)
            break;

          if ($scope.matrix[i - x][j - x] == p1)
          {
            x--;
            while (x > 0)
            {
              $scope.setValue(i - x, j - x, p1);
              x--;
            }
            break;
          }
        }
      }

      if ($scope.matrix[i + 1][j - 1] == p2)
      {
        for (x = 2; x < 8; x++)
        {
          if ((i + x) > 8 || (j - x) < 1)
            break;

          if ($scope.matrix[i + x][j - x] == 0)
            break;

          if ($scope.matrix[i + x][j - x] == p1)
          {
            x--;
            while (x > 0)
            {
              $scope.setValue(i + x, j - x, p1);
              x--;
            }
            break;
          }
        }
      }

      if ($scope.matrix[i - 1][j + 1] == p2)
      {
        for (x = 2; x < 8; x++)
        {
          if ((i - x) < 1 || (j + x) > 8)
            break;

          if ($scope.matrix[i - x][j + x] == 0)
            break;

          if ($scope.matrix[i - x][j + x] == p1)
          {
            x--;
            while (x > 0)
            {
              $scope.setValue(i - x, j + x, p1);
              x--;
            }
            break;
          }
        }
      }
    };

    $scope.calculateMove = function(id) {

      var coords = Array(2);

      if (id == 1)
      {
        p1 = 1;
        p2 = 2;
      }
      else
      {
        p1 = 2;
        p2 = 1;
      }

      if ($scope.stepControl(1, 8, id))
      {
        coords[0] = 1;
        coords[1] = 8;
      }
      else if ($scope.stepControl(8, 1, id))
      {
        coords[0] = 8;
        coords[1] = 1;
      }
      else if ($scope.stepControl(1, 1, id))
      {
        coords[0] = 1;
        coords[1] = 1;
      }
      else if ($scope.stepControl(8, 8, id))
      {
        coords[0] = 8;
        coords[1] = 8;
      }
      else
      {
        var count = 0;
        for (var n = 1; n <= 8; n = (n + 1))
        {
          for (var m = 1; m <= 8; m = (m + 1))
          {
            if ($scope.stepControl(n, m, id))
            {
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

        for (var n = 1; n <= 8; n = (n + 1))
        {
          for (var m = 1; m <= 8; m = (m + 1))
          {
            if ($scope.stepControl(n, m, id))
            {
              cordM[k] = m;
              cordN[k] = n;
              k = (k + 1);
            }
          }
        }

        for (k = 0; k < count; k++)
        {
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
          for (x = 1; x < 8; x++)
          {
            if ((cordN[k] + x) > 9)
              break;

            if ($scope.matrix[(cordN[k] + x)][cordM[k]] == 0)
            {
              score1 = 0;
              break;
            }

            if ($scope.matrix[(cordN[k] + x)][cordM[k]] == p2)
            {
              score1++;

              if ($scope.matrix[(cordN[k] + x + 1)][cordM[k]] == p1)
                break;
            }
          }
          moveScore[k] += score1;

          // 2
          for (x = 1; x < 8; x++)
          {
            if ((cordM[k] + x) > 9)
              break;

            if ($scope.matrix[(cordN[k])][cordM[k] + x] == 0)
            {
              score2 = 0;
              break;
            }

            if ($scope.matrix[(cordN[k])][cordM[k] + x] == p2)
            {
              score2++;

              if ($scope.matrix[(cordN[k])][cordM[k] + x + 1] == p1)
                break;
            }
          }
          moveScore[k] += score2;

          // 3
          for (x = 1; x < 8; x++)
          {
            if ((cordM[k] - x) < 0)
              break;

            if ($scope.matrix[(cordN[k])][cordM[k] - x] == 0)
            {
              score3 = 0;
              break;
            }

            if ($scope.matrix[(cordN[k])][cordM[k] - x] == p2)
            {
              score3++;

              if ($scope.matrix[(cordN[k])][cordM[k] - x - 1] == p1)
                break;
            }
          }
          moveScore[k] += score3;

          // 4
          for (x = 1; x < 8; x++)
          {
            if ((cordN[k] - x) < 0)
              break;

            if ($scope.matrix[(cordN[k]) - x][cordM[k]] == 0)
            {
              score4 = 0;
              break;
            }

            if ($scope.matrix[(cordN[k]) - x][cordM[k]] == p2)
            {
              score4++;

              if ($scope.matrix[(cordN[k]) - x - 1][cordM[k]] == p1)
                break;
            }
          }
          moveScore[k] += score4;

          // 5
          for (x = 1; x < 8; x++)
          {
            if ((cordN[k] + x) > 9 || (cordM[k] + x) > 9)
              break;

            if ($scope.matrix[(cordN[k]) + x][cordM[k] + x] == 0)
            {
              score5 = 0;
              break;
            }

            if ($scope.matrix[(cordN[k]) + x][cordM[k] + x] == p2)
            {
              score5++;

              if ($scope.matrix[(cordN[k]) + x + 1][cordM[k] + x + 1] == p1)
                break;
            }
          }
          moveScore[k] += score5;

          // 6
          for (x = 1; x < 8; x++)
          {
            if ((cordN[k] - x) < 0 || (cordM[k] - x) < 0)
              break;

            if ($scope.matrix[cordN[k] - x][cordM[k] - x] == 0)
            {
              score6 = 0;
              break;
            }

            if ($scope.matrix[(cordN[k]) - x][cordM[k] - x] == p2)
            {
              score6++;

              if ($scope.matrix[cordN[k] - x - 1][cordM[k] - x - 1] == p1)
                break;
            }
          }
          moveScore[k] += score6;

          // 7
          for (x = 1; x < 8; x++)
          {
            if ((cordN[k] + x) > 9 || (cordM[k] - x) < 0)
              break;

            if ($scope.matrix[(cordN[k]) + x][cordM[k] - x] == 0)
            {
              score7 = 0;
              break;
            }

            if ($scope.matrix[(cordN[k]) + x][cordM[k] - x] == p2)
            {
              score7++;

              if ($scope.matrix[(cordN[k]) + x + 1][cordM[k] - x - 1] == p1)
                break;
            }
          }
          moveScore[k] += score7;

          // 8
          for (x = 1; x < 8; x++)
          {
            if ((cordN[k] - x) < 0 || (cordM[k] + x) > 9)
              break;

            if ($scope.matrix[(cordN[k]) - x][cordM[k] + x] == 0)
            {
              score8 = 0;
              break;
            }

            if ($scope.matrix[(cordN[k]) - x][cordM[k] + x] == p2)
            {
              score8++;

              if ($scope.matrix[(cordN[k]) - x - 1][cordM[k] + x + 1] == p1)
                break;
            }
          }

          moveScore[k] += score8;
        }

        var max_k = 0;

        for (k = 0; k < count; k = (k + 1))
        {
          if ((cordN[k] == 1) ||
              (cordN[k] == 8) ||
              (cordM[k] == 1) ||
              (cordM[k] == 8))
          {
            moveScore[k] += 100;
          }
          else if ((cordN[k] == 2) ||
                   (cordN[k] == 7) ||
                   (cordM[k] == 2) ||
                   (cordM[k] == 7))
          {
            moveScore[k] -= 100;
            if (((cordN[k] == 2) && (cordM[k] == 2)) ||
                ((cordN[k] == 2) && (cordM[k] == 7)) ||
                ((cordN[k] == 7) && (cordM[k] == 2)) ||
                ((cordN[k] == 7) && (cordM[k] == 7)))
              moveScore[k] -= 50;
          }

          if (moveScore[k] > moveScore[max_k])
          {
            max_k = k;
          }
        }

        coords[0] = cordN[max_k];
        coords[1] = cordM[max_k];
      }

      return coords;
    };

    $scope.endGame = function() {
      if ($scope.white > $scope.black)
      {
        $scope.winc = "White wins!";
        $scope.win = "win_white";
      }
      else if ($scope.black > $scope.white)
      {
        $scope.winc = "Black wins!";
        $scope.win = "win_black";
      }
      else
      {
        $scope.winc = "Draw!";
        $scope.win = "win_white";
      }
    };

    this.clickEvent = function(x, y) {
      if($scope.turn == 1)
      {
        if (typeof $scope.matrix[x] == 'undefined')
          return;

        var playermove;
        var move;

        if (!$scope.stepControl(x, y, 1))
          return;

        $scope.stepProcess(x, y, 1);
        $scope.black = $scope.calculateScore(1);
        $scope.white = $scope.calculateScore(2);
        $scope.turn = 2;

        $timeout(function(){ $scope.CPUmove() }, 1000);
      }
    };
    
    $scope.CPUmove = function()
    {
      if($scope.turn == 2)
      {
       move = $scope.calculateMove(2);

        if (typeof move[0] == 'undefined' || typeof move[1] == 'undefined')
        {
          $scope.turn = 1;
          playermove = $scope.calculateMove(1);

          if (typeof playermove[0] == 'undefined' || typeof playermove[1] == 'undefined')
            $scope.endGame();

          return;
        }

        $scope.stepProcess(move[0], move[1], 2);
        $scope.black = $scope.calculateScore(1);
        $scope.white = $scope.calculateScore(2);
        $scope.turn = 1;

        playermove = $scope.calculateMove(1);
        while(typeof playermove[0] == 'undefined' || typeof playermove[1] == 'undefined')
        {
          move = $scope.calculateMove(2);

          if (typeof move[0] == 'undefined' || typeof move[1] == 'undefined')
            $scope.endGame();

          $scope.stepProcess(move[0], move[1], 2);
          $scope.black = $scope.calculateScore(1);
          $scope.white = $scope.calculateScore(2);

          playermove = $scope.calculateMove(1)
        }
      }
    };

  });
})();
