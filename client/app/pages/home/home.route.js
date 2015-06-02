
// TODO: Use this once text plugin issue is resolved
// import template from './home.html!text';

export default function homeRoute($stateProvider) {
    return $stateProvider.state('home', {
        url: '/',
        templateUrl: 'pages/home/home.html'
    });
}
