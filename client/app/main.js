import angular from 'angular';
import 'node_modules/pub-ux-components/pmcc/0.1.34/pmcc.min.css!css';
import 'pmcc';
import 'angular-ui-router';
import 'angular-css';

import { homeModule } from 'pages/home/home';
import { examplesModule } from 'pages/examples/examples';

export var mainModule = angular.module('app', [
    'pmcc',
    homeModule.name,
    examplesModule.name
]).run();
