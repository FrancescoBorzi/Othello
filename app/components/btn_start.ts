import * as angular from 'angular';

export default angular.module('othello.components.btn_start', [])
    .component('btnStart', {
        templateUrl: 'components/btn_start.html',
        bindings: {
            isPlaying: '<'
        }
    }).name;
