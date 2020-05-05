var app = angular.module('app', ['ngMap']);
app.controller('map', function($scope) {
  $scope.sometext= "";
  $scope.coulcontour = "#FF0000";
  $scope.chemins = "[[25.774252, -85.190262],[18.466465, -66.118292],[32.321384, -64.75737],[25.774252, -80.190262]]";
  
  $scope.couleurinterieur = "#FF0000";
  $scope.opacitecontour ="0.8";
  $scope.opaciteinterieur ="0.35";
});