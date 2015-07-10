angular.module "projectname", ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ui.router', 'ui.bootstrap', 'ui-rangeSlider', 'angularUtils.directives.dirPagination']
  .config ($stateProvider, $urlRouterProvider, paginationTemplateProvider) ->
    $stateProvider
      .state "main",
        templateUrl: "main/main.html"
        controller: "MainCtrl"
      .state "main.cupPig",
        url: '/'
        views:
          'piglet':
            templateUrl: "main/cup-pig/cup-pig.html"
            controller: "CupPigCtrl"
            controllerAs: "cupPigController"
    paginationTemplateProvider.setPath('dirPagination.tpl.html')
    $urlRouterProvider.otherwise '/'

