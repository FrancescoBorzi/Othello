(function (angular) {

    angular.module('othelloApp')
        .component('btnStart', {
            templateUrl: 'components/btn_start.html',
            bindings: {
                isPlaying: '<'
            }
        });

})(window.angular);
