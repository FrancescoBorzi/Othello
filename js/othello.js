(function (){
  var app = angular.module('othello', [ ]);
  app.controller("othelloController", function(){
    this.t = [0,1,2,3,4,5,6,7];
    this.chgimg = function chgimg(cx, cy) {

    document.getElementsByTagName("tr")[cx].getElementsByTagName("td")[cy].getElementsByTagName("button")[0].style.backgroundColor = 'red';

    };
  });
})();
