import template from './todo.html!text';

export default function todoExampleRoute($stateProvider) {
    return $stateProvider.state('todoExample', {
        url: '/examples/todo',
        template: template,
        controller: 'TodoListCtrl',
        controllerAs: 'todoList'
    });
}

todoExampleRoute.$inject = [ '$stateProvider' ];
