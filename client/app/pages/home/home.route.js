import 'angular';

export default function homeRoute($stateProvider) {
    return $stateProvider.state('home', {
        url: '/',
        template: '<div>Example</div>'
    });
}
