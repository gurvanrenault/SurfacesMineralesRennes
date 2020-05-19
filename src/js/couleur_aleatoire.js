/** Initialisation du générateur aléatoire  : la graine va permette une stabilité sur la génération des couleurs*/
var myrng = new Math.seedrandom('U2tGT1ZrOUpSRVZUVGxWRVJWTlFUMVZTVlU0eU1DOHlNQT09');
/** Cette fonction  permet de sélectionner  aléatoirement une couleur 
 * @return  code couleur en héxadécimal
*/
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(myrng() * 16)];
    }
    return color;
  }