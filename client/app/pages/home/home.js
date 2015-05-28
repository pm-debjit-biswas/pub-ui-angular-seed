import homeRoute from './home.route';
import 'angular-ui-router';

export var homeModule = angular.module('home', [
    'ui.router'
])
.config(['$stateProvider', homeRoute])
.controller();
