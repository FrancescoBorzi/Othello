import {Component, Input} from 'angular-ts-decorators';

@Component({
    selector: 'playerScore',
    templateUrl: 'components/player_score.html'
})
export class PlayerScoreComponent {
    @Input() playerId;
    @Input() score;

    private $ctrl;

    constructor() {
        this.$ctrl = this; // not really needed, just a hint for the IDE
    }
}
