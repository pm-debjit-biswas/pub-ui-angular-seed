export default function examplesRoute($stateProvider) {
    return $stateProvider.state('examples', {
        url: '/examples',
        abstract: true
    });
}
