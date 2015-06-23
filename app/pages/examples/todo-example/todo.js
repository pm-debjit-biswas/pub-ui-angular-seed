import todoExampleRoute from './todo.route';
import TodoListCtrl from './todo.controller';

export var todoExampleModule = angular.module('todoExample', [
    'ui.router'
])
.config(todoExampleRoute)
.controller('TodoListCtrl', TodoListCtrl);
