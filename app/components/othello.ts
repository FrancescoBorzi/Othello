import * as angular from 'angular';

export default angular.module('othello.components.othello', [])
    .component('othello', {
        templateUrl: 'components/othello.html',
        controller: OthelloController
    }).name;

/**
 * @param $timeout
 * @param {OthelloHandlerService} OthelloHandlerService
 * @param {OthelloAIService} OthelloAIService
 */
function OthelloController(OthelloHandlerService, OthelloAIService, $timeout) {
    let ctrl = this;
    let handler = OthelloHandlerService;
    let ai = OthelloAIService;

    ctrl.$onInit = () =>{
        ctrl.matrix = [];

        ctrl.turn = 1;

        ctrl.endingAnimation = {
            class: 'win_disable',
            label: ''
        };

        ctrl.scoreWhite = 0;
        ctrl.scoreBlack = 0;
        ctrl.playing = false;
    };

    ctrl.startGame = function () {

        let i, j;

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

        ctrl.scoreBlack = handler.calculateScore(ctrl.matrix, 1);
        ctrl.scoreWhite = handler.calculateScore(ctrl.matrix, 2);

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

            if (!handler.stepControl(ctrl.matrix, x, y, 1))
                return;

            handler.stepProcess(ctrl.matrix, x, y, 1);
            ctrl.scoreBlack = handler.calculateScore(ctrl.matrix, 1);
            ctrl.scoreWhite = handler.calculateScore(ctrl.matrix, 2);
            ctrl.turn = 2;

            $timeout(() => { ctrl.cpuMove() }, 1000);
        }
    };

    ctrl.cpuMove = function () {
        let playerMove;

        if (ctrl.turn == 2) {
            let move = ai.calculateMove(ctrl.matrix, 2);

            if (typeof move.x == 'undefined' || typeof move.y == 'undefined') {
                ctrl.turn = 1;
                playerMove = ai.calculateMove(ctrl.matrix, 1);

                if (typeof playerMove.x == 'undefined' || typeof playerMove.y == 'undefined')
                    ctrl.endGame();

                return;
            }

            handler.stepProcess(ctrl.matrix, move.x, move.y, 2);
            ctrl.scoreBlack = handler.calculateScore(ctrl.matrix, 1);
            ctrl.scoreWhite = handler.calculateScore(ctrl.matrix, 2);
            ctrl.turn = 1;

            playerMove = ai.calculateMove(ctrl.matrix, 1);
            while (typeof playerMove.x == 'undefined' || typeof playerMove.y == 'undefined') {
                move = ai.calculateMove(ctrl.matrix, 2);

                if (typeof move.x == 'undefined' || typeof move.y == 'undefined')
                    ctrl.endGame();

                handler.stepProcess(ctrl.matrix, move.x, move.y, 2);
                ctrl.scoreBlack = handler.calculateScore(ctrl.matrix, 1);
                ctrl.scoreWhite = handler.calculateScore(ctrl.matrix, 2);

                playerMove = ai.calculateMove(ctrl.matrix, 1000)
            }
        }
    };
}
