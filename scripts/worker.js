function makeMoveables(moveID, divID) {
    var dragItem = document.getElementById(moveID);
    var container = document.getElementById(divID);
  
    var active = false;
    var currentX;
    var currentY;
    var initialX;
    var initialY;
    var xOffset = 0;
    var yOffset = 0;
  
    container.addEventListener("touchstart", dragStart, false);
    container.addEventListener("touchend", dragEnd, false);
    container.addEventListener("touchmove", drag, false);
  
    container.addEventListener("mousedown", dragStart, false);
    container.addEventListener("mouseup", dragEnd, false);
    container.addEventListener("mousemove", drag, false);
  
    function dragStart(e) {
      if (e.type === "touchstart") {
        initialX = e.touches[0].clientX - xOffset;
        initialY = e.touches[0].clientY - yOffset;
      } else {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
      }
  
      if (e.target === dragItem) {
        active = true;
      }
    }
  
    function dragEnd(e) {
      initialX = currentX;
      initialY = currentY;
      active = false;
    }
  
    function drag(e) {
      if (active) {
        e.preventDefault();
        if (e.type === "touchmove") {
          currentX = e.touches[0].clientX - initialX;
          currentY = e.touches[0].clientY - initialY;
        } else {
          currentX = e.clientX - initialX;
          currentY = e.clientY - initialY;
        }
  
        xOffset = currentX;
        yOffset = currentY;
  
        setTranslate(currentX, currentY, dragItem);
      }
    }
  
    function setTranslate(xPos, yPos, el) {
      el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
    }
  }
  
  /* makes all elements with given class name movable if they have unique ids*/
  function findMoveables(className, divID) {
    let moveIDcollection = document.getElementsByClassName(className);
    let moveIDarray = Array.from(moveIDcollection);
    moveIDarray.forEach((element) => {
      makeMoveables(element.id, divID);
    });
  }

function makeTile(color,value){
    let newTile = document.createElement('p')
    newTile.innerHTML = value
    newTile.setAttribute('class',`tile ${color} dragMe`)
    newTile.setAttribute('id',`${color}-${tileCount}`)
    tileCount+=1
    document.getElementById('whiteboard').appendChild(newTile)
    findMoveables('dragMe','whiteboard')
}

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
  //tileMenuBuild();
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
var tileCount = 0

fetch("./content/tiles.json")
  .then((tilesJSON) => {
    return tilesJSON.json();
  })
  .then((tilesContent) => {
    tiles = tilesContent.tiles;
    books = tilesContent.books;
    initialMenuBuild();
  });

document.getElementById("level").addEventListener("change", lessonMenuBuild);
document.getElementById("lesson").addEventListener("change", tileMenuBuild);
