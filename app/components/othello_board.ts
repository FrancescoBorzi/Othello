import * as angular from "angular";
import {Component, Input, Output} from "angular-ts-decorators";
import {OthelloHandlerService} from "../services/othello_handler";

@Component({
    selector: 'othelloBoard',
    templateUrl: 'components/othello_board.html'
})
export class OthelloBoard {
    @Output() onSelection;
    @Input() isPlaying;
    @Input() matrix;

    private $ctrl;
    private highlights;
    private handler;

    /*@ngInject*/
    constructor(OthelloHandlerService: OthelloHandlerService, private $timeout) {
        this.$ctrl = this;  // not really needed, just a hint for the IDE
        this.handler = OthelloHandlerService;
    }

    $onInit = () => {
        this.highlights = [];
    };

    getClass = (x, y) => {
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
    };

    click = (x, y, player) => {
        if (this.isPlaying) {
            if (this.handler.stepControl(this.matrix, x, y, player)) {
                // emit the selection event
                this.onSelection({"x": x, "y": y});
            } else if (this.matrix[x][y] == 0) {
                // show suggestions
                let suggestions = this.handler.getSuggestions(this.matrix, player);
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
