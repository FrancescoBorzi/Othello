(function (){
  var app = angular.module('othello', [ ]);
  app.controller("othelloController", function(){
    this.t = [1,2,3,4,5,6,7, 8];
    this.matrix = [];

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
          this.matrix[i][j] = 0;
        }
      }

      this.setValue(4, 4, 1);
      this.setValue(4, 5, 2);
      this.setValue(5, 4, 2);
      this.setValue(5, 5, 1);

      var result = document.getElementById('btn-start');
      result.innerHTML = "Restart";
    };

    this.flowControl = function() {

      for (var i = 0; i < 8; i++)
      {
        for (var j = 0; j < 8; j++)
        {
          if (this.matrix[i][j] == 0)
            return true;
        }
      }
      return false;
    };

    this.calculateScore = function(val) {
      var count = 0;

      for (var i = 0; i < 8; i++)
      {
        for (var j = 0; j < 8; j++)
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

    this.debugStepControl = function(x, y, val) {
      if (this.stepControl(x, y, val))
          alert("true");
      else
        alert("false");
    };

    this.stepProcess = function(x, y, val) {

      // TODO

    }

    this.calculateMove = function() {

      // TODO

    }

    this.clickEvent = function(x, y) {
      alert("Debug: clicked on (" + x + ", " + y + ")");

      if (!this.stepControl(x, y, val))
        return;

      this.stepProcess(x, y, val);

      if (!this.flowControl())
      {
        // TODO
      }

      this.calculateMove();

      if (!this.flowControl())
      {
        // TODO
      }
    };

    // */
  });
})();
