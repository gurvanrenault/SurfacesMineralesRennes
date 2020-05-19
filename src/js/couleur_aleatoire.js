var myrng = new Math.seedrandom('TheouPasLàMaisTheou42');
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(myrng() * 16)];
  }
  return color;
}
function setColorParent(obj){
  console.log(obj)
}
