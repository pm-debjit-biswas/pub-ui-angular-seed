import { homeModule } from 'pages/home/home';
import { examplesModule } from 'pages/examples/examples';
import 'assets/css/app.css!';

export var mainModule = angular.module('app', [
    'pmcc',
    homeModule.name,
    examplesModule.name
])
.config(['$urlRouterProvider', $urlRouterProvider => $urlRouterProvider.otherwise('/')])
.run();
    /* Required for html5mode
    .config(['$locationProvider', $locationProvider => $locationProvider.html5Mode(true).hashPrefix('!')])
    */
