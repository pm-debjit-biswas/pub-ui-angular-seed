import homeRoute from './home.route';

export var homeModule = angular.module('home', [
    'ui.router'
])
.config(homeRoute)
.controller();
