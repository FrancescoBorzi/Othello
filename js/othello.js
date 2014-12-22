(function (){
  var app = angular.module('othello', [ ]);
  app.controller("othelloController", function(){
    this.t = [1,2,3,4,5,6,7, 8];
    this.matrix = [];
    this.white = 0;
    this.black = 0;

    this.changeColor = function(x, y, color) {
      var result = document.getElementById(x + "-" + y);
      var wrappedResult = angular.element(result);

      wrappedResult.removeClass("disc-empty");
      wrappedResult.removeClass("disc-black");
      wrappedResult.removeClass("disc-white");

      wrappedResult.addClass("disc-" + color);
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

      this.black = this.calculateScore(1);
      this.white = this.calculateScore(2);

      var result = document.getElementById('btn-start');
      result.innerHTML = "Restart";
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

        for (var x = 1; x <= 8; x++)
        {
          if (this.matrix[(i + x)][j] == 0)
            break;

          if (this.matrix[(i + x)][j] == p2)
          {
            if (this.matrix[(i + x + 1)][j] == p1)
              return true;
          }
        }

        for (var x = 1; x <= 8; x++)
        {
          if ((x > i) || (x - i == 0))
            break;

          if (this.matrix[(i - x)][j] == 0)
            break;

          if (this.matrix[(i - x)][j] == p2)
          {
            if (this.matrix[(i - x - 1)][j] == p1)
              return true;
          }

        }

        for (var x = 1; x <= 8; x++)
        {
          if (this.matrix[i][(j + x)] == 0)
            break;

          if (this.matrix[i][(j + x)] == p2)
          {
            if (this.matrix[i][(j + x + 1)] == p1)
              return true;
          }
        }

        for (var x = 1; x <= 8; x++)
        {
          if ((x > j) || (j - x == 0))
            break;

          if (this.matrix[i][(j - x)] == 0)
            break;

          if (this.matrix[i][(j - x)] == p2)
          {
            if (this.matrix[i][(j - x - 1)] == p1)
              return true;
          }
        }

        for (var x = 1; x <= 8; x++)
        {
          if (this.matrix[(i + x)][(j + x)] == 0)
            break;

          if (this.matrix[(i + x)][(j + x)] == p2)
          {
            if (this.matrix[(i + x + 1)][(j + x + 1)] == p1)
              return true;
          }
        }

        for (var x = 1; x <= 8; x++)
        {
          if ((x > j) || (x - j == 0))
            break;

          if (this.matrix[(i + x)][(j - x)] == 0)
            break;

          if ((this.matrix[(i + x)][(j - x)] == p2) && (this.matrix[(i + x + 1)][(j - x - 1)] == p1))
            return true;

        }

        for (var x = 1; x <= 8; x++)
        {
          if ((x > i) || (i - x == 0))
            break;

          if (this.matrix[(i - x)][(j + x)] == 0)
            break;

          if (this.matrix[(i - x)][(j + x)] == p2)
          {
            if (this.matrix[(i - x - 1)][(j + x + 1)] == p1)
              return true;
          }
        }

        for (var x = 1; x <= 8; x++)
        {
          if ((x > i) || (x > j) || (i - x == 0) || (j - x == 0))
            break;

          if (this.matrix[(i - x)][(j - x)] == 0)
            break;

          if (this.matrix[(i - x)][(j - x)] == p2)
          {
            if (this.matrix[(i - x - 1)][(j - x - 1)] == p1)
              return true;
          }
        }
        return false;
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

      var coordinate = Array(2);

      if (this.stepControl(1, 8, id))
      {
        coordinate[0] = 1;
        coordinate[1] = 8;
      }
      else if (this.stepControl(8, 1, id))
      {
        coordinate[0] = 8;
        coordinate[1] = 1;
      }
      else if (this.stepControl(1, 1, id))
      {
        coordinate[0] = 1;
        coordinate[1] = 1;
      }
      else if (this.stepControl(8, 8, id))
      {
        coordinate[0] = 8;
        coordinate[1] = 8;
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

        var punteggioMossa = Array(count);
        var cordM = Array(count);
        var cordN = Array(count);
        var k = 0;

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

        for (k = 0; k < count; k = (k + 1))
        {
          var punteggio1 = 0;
          var punteggio2 = 0;
          var punteggio3 = 0;
          var punteggio4 = 0;
          var punteggio5 = 0;
          var punteggio6 = 0;
          var punteggio7 = 0;
          var punteggio8 = 0;

          for (var x = 1; x <= 9; x = (x + 1))
          {
            if ((cordN[k] + x) > 9 || (cordM[k] + x) > 9)
            {
              break;
            }
            if (this.matrix[(cordN[k] + x)][cordM[k]] == 0)
            {
              punteggio1 = 0;
            }
            else if (this.matrix[(cordN[k] + x)][cordM[k]] == 1)
            {
              punteggio1 = (punteggio1 + 1);

              if (this.matrix[(cordN[k] + x + 1)][cordM[k]] == 2)
                break;
            }
          }

          var tmp407_405 = k;
          var tmp407_403 = punteggioMossa;

          tmp407_403[tmp407_405] = tmp407_403[tmp407_405] + punteggio1;

          for (var x = 1; x <= 9; x = (x + 1))
          {
            if (x > cordN[k])
            {
              break;
            }
            if (this.matrix[(cordN[k] - x)][cordM[k]] == 0)
            {
              punteggio2 = 0;
            }
            else if (this.matrix[(cordN[k] - x)][cordM[k]] == 1)
            {
              punteggio2 = (punteggio2 + 1);

              if (this.matrix[(cordN[k] - x - 1)][cordM[k]] == 2)
                break;
            }
          }

          var tmp539_537 = k;
          var tmp539_535 = punteggioMossa;

          tmp539_535[tmp539_537] = tmp539_535[tmp539_537] + punteggio2;

          for (var x = 1; x <= 9; x = (x + 1))
          {
            if (x + cordM[k] > 8)
            {
              break;
            }
            if (this.matrix[cordN[k]][(cordM[k] + x)] == 0)
            {
              punteggio3 = 0;
            }

            if (this.matrix[cordN[k]][(cordM[k] + x)] == 1)
            {
              punteggio3 = (punteggio3 + 1);

              if (this.matrix[cordN[k]][(cordM[k] + x + 1)] == 2)
                break;
            }
          }

          var tmp669_667 = k;
          var tmp669_665 = punteggioMossa;

          tmp669_665[tmp669_667] = tmp669_665[tmp669_667] + punteggio3;

          for (var x = 1; x <= 9; x = (x + 1))
          {
            if (x > cordM[k])
            {
              break;
            }
            if (this.matrix[cordN[k]][(cordM[k] - x)] == 0)
            {
              punteggio4 = 0;
            }
            else if (this.matrix[cordN[k]][(cordM[k] - x)] == 1)
            {
              punteggio4 = (punteggio4 + 1);

              if (this.matrix[cordN[k]][(cordM[k] - x - 1)] == 2)
                break;
            }
          }

          var tmp801_799 = k;
          var tmp801_797 = punteggioMossa;

          tmp801_797[tmp801_799] = tmp801_797[tmp801_799] + punteggio4;

          for (var x = 1; x <= 9; x = (x + 1))
          {
            if ((cordN[k] + x) > 9 || (cordM[k] + x) > 9)
            {
              break;
            }
            if (this.matrix[(cordN[k] + x)][(cordM[k] + x)] == 0)
            {
              punteggio5 = 0;
            }
            else if (this.matrix[(cordN[k] + x)][(cordM[k] + x)] == 1)
            {
              punteggio5 = (punteggio5 + 1);

              if (this.matrix[(cordN[k] + x + 1)][(cordM[k] + x + 1)] == 2)
                break;
            }
          }
          var tmp929_927 = k;
          var tmp929_925 = punteggioMossa;

          tmp929_925[tmp929_927] = tmp929_925[tmp929_927] + punteggio5;

          for (var x = 1; x <= 9; x = (x + 1))
          {
            if (x > cordM[k] || cordN[k] + x > 9)
            {
              break;
            }
            if (this.matrix[(cordN[k] + x)][(cordM[k] - x)] == 0)
            {
              punteggio6 = 0;
            }
            else if (this.matrix[(cordN[k] + x)][(cordM[k] - x)] == 1)
            {
              punteggio6 = (punteggio6 + 1);

              if (this.matrix[(cordN[k] + x + 1)][(cordM[k] - x - 1)] == 2)
                break;
            }
          }

          var tmp1072_1070 = k;
          var tmp1072_1068 = punteggioMossa;

          tmp1072_1068[tmp1072_1070] = tmp1072_1068[tmp1072_1070] + punteggio6;

          for (var x = 1; x <= 9; x = (x + 1))
          {
            if (x > cordN[k] || cordM[k] + x > 9)
            {
              break;
            }
            if (this.matrix[(cordN[k] - x)][(cordM[k] + x)] == 0)
            {
              punteggio7 = 0;
            }
            else if (this.matrix[(cordN[k] - x)][(cordM[k] + x)] == 1)
            {
              punteggio7 = (punteggio7 + 1);

              if (this.matrix[(cordN[k] - x - 1)][(cordM[k] + x + 1)] == 2)
                break;
            }
          }
          var tmp1215_1213 = k;
          var tmp1215_1211 = punteggioMossa;

          tmp1215_1211[tmp1215_1213] = tmp1215_1211[tmp1215_1213] + punteggio7;

          for (var x = 1; x <= 9; x = (x + 1))
          {
            if ((x > cordN[k]) || (x > cordM[k]))
            {
              break;
            }
            if (this.matrix[(cordN[k] - x)][(cordM[k] - x)] == 0)
            {
              punteggio8 = 0;
            }
            else if (this.matrix[(cordN[k] - x)][(cordM[k] - x)] == 1)
            {
              punteggio8 = (punteggio8 + 1);

              if (this.matrix[(cordN[k] - x - 1)][(cordM[k] - x - 1)] == 2)
                break;
            }
          }
          var tmp1370_1368 = k;
          var tmp1370_1366 = punteggioMossa;

          tmp1370_1366[tmp1370_1368] = ((tmp1370_1366[tmp1370_1368] + punteggio8));

          if ((cordN[k] == 1) || (cordN[k] == 8) || (cordM[k] == 1) || (cordM[k] == 8))
          {
            var tmp1419_1417 = k;
            var tmp1419_1415 = punteggioMossa;

            tmp1419_1415[tmp1419_1417] = tmp1419_1415[tmp1419_1417] + 10;
          }

        }

        var max_k = 0;

        for (k = 0; k < count; k = (k + 1)) {
          if (punteggioMossa[k] > max_k) {
            max_k = k;
          }
        }
        coordinate[0] = cordN[max_k];
        coordinate[1] = cordM[max_k];
      }

      return coordinate;
    };

    this.endGame = function() {
      if (this.white > this.black)
        alert("White wins");
      else if (this.black > this.white)
        alert("Black wins");
      else
        alert("Draw");
    };

    this.clickEvent = function(x, y) {

      var playermove;
      var move;

      if (!this.stepControl(x, y, 1))
        return;

      this.stepProcess(x, y, 1);
      this.black = this.calculateScore(1);
      this.white = this.calculateScore(2);

      move = this.calculateMove(2);

      if (typeof move[0] == 'undefined' || typeof move[1] == 'undefined')
      {
        playermove = this.calculateMove(1);

        if (typeof playermove[0] == 'undefined' || typeof playermove[1] == 'undefined')
          this.endGame();

        return;
      }

      this.stepProcess(move[0], move[1], 2);
      this.black = this.calculateScore(1);
      this.white = this.calculateScore(2);

      playermove = this.calculateMove(1);
      while(typeof playermove[0] == 'undefined' || typeof playermove[1] == 'undefined')
      {
        move = this.calculateMove(2);

        if (typeof move[0] == 'undefined' || typeof move[1] == 'undefined')
          this.endGame();

        this.stepProcess(move[0], move[1], 2);
        this.black = this.calculateScore(1);
        this.white = this.calculateScore(2);

        playermove = this.calculateMove(1)
      }
    };

  });
})();
