import * as angular from 'angular';
import { NgModule } from 'angular-ts-decorators';
import { OthelloModule } from './othello.module';

angular.element(document).ready(() => {
    angular.bootstrap(document, [(<NgModule>OthelloModule).module.name], {strictDi: true});
});
