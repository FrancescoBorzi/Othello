import {Component, Input} from 'angular-ts-decorators';

@Component({
    selector: 'playerScore',
    templateUrl: 'player-score.component.html'
})
export class PlayerScoreComponent {
    @Input() playerId;
    @Input() score;

    private $ctrl;

    constructor() {
        this.$ctrl = this; // not really needed, just a hint for the IDE
    }
}
