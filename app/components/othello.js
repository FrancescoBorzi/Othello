(function (angular) {

  angular.module('othelloApp')
    .component('othello', {
      templateUrl: 'components/othello.html',
      controller: OthelloController
    });

  function OthelloController(OthelloHandlerService, OthelloAIService, $timeout) {
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
          ctrl.matrix[i][j] = 0;
        }
      }

      ctrl.matrix[4][4] = 1;
      ctrl.matrix[4][5] = 2;
      ctrl.matrix[5][4] = 2;
      ctrl.matrix[5][5] = 1;

      ctrl.black = OthelloHandlerService.calculateScore(ctrl.matrix, 1);
      ctrl.white = OthelloHandlerService.calculateScore(ctrl.matrix, 2);

      ctrl.turn = 1;

      ctrl.win = "win_disabled";
      ctrl.winc = "";

      ctrl.playing = true;
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

        if (!OthelloHandlerService.stepControl(ctrl.matrix, x, y, 1))
          return;

        OthelloHandlerService.stepProcess(ctrl.matrix, x, y, 1);
        ctrl.black = OthelloHandlerService.calculateScore(ctrl.matrix, 1);
        ctrl.white = OthelloHandlerService.calculateScore(ctrl.matrix, 2);
        ctrl.turn = 2;

        $timeout(function () { ctrl.CPUmove() }, 1000);
      }
    };

    ctrl.CPUmove = function () {
      if (ctrl.turn == 2) {
        move = OthelloAIService.calculateMove(ctrl.matrix, 2);

        if (typeof move[0] == 'undefined' || typeof move[1] == 'undefined') {
          ctrl.turn = 1;
          playermove = OthelloAIService.calculateMove(ctrl.matrix, 1);

          if (typeof playermove[0] == 'undefined' || typeof playermove[1] == 'undefined')
            ctrl.endGame();

          return;
        }

        OthelloHandlerService.stepProcess(ctrl.matrix, move[0], move[1], 2);
        ctrl.black = OthelloHandlerService.calculateScore(ctrl.matrix, 1);
        ctrl.white = OthelloHandlerService.calculateScore(ctrl.matrix, 2);
        ctrl.turn = 1;

        playermove = OthelloAIService.calculateMove(ctrl.matrix, 1);
        while (typeof playermove[0] == 'undefined' || typeof playermove[1] == 'undefined') {
          move = OthelloAIService.calculateMove(ctrl.matrix, 2);

          if (typeof move[0] == 'undefined' || typeof move[1] == 'undefined')
            ctrl.endGame();

          OthelloHandlerService.stepProcess(ctrl.matrix, move[0], move[1], 2);
          ctrl.black = OthelloHandlerService.calculateScore(ctrl.matrix, 1);
          ctrl.white = OthelloHandlerService.calculateScore(ctrl.matrix, 2);

          playermove = OthelloAIService.calculateMove(ctrl.matrix, 1)
        }
      }
    };
  }

}

)(window.angular);
