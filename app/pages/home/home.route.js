import template from './home.html!text';
import './home.css!';

export default function homeRoute($stateProvider) {
    return $stateProvider.state('home', {
        url: '/',
        template: template
    });
}

homeRoute.$inject = [ '$stateProvider' ];
