var carousel = document.querySelector('.carousel');
var cellCount = 9;
var selectedIndex = 0;

var cells = document.querySelectorAll('.carousel__cell');

function rotateCarousel() {
  var angle = selectedIndex / cellCount * -360;
  carousel.style.transform = 'translateZ(-412px) rotateY(' + angle + 'deg)';
  updateVisibility();
}

function getCurrentRotationFixed(elid) {
  var st = window.getComputedStyle(elid, null);
  var tr = st.getPropertyValue("-webkit-transform") ||
    st.getPropertyValue("-moz-transform") ||
    st.getPropertyValue("-ms-transform") ||
    st.getPropertyValue("-o-transform") ||
    st.getPropertyValue("transform") ||
    "fail...";

  if (tr !== "none") {
    var values = tr.split('(')[1].split(')')[0].split(',');
    var a = values[0];
    var b = values[1];
    var radians = Math.atan2(b, a);
    if (radians < 0) {
      radians += (2 * Math.PI);
    }
    var angle = Math.round(radians * (180 / Math.PI));
  } else {
    var angle = 0;
  }
}

function updateVisibility() {
  // Entferne die 'front'-Klasse von allen Zellen
  for (var i = 0; i < cells.length; i++) {
    cells[i].classList.remove('front');
  }

  // Füge die 'front'-Klasse dem vordersten Fenster hinzu
  var frontCellIndex = (selectedIndex + cellCount) % cellCount;
  var lastCellIndex = (selectedIndex + cellCount - 1) % cellCount;

  for (var i = 0; i < cells.length; i++) {
    if (i != lastCellIndex) {
      cells[i].classList.remove('block');
    }
  }

  cells[frontCellIndex].classList.add('front');
  cells[frontCellIndex].classList.add('block');
}

function plusSlides() {
  selectedIndex++;
  rotateCarousel();
  for (var i = 0; i < cells.length; i++) {
    getCurrentRotationFixed(cells[i]);
  }
}

function calculateTranslateZ() {
  var sceneWidth = document.querySelector('.scene').offsetWidth;
  var angle = 18; // Winkel in Grad
  var radians = angle * (Math.PI / 180); // Umwandlung in Radiant
  var translateZ = sceneWidth / 2 / Math.tan(radians);
  return translateZ;
}

function updateCarousel() {
  var translateZ = calculateTranslateZ();
  carousel.style.transform = 'translateZ(' + -translateZ + 'px) rotateY(' + selectedIndex / cellCount * -360 + 'deg)';

  // Aktualisiere die Zellenpositionen
  for (var i = 0; i < cells.length; i++) {
    cells[i].style.transform = 'rotateY(' + i * (360 / cellCount) + 'deg) translateZ(' + translateZ + 'px)';
  }
}

updateCarousel();
window.addEventListener('resize', updateCarousel);
 
function autoChangeSide() {
  plusSlides();
  updateCarousel();
}

setInterval(autoChangeSide, 6000);

updateVisibility();