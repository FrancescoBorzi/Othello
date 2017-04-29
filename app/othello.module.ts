import { NgModule } from 'angular-ts-decorators';
import { OthelloAIService } from './othello-ai.service';
import { OthelloHandlerService } from './othello-handler.service';
import { BtnStartComponent } from './btn-start.component';
import { PlayerScoreComponent } from './player-score.component';
import { OthelloBoard } from './othello-board.component';
import { Othello } from './othello.component';

@NgModule({
    id: 'OthelloModule',
    declarations: [
        BtnStartComponent,
        PlayerScoreComponent,
        OthelloBoard,
        Othello
    ],
    providers: [
        OthelloAIService,
        OthelloHandlerService
    ]
})
export class OthelloModule {}
