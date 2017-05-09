import * as angular from "angular";
import {ITimeoutService} from "angular";
import {Component, Input, Output} from "angular-ts-decorators";
import {OthelloHandlerService} from "./othello-handler.service";

@Component({
    selector: 'othelloBoard',
    templateUrl: 'othello-board.component.html'
})
export class OthelloBoard {
    @Output() onSelection: (Coord) => void;
    @Input() isPlaying: boolean;
    @Input() matrix: number[][];

    private $ctrl: OthelloBoard;
    private highlights: boolean[];
    private handler: OthelloHandlerService;

    /*@ngInject*/
    constructor(OthelloHandlerService: OthelloHandlerService, private $timeout: ITimeoutService) {
        this.$ctrl = this;  // not really needed, just a hint for the IDE
        this.handler = OthelloHandlerService;
    }

    /**
     * Automatically called when the component is initialised
     */
    $onInit() {
        this.highlights = [];
    }

    /**
     * Returns the css classes as string of the (x, y) position of the board
     *
     * @param x
     * @param y
     * @returns {any}
     */
    getClass(x: number, y: number): string {
        if (!this.isPlaying) {
            return 'disc-empty';
        }

        let classes;

        switch (this.matrix[x][y]) {
            case 1:
                classes = 'disc-black';
                break;
            case 2:
                classes = 'disc-white';
                break;
            default:
                classes = 'disc-empty';
        }

        if (this.highlights[this.matrix.length * x + y]) {
            classes += ' disc-suggestion';
        }

        return classes;
    }

    /**
     * Handles the event when the user clicks on the (x, y) position of the board
     *
     * @param x
     * @param y
     * @param id
     */
    click(x: number, y: number, id: number) {
        if (this.isPlaying) {
            if (this.handler.stepControl(this.matrix, x, y, id)) {
                // emit the selection event
                this.onSelection({
                    x: x,
                    y: y
                });
            } else if (this.matrix[x][y] == 0) {
                // show suggestions
                let suggestions = this.handler.getSuggestions(this.matrix, id);
                angular.forEach(suggestions, (suggestionCoords) => {
                    this.highlights[this.matrix.length * suggestionCoords.x + suggestionCoords.y] = true;
                });
                this.$timeout(() => {
                    // hide suggestions after a while
                    angular.forEach(suggestions, (suggestionCoords) => {
                        this.highlights[this.matrix.length * suggestionCoords.x + suggestionCoords.y] = false;
                    });
                }, 500);
            }
        }
    }
}
