export default function todoExampleRoute($stateProvider) {
    return $stateProvider.state('todoExample', {
        url: '/examples/todo',
        templateUrl: 'pages/examples/todo-example/todo.html',
        controller: 'TodoListCtrl',
        controllerAs: 'todoList'
    });
}
