import 'angular';
import 'pmcc';

import { homeModule } from 'pages/home/home';

export var mainModule = angular.module('app', [
    homeModule.name
]).run();
