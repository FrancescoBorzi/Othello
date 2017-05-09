import {Component, Input} from 'angular-ts-decorators';

@Component({
    selector: 'playerScore',
    templateUrl: 'player-score.component.html'
})
export class PlayerScoreComponent {
    @Input() playerId: number;
    @Input() score: number;

    private $ctrl: PlayerScoreComponent;

    constructor() {
        this.$ctrl = this; // not really needed, just a hint for the IDE
    }
}
