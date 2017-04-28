import { NgModule } from 'angular-ts-decorators';
import { OthelloAIService } from './services/othello_AI';
import { OthelloHandlerService } from './services/othello_handler';
import { BtnStartComponent } from './components/btn_start';
import { PlayerScoreComponent } from './components/player_score';
import { OthelloBoard } from './components/othello_board';
import { Othello } from './components/othello';

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
