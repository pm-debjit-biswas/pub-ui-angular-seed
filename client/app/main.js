import angular from 'angular';
import 'pmcc';

import { homeModule } from 'pages/home/home';
import { examplesModule } from 'pages/examples/examples';

export var mainModule = angular.module('app', [
    'pmcc',
    homeModule.name,
    examplesModule.name
]).run();
