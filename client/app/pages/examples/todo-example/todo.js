import todoExampleRoute from './todo.route';
import 'angular-ui-router';
import TodoListCtrl from './todo.controller';

export var todoExampleModule = angular.module('todoExample', [
    'ui.router'
])
    .config(['$stateProvider', todoExampleRoute])
    .controller('TodoListCtrl', TodoListCtrl);
