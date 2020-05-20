
var app = angular.module('app', ['ngMap','ngRoute']);
// On configure l'application  en définissant les routes 
app.config(function($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: './html/global.html',
            controller: 'map'
        })
        .when('/', {
            templateUrl: './html/global.html',
            controller: 'map'
        })
		.when('/surface/:id', {
			templateUrl: './html/global.html',
			controller: 'map'
        });
    });
// On crée un service pour que l'on puisse partagé des variables entre contrôleur
app.service("sampleService", function () {
    this.liste_color = {}
});		
// Controleur de la carte affichant toutes les surfaces 
app.controller('map', function($scope,$routeParams,$http, sampleService) {
    $scope.erreur = {};
    $scope.erreur.message ="";
    $scope.erreur.display ="none";
    var id = $routeParams.id ;
   
    // Requête ajax récupérant les polygones représentants les surfaces minérales
    $http.get("https://data.rennesmetropole.fr/api/records/1.0/search/?dataset=surfaces-minerales-du-jardin-du-thabor")
        // En cas de succès (code retour = 200)
        .then(function(response){
            var data = response.data;
            // On récupère le nombre de surfaces
            var nb_surfaces = data.parameters.rows;

            // On crée un dictionnairequi va contenir toutes les surfaces
            $scope.surfaces = {};
            $scope.nom_polygone={}
            // On crée le dictionnarie contenant les polygones et leurs paramètres
            // Si aucun identifiant n'est précisé 
            if (typeof id == 'undefined') {
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
                    // On récupère la couleur attribué à la surface  
                    var couleur= sampleService.liste_color[i];
                    $scope.surfaces[i].couleurinterieur = couleur;
                
            
                }
            }
            // Vérification de l'identifiant 
            else if (id< nb_surfaces && id >=0){
                
                $scope.surfaces[0] = {};
                var chemin = data.records[id].fields.geo_shape.coordinates[0];
                    $scope.surfaces[0].chemin = [];
                    for(var j=0; j<chemin.length; j++){
                        $scope.surfaces[0].chemin.push([chemin[j][1], chemin[j][0]])
                    }
                    $scope.surfaces[0].centre = data.records[id].geometry.coordinates;
                    // On récupère la couleur attribué à la surface  
                    var couleur= sampleService.liste_color[id];
                    $scope.surfaces[0].couleurinterieur = couleur;
                   
            }
            else{
              // Erreur 
              $scope.erreur.message = "Surface Introuvable. Veuillez entrer un identifiant correct"
              $scope.erreur.display = "block"
            }
            
        });

});

// Controleur pour les sélecteurs de la carte
app.controller('selector', function($scope,$http,sampleService) {
    $http.get("https://data.rennesmetropole.fr/api/records/1.0/search/?dataset=surfaces-minerales-du-jardin-du-thabor")
    // En cas de succès (code retour = 200)
    .then(function(response){
        var data = response.data;
        // On récupère le nombre de surfaces
        var nb_surfaces = data.parameters.rows;
       
        var colors = sampleService.liste_color;
        // On définit la taille des éléments
        $scope.size = 98/nb_surfaces
        $scope.nom_polygone={}
        for(var i=0; i<nb_surfaces; i++){
            $scope.nom_polygone[i]={}
            // On génère aléatoirement une couleur 
            couleur = getRandomColor()
            // On initialise la variable partagée entre les controlleurs
            sampleService.liste_color[i]=couleur;

            $scope.nom_polygone[i].couleur = couleur
            $scope.nom_polygone[i].nom = "Surface "+i;
            $scope.nom_polygone[i].href = "#!/surface/"+i;
        }
      
    });


});
