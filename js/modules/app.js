/**
 * Criação do módulo principal da aplecação e injeção de dependências
 * @author Vinicius Goulart Cardozo
 */
angular.module('app', ['ngRoute','ngResource', 'ngAnimate'])

/**
 * Configuração da lógica de roteamento a partir da url base
 * @author Vinicius Goulart Cardozo
 */
.config(function($routeProvider, $locationProvider) {
    $routeProvider
    .when('/', {
        templateUrl: '/pages/cadastro.html',
    })
    .when('/cadastro', {
        templateUrl: '/pages/cadastro.html',
    })
    .when('/consulta', {
        templateUrl: '/pages/consulta.html',
    })
    .otherwise({templateUrl: '/pages/consulta.html'});

    //$locationProvider.html5Mode(true);

    $locationProvider.hashPrefix("");
})

/**
 * Configuração do comportamento das requisições feitas usando
 * o artefato $resource do Angular
 * @author Vinicius Goulart Cardozo
 */
.factory('RequestFactory', function($resource) {
  
  var server = "http://192.168.15.95/server/servico.php";

  return $resource(`${server}/:id`, { id: '@_id' }, {
    update: {
      method: 'PUT'
    }
  });
})

/**
 * Diretiva que executa uma função após o Angular renderizar
 * todos os componentes do ng-repeat
 * @author Vinicius Goulart Cardozo
 */
.directive('runAfterRendering', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                scope.$evalAsync(attr.runAfterRendering);
            }
        }
    }
});