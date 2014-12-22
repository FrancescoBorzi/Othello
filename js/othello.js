(function (){
  var app = angular.module('othello', [ ]);
  app.controller("othelloController", function(){
    this.t = [0,1,2,3,4,5,6,7];
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

      for(i = 0; i < 8; i++)
      {
        this.matrix[i] = new Array(8);
        for(j = 0; j < 8; j++)
        {
          this.setValue(i, j, 0);
        }
      }

      this.setValue(3, 3, 1);
      this.setValue(3, 4, 2);
      this.setValue(4, 3, 2);
      this.setValue(4, 4, 1);

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

    this.stepControl = function(x, y, val) {

      // TODO

      return false;
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
