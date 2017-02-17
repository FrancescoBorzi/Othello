(function (angular) {

    angular.module('othelloApp')
        .component('othelloBoard', {
            templateUrl: 'othello_board.html',
            controller: OthelloBoardController,
            bindings: {
                matrix: '<',
                isPlaying: '<'
            }
        });

    function OthelloBoardController() {
        var ctrl = this;

        ctrl.getClass = function (x, y) {
            if (!ctrl.isPlaying) {
                return 'disc-' + 'empty';
            }

            switch (ctrl.matrix[x][y]) {
                case 1:
                    return 'disc-' + 'black';
                case 2:
                    return 'disc-' + 'white';
                default:
                    return 'disc-' + 'empty';
            };
        }
    }

})(window.angular);
