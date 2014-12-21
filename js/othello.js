(function (){
  var app = angular.module('othello', [ ]);

  app.controller('othelloCtrl', function() {
    this.prova = "ciao ciao";

    this.getCoords = function(x, y) {
      alert(x + ", " + y);
    };
  });
})();
