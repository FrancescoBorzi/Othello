import {Component, Input} from "angular-ts-decorators";

@Component({
    selector: 'btnStart',
    templateUrl: 'btn-start.component.html'
})
export class BtnStartComponent {
    @Input() isPlaying;

    private $ctrl;

    constructor() {
        this.$ctrl = this; // not really needed, just a hint for the IDE
    }
}
