(function (angular) {

    angular.module('othelloApp')
        .component('playerScore', {
            templateUrl: 'components/player_score.html',
            bindings: {
                playerId: '<',
                score: '<'
            }
        });

})(window.angular);
