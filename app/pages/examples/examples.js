import 'angular-ui-router';
import examplesRoute from './examples.route';

import { todoExampleModule } from './todo-example/todo';

export var examplesModule = angular.module('examples', [
    'ui.router',
    todoExampleModule.name
])
.config(['$stateProvider', examplesRoute])
.controller();
