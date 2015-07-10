angular.module 'projectname'
  .directive 'myDownload', ($compile) ->
    restrict: 'E'
    scope: getUrlData: '&getData'
    link: (scope, elm, attrs) ->
      url = URL.createObjectURL(scope.getUrlData())
      elm.append $compile('<a class="btn" download="backup.json"' + 'href="' + url + '">' + 'Download' + '</a>')(scope)
      return