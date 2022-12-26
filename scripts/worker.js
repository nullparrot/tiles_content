function tileMenuBuild() {
  let lessonMenu = document.getElementById("lesson");
  lesson = parseInt(lessonMenu.value);
  let currentTiles = tiles.filter(function (tile) {
    return tile.level < level || (tile.level == level && tile.lesson <= lesson);
  });
  console.table(currentTiles);
  let tileMenu = document.getElementById('tile-menu')
  tileMenu.innerHTML = ''
  currentTiles.forEach((element) =>{
    let newButton = document.createElement('button')
    newButton.innerHTML = element.value
    newButton.setAttribute('class',`tileButton ${element.color} ${element.type}`)
    tileMenu.appendChild(newButton)
  })
}

function lessonMenuBuild() {
  let levelMenu = document.getElementById("level");
  let lessonMenu = document.getElementById("lesson");
  lessonMenu.innerHTML = "";
  level = parseInt(levelMenu.value);
  let lessonCount = books[level].lessons;
  for (let step = 1; step < lessonCount + 1; step++) {
    let newOption = document.createElement("option");
    newOption.innerHTML = `Lesson ${step}`;
    newOption.setAttribute("value", step);
    lessonMenu.appendChild(newOption);
  }
  lesson = 1;
  tileMenuBuild();
}

function initialMenuBuild() {
  let levelMenu = document.getElementById("level");
  Object.keys(books).forEach((element) => {
    let newOption = document.createElement("option");
    newOption.innerHTML = `Level ${element}`;
    newOption.setAttribute("value", element);
    levelMenu.appendChild(newOption);
  });
  lessonMenuBuild();
}

var level = 1;
var lesson = 1;
var tiles = {};
var books = {};

fetch("./content/tiles.json")
  .then((tilesJSON) => {
    return tilesJSON.json();
  })
  .then((tilesContent) => {
    tiles = tilesContent.tiles;
    books = tilesContent.books;
    //console.table(books)
    console.table(tiles);
    initialMenuBuild();
  });

document.getElementById("level").addEventListener("change", lessonMenuBuild);
document.getElementById("lesson").addEventListener("change", tileMenuBuild);
