(function (){
  var app = angular.module('othello', [ ]);
  app.controller("othelloController", function($scope) {

    this.t = [1, 2, 3, 4, 5, 6, 7, 8];
    this.matrix = [];

    $scope.classes = [];
    for(var i = 0; i < 10; i++)
      $scope.classes[i] = new Array(8);

    $scope.white = 0;
    $scope.black = 0;
    $scope.start = "Start";

    this.changeColor = function(x, y, color) {
      $scope.classes[x][y] = "disc-" + color;
    };

    this.setValue = function(x, y, val) {
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

      this.changeColor(x, y, color);
      this.matrix[x][y] = val;
    }

    this.init = function() {

      var i, j;

      for(i = 0; i < 10; i++)
      {
        this.matrix[i] = new Array(8);
        for(j = 0; j < 10; j++)
        {
          this.setValue(i, j, 0);
        }
      }

      this.setValue(4, 4, 1);
      this.setValue(4, 5, 2);
      this.setValue(5, 4, 2);
      this.setValue(5, 5, 1);

      $scope.black = this.calculateScore(1);
      $scope.white = this.calculateScore(2);

      $scope.start = "Restart";
    };

    this.calculateScore = function(val) {
      var count = 0;

      for (var i = 1; i < 9; i++)
      {
        for (var j = 1; j < 9; j++)
        {
          if (this.matrix[i][j] == val)
            count++;
        }
      }

      return count;
    };

    this.stepControl = function(i, j, id) {

      if (this.matrix[i][j] == 0)
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

        if ((this.matrix[(i + 1)][j] != p2) &&
            (this.matrix[i][(j + 1)] != p2) &&
            (this.matrix[(i + 1)][(j + 1)] != p2) &&
            (this.matrix[(i - 1)][j] != p2) &&
            (this.matrix[i][(j - 1)] != p2) &&
            (this.matrix[(i - 1)][(j - 1)] != p2) &&
            (this.matrix[(i + 1)][(j - 1)] != p2) &&
            (this.matrix[(i - 1)][(j + 1)] != p2))
        {
          return false;
        }

        var x;

        if (this.matrix[i + 1][j] == p2)
        {
          for (x = 2; x < 7; x++)
          {
            if ((i + x) > 8)
              break;

            if (this.matrix[i + x][j] == 0)
              break;

            if (this.matrix[i + x][j] == p1)
              return true;
          }
        }

        if (this.matrix[i][j + 1] == p2)
        {
          for (x = 2; x < 7; x++)
          {
            if ((j + x) > 8)
              break;

            if (this.matrix[i][j + x] == 0)
              break;

            if (this.matrix[i][j + x] == p1)
              return true;
          }
        }

        if (this.matrix[i - 1][j] == p2)
        {
          for (x = 2; x < 7; x++)
          {
            if (i - j < 1)
              break;

            if (this.matrix[i - x][j] == 0)
              break;

            if (this.matrix[i - x][j] == p1)
              return true;
          }
        }

        if (this.matrix[i][j - 1] == p2)
        {
          for (x = 2; x < 7; x++)
          {
            if ((j - x) < 1)
              break;

            if (this.matrix[i][j - x] == 0)
              break;

            if (this.matrix[i][j - x] == p1)
              return true;
          }
        }

        if (this.matrix[i + 1][j + 1] == p2)
        {
          for (x = 2; x < 7; x++)
          {
            if ((i + x) > 8 || (j + x) > 8)
              break;

            if (this.matrix[i + x][j + x] == 0)
              break;

            if (this.matrix[i + x][j + x] == p1)
              return true;
          }
        }

        if (this.matrix[i - 1][j - 1] == p2)
        {
          for (x = 2; x < 7; x++)
          {
            if ((i - x) < 1 || (j - x) < 1)
              break;

            if (this.matrix[i - x][j - x] == 0)
              break;

            if (this.matrix[i - x][j - x] == p1)
              return true;
          }
        }

        if (this.matrix[i + 1][j - 1] == p2)
        {
          for (x = 2; x < 7; x++)
          {
            if ((i + x) > 8 || (j - x) < 1)
              break;

            if (this.matrix[i + x][j - x] == 0)
              break;

            if (this.matrix[i + x][j - x] == p1)
              return true;
          }
        }

        if (this.matrix[i - 1][j + 1] == p2)
        {
          for (x = 2; x < 7; x++)
          {
            if ((i - x) < 1 || (j + x) > 8)
              break;

            if (this.matrix[i - x][j + x] == 0)
              break;

            if (this.matrix[i - x][j + x] == p1)
              return true;
          }
        }
      }

      return false;
    };

    this.stepProcess = function(i, j, id) {
      this.setValue(i, j, id);

      var c = 0;
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

      for (var x = 1; x <= 8; x = (x + 1))
      {
        if (this.matrix[(i + x)][j] == 0) {
          break;
        }
        if (this.matrix[(i + x)][j] == p2)
        {
          c = (c + 1);
          if (this.matrix[(i + x + 1)][j] == p1)
          {
            while (c > 0)
            {
              this.setValue((i + x - c + 1), j, p1);
              c = (c - 1);
            }
          }
        }
      }

      c = 0;

      for (var x = 1; x <= 8; x = (x + 1))
      {
        if (x > i) {
          break;
        }
        if (this.matrix[(i - x)][j] == 0) {
          break;
        }
        if (this.matrix[(i - x)][j] == p2)
        {
          c = c + 1;
          if (this.matrix[(i - x - 1)][j] == p1)
          {
            while (c > 0)
            {
              this.setValue((i - x + c - 1), j, p1);
              c = (c - 1);
            }
          }
        }
      }

      c = 0;

      for (var x = 1; x <= 8; x = (x + 1))
      {
        if (this.matrix[i][(j + x)] == 0) {
          break;
        }
        if (this.matrix[i][(j + x)] == p2)
        {
          c = (c + 1);
          if (this.matrix[i][(j + x + 1)] == p1)
          {
            while (c > 0)
            {
              this.setValue(i, (j + x - c + 1), p1);
              c = (c - 1);
            }
          }
        }
      }

      c = 0;

      for (var x = 1; x <= 8; x = (x + 1))
      {
        if (x > j) {
          break;
        }
        if (this.matrix[i][(j - x)] == 0) {
          break;
        }
        if (this.matrix[i][(j - x)] == p2)
        {
          c = (c + 1);
          if (this.matrix[i][(j - x - 1)] == p1)
          {
            while (c > 0)
            {
              this.setValue(i, (j - x + c - 1), p1);
              c = (c - 1);
            }
          }
        }
      }

      c = 0;

      for (var x = 1; x <= 8; x = (x + 1))
      {
        if (this.matrix[(i + x)][(j + x)] == 0) {
          break;
        }
        if (this.matrix[(i + x)][(j + x)] == p2)
        {
          c = (c + 1);
          if (this.matrix[(i + x + 1)][(j + x + 1)] == p1)
          {
            while (c > 0)
            {
              this.setValue((i + x - c + 1), (j + x - c + 1), p1);
              c = (c - 1);
            }
          }
        }
      }

      c = 0;

      for (var x = 1; x <= 8; x = (x + 1))
      {
        if (x > j) {
          break;
        }
        if (this.matrix[(i + x)][(j - x)] == 0) {
          break;
        }
        if (this.matrix[(i + x)][(j - x)] == p2)
        {
          c = (c + 1);
          if (this.matrix[(i + x + 1)][(j - x - 1)] == p1)
          {
            while (c > 0)
            {
              this.setValue((i + x - c + 1), (j - x + c - 1), p1);
              c = (c - 1);
            }
          }
        }
      }

      c = 0;

      for (var x = 1; x <= 8; x = (x + 1))
      {
        if (x > i) {
          break;
        }
        if (this.matrix[(i - x)][(j + x)] == 0) {
          break;
        }
        if (this.matrix[(i - x)][(j + x)] == p2)
        {
          c = (c + 1);
          if (this.matrix[(i - x - 1)][(j + x + 1)] == p1)
          {
            while (c > 0)
            {
              this.setValue((i - x + c - 1), (j + x - c + 1), p1);
              c = (c - 1);
            }
          }
        }
      }

      c = 0;

      for (var x = 1; x <= 8; x = (x + 1))
      {
        if ((x > i) || (x > i)) {
          break;
        }
        if (this.matrix[(i - x)][(j - x)] == 0) {
          break;
        }
        if (this.matrix[(i - x)][(j - x)] == p2)
        {
          c = (c + 1);
          if (this.matrix[(i - x - 1)][(j - x - 1)] == p1)
          {
            while (c > 0)
            {
              this.setValue((i - x + c - 1), (j - x + c - 1), p1);
              c = (c - 1);
            }
          }
        }
      }

      c = 0;
    };

    this.calculateMove = function(id) {

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

      if (this.stepControl(1, 8, id))
      {
        coords[0] = 1;
        coords[1] = 8;
      }
      else if (this.stepControl(8, 1, id))
      {
        coords[0] = 8;
        coords[1] = 1;
      }
      else if (this.stepControl(1, 1, id))
      {
        coords[0] = 1;
        coords[1] = 1;
      }
      else if (this.stepControl(8, 8, id))
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
            if (this.stepControl(n, m, id))
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
            if (this.stepControl(n, m, id))
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

            if (this.matrix[(cordN[k] + x)][cordM[k]] == 0)
            {
              score1 = 0;
              break;
            }

            if (this.matrix[(cordN[k] + x)][cordM[k]] == p2)
            {
              score1++;

              if (this.matrix[(cordN[k] + x + 1)][cordM[k]] == p1)
                break;
            }
          }
          moveScore[k] += score1;

          // 2
          for (x = 1; x < 8; x++)
          {
            if ((cordM[k] + x) > 9)
              break;

            if (this.matrix[(cordN[k])][cordM[k] + x] == 0)
            {
              score2 = 0;
              break;
            }

            if (this.matrix[(cordN[k])][cordM[k] + x] == p2)
            {
              score2++;

              if (this.matrix[(cordN[k])][cordM[k] + x + 1] == p1)
                break;
            }
          }
          moveScore[k] += score2;

          // 3
          for (x = 1; x < 8; x++)
          {
            if ((cordM[k] - x) < 0)
              break;

            if (this.matrix[(cordN[k])][cordM[k] - x] == 0)
            {
              score3 = 0;
              break;
            }

            if (this.matrix[(cordN[k])][cordM[k] - x] == p2)
            {
              score3++;

              if (this.matrix[(cordN[k])][cordM[k] - x - 1] == p1)
                break;
            }
          }
          moveScore[k] += score3;

          // 4
          for (x = 1; x < 8; x++)
          {
            if ((cordN[k] - x) < 0)
              break;

            if (this.matrix[(cordN[k]) - x][cordM[k]] == 0)
            {
              score4 = 0;
              break;
            }

            if (this.matrix[(cordN[k]) - x][cordM[k]] == p2)
            {
              score4++;

              if (this.matrix[(cordN[k]) - x - 1][cordM[k]] == p1)
                break;
            }
          }
          moveScore[k] += score4;

          // 5
          for (x = 1; x < 8; x++)
          {
            if ((cordN[k] + x) > 9 || (cordM[k] + x) > 9)
              break;

            if (this.matrix[(cordN[k]) + x][cordM[k] + x] == 0)
            {
              score5 = 0;
              break;
            }

            if (this.matrix[(cordN[k]) + x][cordM[k] + x] == p2)
            {
              score5++;

              if (this.matrix[(cordN[k]) + x + 1][cordM[k] + x + 1] == p1)
                break;
            }
          }
          moveScore[k] += score5;

          // 6
          for (x = 1; x < 8; x++)
          {
            if ((cordN[k] - x) < 0 || (cordM[k] - x) < 0)
              break;

            if (this.matrix[cordN[k] - x][cordM[k] - x] == 0)
            {
              score6 = 0;
              break;
            }

            if (this.matrix[(cordN[k]) - x][cordM[k] - x] == p2)
            {
              score6++;

              if (this.matrix[cordN[k] - x - 1][cordM[k] - x - 1] == p1)
                break;
            }
          }
          moveScore[k] += score6;

          // 7
          for (x = 1; x < 8; x++)
          {
            if ((cordN[k] + x) > 9 || (cordM[k] - x) < 0)
              break;

            if (this.matrix[(cordN[k]) + x][cordM[k] - x] == 0)
            {
              score7 = 0;
              break;
            }

            if (this.matrix[(cordN[k]) + x][cordM[k] - x] == p2)
            {
              score7++;

              if (this.matrix[(cordN[k]) + x + 1][cordM[k] - x - 1] == p1)
                break;
            }
          }
          moveScore[k] += score7;

          // 8
          for (x = 1; x < 8; x++)
          {
            if ((cordN[k] - x) < 0 || (cordM[k] + x) > 9)
              break;

            if (this.matrix[(cordN[k]) - x][cordM[k] + x] == 0)
            {
              score8 = 0;
              break;
            }

            if (this.matrix[(cordN[k]) - x][cordM[k] + x] == p2)
            {
              score8++;

              if (this.matrix[(cordN[k]) - x - 1][cordM[k] + x + 1] == p1)
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

    this.endGame = function() {
      if ($scope.white > $scope.black)
        alert("White wins");
      else if ($scope.black > $scope.white)
        alert("Black wins");
      else
        alert("Draw");
    };

    this.clickEvent = function(x, y) {

      if (typeof this.matrix[x] == 'undefined')
        return;

      var playermove;
      var move;

      if (!this.stepControl(x, y, 1))
        return;

      this.stepProcess(x, y, 1);
      $scope.black = this.calculateScore(1);
      $scope.white = this.calculateScore(2);

      move = this.calculateMove(2);

      if (typeof move[0] == 'undefined' || typeof move[1] == 'undefined')
      {
        playermove = this.calculateMove(1);

        if (typeof playermove[0] == 'undefined' || typeof playermove[1] == 'undefined')
          this.endGame();

        return;
      }

      this.stepProcess(move[0], move[1], 2);
      $scope.black = this.calculateScore(1);
      $scope.white = this.calculateScore(2);

      playermove = this.calculateMove(1);
      while(typeof playermove[0] == 'undefined' || typeof playermove[1] == 'undefined')
      {
        move = this.calculateMove(2);

        if (typeof move[0] == 'undefined' || typeof move[1] == 'undefined')
          this.endGame();

        this.stepProcess(move[0], move[1], 2);
        $scope.black = this.calculateScore(1);
        $scope.white = this.calculateScore(2);

        playermove = this.calculateMove(1)
      }
    };

  });
})();
