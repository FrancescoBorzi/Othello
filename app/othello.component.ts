import {Component} from "angular-ts-decorators";
import {OthelloHandlerService} from "./othello-handler.service";
import {OthelloAIService} from "./othello-ai.service";

@Component({
    selector: 'othello',
    templateUrl: 'othello.component.html',
})
export class Othello {

    private $ctrl: Othello;
    private handler: OthelloHandlerService;
    private ai: OthelloAIService;

    private turn: number;
    private matrix: number[][];
    private endingAnimation: {label: string, cssClass: string};
    private scoreWhite: number;
    private scoreBlack: number;
    private playing: boolean;


    /*@ngInject*/
    constructor(OthelloHandlerService: OthelloHandlerService, OthelloAIService: OthelloAIService, private $timeout) {
        this.$ctrl = this; // not really needed, just a hint for the IDE
        this.handler = OthelloHandlerService;
        this.ai = OthelloAIService;
    }

    /**
     * Automatically called when the component is initialised
     */
    $onInit() {
        this.matrix = [];

        this.turn = 1;

        this.endingAnimation = {
            cssClass: 'win_disable',
            label: ''
        };

        this.scoreWhite = 0;
        this.scoreBlack = 0;
        this.playing = false;
    }

    startGame(): void {

        for (let x = 0; x < 10; x++) {
            this.matrix[x] = [];
            for (let y = 0; y < 10; y++) {
                this.matrix[x][y] = 0;
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
    }

    endGame(): void {
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
    }

    select(x: number, y: number): void {

        if (this.turn == 1) {

            if (typeof this.matrix[x] == 'undefined') {
                return;
            }

            if (!this.handler.stepControl(this.matrix, x, y, 1)) {
                return;
            }

            this.handler.stepProcess(this.matrix, x, y, 1);
            this.scoreBlack = this.handler.calculateScore(this.matrix, 1);
            this.scoreWhite = this.handler.calculateScore(this.matrix, 2);
            this.turn = 2;

            this.$timeout(() => {
                this.cpuMove()
            }, 1000);
        }
    }

    cpuMove(): void {
        let playerMove: Coord|null;

        if (this.turn == 2) {
            let move = this.ai.calculateMove(this.matrix, 2);

            if (typeof move.x == 'undefined' || typeof move.y == 'undefined') {
                this.turn = 1;
                playerMove = this.ai.calculateMove(this.matrix, 1);

                if (typeof playerMove.x == 'undefined' || typeof playerMove.y == 'undefined')
                    this.endGame();

                return;
            }

            this.handler.stepProcess(this.matrix, move.x, move.y, 2);
            this.scoreBlack = this.handler.calculateScore(this.matrix, 1);
            this.scoreWhite = this.handler.calculateScore(this.matrix, 2);
            this.turn = 1;

            playerMove = this.ai.calculateMove(this.matrix, 1);
            while (typeof playerMove.x == 'undefined' || typeof playerMove.y == 'undefined') {
                move = this.ai.calculateMove(this.matrix, 2);

                if (typeof move.x == 'undefined' || typeof move.y == 'undefined')
                    this.endGame();

                this.handler.stepProcess(this.matrix, move.x, move.y, 2);
                this.scoreBlack = this.handler.calculateScore(this.matrix, 1);
                this.scoreWhite = this.handler.calculateScore(this.matrix, 2);

                playerMove = this.ai.calculateMove(this.matrix, 1)
            }
        }
    }
}
