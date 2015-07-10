angular.module "projectname"
  .controller "CupPigCtrl", ($scope) ->
    $scope.hug = () ->
      BootstrapDialog.alert({
        title: 'Yeah Do It',
        message: 'Danke, das Schwein hat DIch auch lieb.',
        type: BootstrapDialog.TYPE_SUCCESS
      })
    return