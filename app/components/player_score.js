import angular from 'angular';

export default angular.module('othello.components.player_score', [])
    .component('playerScore', {
        templateUrl: 'components/player_score.html',
        bindings: {
            playerId: '<',
            score: '<'
        }
    }).name;
