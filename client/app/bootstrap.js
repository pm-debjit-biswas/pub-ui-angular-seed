import 'angular';
import { mainModule } from './main';

/*eslint "angular/ng_document_service":0 */

angular.element(document).ready(function() {
    angular.bootstrap(document.body, [
      mainModule.name
    ], {
        strictDi: true
    });
});
