(function (angular) {

    angular.module('othelloApp')
        .component('othelloBoard', {
            templateUrl: 'othello_board.html',
            controller: OthelloBoardController,
            bindings: {
                matrix: '<',
                isPlaying: '<',
                onSelection: '&'
            }
        });

    function OthelloBoardController() {
        var ctrl = this;

        ctrl.getClass = (x, y) => {
            if (!ctrl.isPlaying) {
                return 'disc-empty';
            }

            switch (ctrl.matrix[x][y]) {
                case 1:
                    return 'disc-black';
                case 2:
                    return 'disc-white';
                default:
                    return 'disc-empty';
            };
        }

        ctrl.click = (x, y, player) => {
            if (ctrl.isPlaying) {
                ctrl.onSelection({"x": x, "y": y});
            }
        }
    }

})(window.angular);
