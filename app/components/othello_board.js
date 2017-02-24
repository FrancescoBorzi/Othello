(function (angular) {

    angular.module('othelloApp')
        .component('othelloBoard', {
            templateUrl: 'components/othello_board.html',
            controller: OthelloBoardController,
            bindings: {
                matrix: '<',
                isPlaying: '<',
                onSelection: '&'
            }
        });

    function OthelloBoardController(OthelloHandlerService, $timeout) {
        var ctrl = this;

        ctrl.$onInit = () => {
            ctrl.highlights = [];
        }

        ctrl.getClass = (x, y) => {
            if (!ctrl.isPlaying) {
                return 'disc-empty';
            }

            var classes;

            switch (ctrl.matrix[x][y]) {
                case 1:
                    classes = 'disc-black';
                    break;
                case 2:
                    classes = 'disc-white';
                    break;
                default:
                    classes = 'disc-empty';
            };

             if (ctrl.highlights[ctrl.matrix.length * x + y]) {
                classes += ' disc-suggestion';
             }

             return classes;
        }

        ctrl.click = (x, y, player) => {
            if (ctrl.isPlaying) {
                if (OthelloHandlerService.stepControl(ctrl.matrix, x, y, player)) {
                    // emit the selection event
                    ctrl.onSelection({"x": x, "y": y});
                } else if (ctrl.matrix[x][y] == 0) {
                    // show suggestions
                    var suggestions = OthelloHandlerService.getSuggestions(ctrl.matrix, player);
                    angular.forEach(suggestions, (suggestionCoords) => {
                        ctrl.highlights[ctrl.matrix.length * suggestionCoords.x + suggestionCoords.y] = true;
                    });
                    $timeout(() => {
                        // hide suggestions after a while
                        angular.forEach(suggestions, (suggestionCoords) => {
                            ctrl.highlights[ctrl.matrix.length * suggestionCoords.x + suggestionCoords.y] = false;
                        });
                    }, 500);
                }
            }
        }
    }

})(window.angular);
