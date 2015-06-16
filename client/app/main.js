import 'angular-ui-router';
import 'angular-css';

import { homeModule } from 'pages/home/home';
import { examplesModule } from 'pages/examples/examples';

export var mainModule = angular.module('app', [
    'pmcc',
    homeModule.name,
    examplesModule.name
])
    .config(['$locationProvider', ($locationProvider) => $locationProvider.html5Mode(true)])
    .run();
