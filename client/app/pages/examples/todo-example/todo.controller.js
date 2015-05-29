export default class TodoListCtrl {
    constructor() {
        this.todos = [
            {text: 'learn angular', done: true},
            {text: 'build an angular app', done: false}];
    }

    addTodo() {
        var todoList = this;
        todoList.todos.push({text: todoList.todoText, done: false});
        todoList.todoText = '';
    }

    remaining() {
        var todoList = this;
        var count = 0;
        angular.forEach(todoList.todos, function (todo) {
            count += todo.done ? 0 : 1;
        });
        return count;
    }

    archive() {
        var todoList = this;
        var oldTodos = todoList.todos;
        todoList.todos = [];
        angular.forEach(oldTodos, function (todo) {
            if (!todo.done) {
                todoList.todos.push(todo);
            }
        });
    }
}
