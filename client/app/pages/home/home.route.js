
import template from './home.html!text';

export default function homeRoute($stateProvider) {
    return $stateProvider.state('home', {
        url: '/',
        template: template,
        css: 'home.css'
    });
}
