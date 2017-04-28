import {Component} from "angular-ts-decorators";
import {OthelloHandlerService} from "../services/othello_handler";
import {OthelloAIService} from "../services/othello_AI";

@Component({
    selector: 'othello',
    templateUrl: 'components/othello.html',
})
export class Othello {

    private $ctrl;
    private handler;
    private ai;

    private turn;
    private matrix;
    private cssClass;
    private endingAnimation;
    private scoreWhite;
    private scoreBlack;
    private playing;


    /*@ngInject*/
    constructor(OthelloHandlerService: OthelloHandlerService, OthelloAIService: OthelloAIService, private $timeout) {
        this.$ctrl = this; // not really needed, just a hint for the IDE
        this.handler = OthelloHandlerService;
        this.ai = OthelloAIService;
    }

    $onInit = () => {
        this.matrix = [];

        this.turn = 1;

        this.endingAnimation = {
            cssclass: 'win_disable',
            label: ''
        };

        this.scoreWhite = 0;
        this.scoreBlack = 0;
        this.playing = false;
    };

    startGame = function () {

        let i, j;

        for (i = 0; i < 10; i++) {
            this.matrix[i] = [];
            for (j = 0; j < 10; j++) {
                this.matrix[i][j] = 0;
            }
        }

        this.matrix[4][4] = 1;
        this.matrix[4][5] = 2;
        this.matrix[5][4] = 2;
        this.matrix[5][5] = 1;

        this.scoreBlack = this.handler.calculateScore(this.matrix, 1);
        this.scoreWhite = this.handler.calculateScore(this.matrix, 2);

        this.turn = 1;

        this.endingAnimation.label = '';
        this.endingAnimation.cssClass = 'win_disable';

        this.playing = true;
    };

    endGame = function () {
        if (this.scoreWhite > this.scoreBlack) {
            this.endingAnimation.label = "White wins!";
            this.endingAnimation.cssClass = "win_white";
        }
        else if (this.scoreBlack > this.scoreWhite) {
            this.endingAnimation.label = "Black wins!";
            this.endingAnimation.cssClass = "win_black";
        }
        else {
            this.endingAnimation.label = "Draw!";
            this.endingAnimation.cssClass = "win_white";
        }

        this.playing = false;
    };

    select = function (x, y) {
        if (this.turn == 1) {
            if (typeof this.matrix[x] == 'undefined')
                return;

            if (!this.handler.stepControl(this.matrix, x, y, 1))
                return;

            this.handler.stepProcess(this.matrix, x, y, 1);
            this.scoreBlack = this.handler.calculateScore(this.matrix, 1);
            this.scoreWhite = this.handler.calculateScore(this.matrix, 2);
            this.turn = 2;

            this.$timeout(() => {
                this.cpuMove()
            }, 1000);
        }
    };

    cpuMove = function () {
        let playerMove;

        if (this.turn == 2) {
            let move = this.ai.calculateMove(this.matrix, 2);

            if (typeof move[0] == 'undefined' || typeof move[1] == 'undefined') {
                this.turn = 1;
                playerMove = this.ai.calculateMove(this.matrix, 1);

                if (typeof playerMove[0] == 'undefined' || typeof playerMove[1] == 'undefined')
                    this.endGame();

                return;
            }

            this.handler.stepProcess(this.matrix, move[0], move[1], 2);
            this.scoreBlack = this.handler.calculateScore(this.matrix, 1);
            this.scoreWhite = this.handler.calculateScore(this.matrix, 2);
            this.turn = 1;

            playerMove = this.ai.calculateMove(this.matrix, 1);
            while (typeof playerMove[0] == 'undefined' || typeof playerMove[1] == 'undefined') {
                move = this.ai.calculateMove(this.matrix, 2);

                if (typeof move[0] == 'undefined' || typeof move[1] == 'undefined')
                    this.endGame();

                this.handler.stepProcess(this.matrix, move[0], move[1], 2);
                this.scoreBlack = this.handler.calculateScore(this.matrix, 1);
                this.scoreWhite = this.handler.calculateScore(this.matrix, 2);

                playerMove = this.ai.calculateMove(this.matrix, 1000)
            }
        }
    };
}
