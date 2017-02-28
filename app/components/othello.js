import angular from 'angular';

export default angular.module('othello.components.othello', [])
    .component('othello', {
        templateUrl: 'components/othello.html',
        controller: OthelloController
    }).name;

function OthelloController(OthelloHandlerService, OthelloAIService, $timeout) {
    var ctrl = this;

    ctrl.$onInit = function () {
        ctrl.matrix = [];

        ctrl.turn = 1;

        ctrl.endingAnimation = {
            class: 'win_disable',
            label: ''
        }

        ctrl.scoreWhite = 0;
        ctrl.scoreBlack = 0;
        ctrl.playing = false;
    }

    ctrl.startGame = function () {

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

        ctrl.scoreBlack = OthelloHandlerService.calculateScore(ctrl.matrix, 1);
        ctrl.scoreWhite = OthelloHandlerService.calculateScore(ctrl.matrix, 2);

        ctrl.turn = 1;

        ctrl.endingAnimation.label = '';
        ctrl.endingAnimation.class = 'win_disable';

        ctrl.playing = true;
    };

    ctrl.endGame = function () {
        if (ctrl.scoreWhite > ctrl.scoreBlack) {
            ctrl.endingAnimation.label = "White wins!";
            ctrl.endingAnimation.class = "win_white";
        }
        else if (ctrl.scoreBlack > ctrl.scoreWhite) {
            ctrl.endingAnimation.label = "Black wins!";
            ctrl.endingAnimation.class = "win_black";
        }
        else {
            ctrl.endingAnimation.label = "Draw!";
            ctrl.endingAnimation.class = "win_white";
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
            ctrl.scoreBlack = OthelloHandlerService.calculateScore(ctrl.matrix, 1);
            ctrl.scoreWhite = OthelloHandlerService.calculateScore(ctrl.matrix, 2);
            ctrl.turn = 2;

            $timeout(() => { ctrl.cpuMove() }, 1000);
        }
    };

    ctrl.cpuMove = function () {
        let playermove;

        if (ctrl.turn == 2) {
            let move = OthelloAIService.calculateMove(ctrl.matrix, 2);

            if (typeof move[0] == 'undefined' || typeof move[1] == 'undefined') {
                ctrl.turn = 1;
                playermove = OthelloAIService.calculateMove(ctrl.matrix, 1);

                if (typeof playermove[0] == 'undefined' || typeof playermove[1] == 'undefined')
                    ctrl.endGame();

                return;
            }

            OthelloHandlerService.stepProcess(ctrl.matrix, move[0], move[1], 2);
            ctrl.scoreBlack = OthelloHandlerService.calculateScore(ctrl.matrix, 1);
            ctrl.scoreWhite = OthelloHandlerService.calculateScore(ctrl.matrix, 2);
            ctrl.turn = 1;

            playermove = OthelloAIService.calculateMove(ctrl.matrix, 1);
            while (typeof playermove[0] == 'undefined' || typeof playermove[1] == 'undefined') {
                move = OthelloAIService.calculateMove(ctrl.matrix, 2);

                if (typeof move[0] == 'undefined' || typeof move[1] == 'undefined')
                    ctrl.endGame();

                OthelloHandlerService.stepProcess(ctrl.matrix, move[0], move[1], 2);
                ctrl.scoreBlack = OthelloHandlerService.calculateScore(ctrl.matrix, 1);
                ctrl.scoreWhite = OthelloHandlerService.calculateScore(ctrl.matrix, 2);

                playermove = OthelloAIService.calculateMove(ctrl.matrix, 1000)
            }
        }
    };
}
