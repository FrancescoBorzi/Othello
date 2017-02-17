(function (angular) {

    angular.module('othelloApp')
        .component('btnStart', {
            templateUrl: 'btn_start.html',
            bindings: {
                isPlaying: '<'
            }
        });

})(window.angular);
