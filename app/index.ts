import * as angular from 'angular';
import OthelloHandlerService from './services/othello_handler';
import OthelloAIService from './services/othello_AI';
import BtnStart from './components/btn_start';
import PlayerScore from './components/player_score';
import OthelloBoard from './components/othello_board';
import Othello from './components/othello';

export default angular.module('othelloApp', [
    OthelloHandlerService,
    OthelloAIService,
    BtnStart,
    PlayerScore,
    OthelloBoard,
    Othello
]);
