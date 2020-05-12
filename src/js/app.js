var app = angular.module('app', ['ngMap']);
app.controller('map', function($scope) {
  $scope.sometext= "";
  $scope.coulcontour = "#FF0000";
  $scope.polygons= {}
  $scope.polygons[0] = new Object()
  $scope.polygons[0].chemin = "[[25.774252, -85.190262],[18.466465, -66.118292],[32.321384, -64.75737],[25.774252, -80.190262]]";
  $scope.polygons[0].couleurinterieur = "#FF0000";
  $scope.polygons[0].opacitecontour ="0.8";
  $scope.polygons[0].opaciteinterieur ="0.35";
  $scope.polygons[1] = new Object();
  $scope.polygons[1].chemin = "[[25.774252, -100.190262],[18.466465, -66.118292],[32.321384, -64.75737],[25.774252, -80.190262]]";
  $scope.polygons[1].couleurinterieur = "#FF0000";
  $scope.polygons[1].opacitecontour ="0.8";
  $scope.polygons[1].opaciteinterieur ="0.35";
});
app.controller('selector', function($scope) {
    $scope.nom_polygone=["Select 1 ","Select 2","Select 3"]
});