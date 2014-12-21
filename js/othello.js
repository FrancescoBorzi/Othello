(function (){
  var app = angular.module('othello', [ ]);
  app.controller("othelloController", function(){
    this.t = [0,1,2,3,4,5,6,7];

    this.changeColor = function(x, y, color) {
      var result = document.getElementById(x + "-" + y);
      var wrappedResult = angular.element(result);

      wrappedResult.removeClass("disc-empty");
      wrappedResult.removeClass("disc-black");
      wrappedResult.removeClass("disc-white");

      wrappedResult.addClass("disc-" + color);
    };
  });
})();
