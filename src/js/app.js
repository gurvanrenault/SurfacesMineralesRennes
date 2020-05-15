var app = angular.module('app', ['ngMap','ngRoute']);
app.config(function($routeProvider) {
	$routeProvider
		.when('/surface/:id', {
			templateUrl: './html/surface.html',
			controller: 'view'
        });
    });
		
// Controleur de la carte
app.controller('map', function($scope, $http) {

    // Requête ajax récupérant les polygones représentants les surfaces minérales
    $http.get("https://data.rennesmetropole.fr/api/records/1.0/search/?dataset=surfaces-minerales-du-jardin-du-thabor")
        // En cas de succès (code retour = 200)
        .then(function(response){
            var data = response.data;
            // On récupère le nombre de surfaces
            var nb_surfaces = data.parameters.rows;

            // On crée un dictionnairequi va contenir toutes les surfaces
            $scope.surfaces = {};

            // On crée le dictionnarie contenant les polygones et leurs paramètres

            for(var i=0; i<nb_surfaces; i++){
                // Création de la nouvelle surface
                $scope.surfaces[i] = {};

                // Création du chemin
                var chemin = data.records[i].fields.geo_shape.coordinates[0];
                $scope.surfaces[i].chemin = [];
                for(var j=0; j<chemin.length; j++){
                    $scope.surfaces[i].chemin.push([chemin[j][1], chemin[j][0]])
                }
                $scope.surfaces[i].centre = data.records[i].geometry.coordinates;
               
                $scope.surfaces[i].couleurinterieur = "#FF0000";
                $scope.surfaces[i].opacitecontour = "0.8";
                $scope.surfaces[i].opaciteinterieur = "0.35";
            }
            console.log($scope.surfaces);
        });

    // $scope.sometext= "";
    // $scope.coulcontour = "#FF0000";
    // $scope.polygons= {}
    // $scope.polygons[0] = new Object()
    // $scope.polygons[0].chemin = "[[25.774252, -85.190262],[18.466465, -66.118292],[32.321384, -64.75737],[25.774252, -80.190262]]";
    // $scope.polygons[0].couleurinterieur = "#FF0000";
    // $scope.polygons[0].opacitecontour ="0.8";
    // $scope.polygons[0].opaciteinterieur ="0.35";
    // $scope.polygons[1] = new Object();
    // $scope.polygons[1].chemin = "[[25.774252, -100.190262],[18.466465, -66.118292],[32.321384, -64.75737],[25.774252, -80.190262]]";
    // $scope.polygons[1].couleurinterieur = "#FF0000";
    // $scope.polygons[1].opacitecontour ="0.8";
    // $scope.polygons[1].opaciteinterieur ="0.35";
});

// Controleur pour les sélecteurs de la carte
app.controller('selector', function($scope,$http) {
    $http.get("https://data.rennesmetropole.fr/api/records/1.0/search/?dataset=surfaces-minerales-du-jardin-du-thabor")
    // En cas de succès (code retour = 200)
    .then(function(response){
        var data = response.data;
        // On récupère le nombre de surfaces
        var nb_surfaces = data.parameters.rows;
        
        $scope.nom_polygone={}
        for(var i=0; i<nb_surfaces; i++){
           $scope.nom_polygone[i]={}
           $scope.nom_polygone[i].nom = "Surface "+i;
           $scope.nom_polygone[i].href = "view.html#!/surface/"+i;
        }
        console.log($scope.nom_polygone);
    });


});
app.controller('view', function($scope, $http) {

});

