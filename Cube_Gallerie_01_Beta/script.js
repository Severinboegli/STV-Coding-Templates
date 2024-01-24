var carousel = document.querySelector('.carousel');
var cellCount = 9;
var selectedIndex = 0;

var cells = document.querySelectorAll('.carousel__cell');

function rotateCarousel() {
  var angle = selectedIndex / cellCount * -360;
  carousel.style.transform = 'translateZ(-412px) rotateY(' + angle + 'deg)';
  updateVisibility();
}

var prevButton = document.querySelector('.previous-button');
prevButton.addEventListener( 'click', function() {
  selectedIndex--;
  rotateCarousel();
  updateCarousel();
  cells.forEach(getCurrentRotationFixed);
});

var nextButton = document.querySelector('.next-button');
nextButton.addEventListener( 'click', function() {
  selectedIndex++;
  rotateCarousel();
  updateCarousel();
  cells.forEach(getCurrentRotationFixed);
});

function getCurrentRotationFixed( elid ) {
    var st = window.getComputedStyle(elid, null);
    var tr = st.getPropertyValue("-webkit-transform") ||
         st.getPropertyValue("-moz-transform") ||
         st.getPropertyValue("-ms-transform") ||
         st.getPropertyValue("-o-transform") ||
         st.getPropertyValue("transform") ||
         "fail...";
         
    console.log(tr);
  
    if( tr !== "none") {
      console.log('Matrix: ' + tr);
  
      var values = tr.split('(')[1];
        values = values.split(')')[0];
        values = values.split(',');
      var a = values[0];
      var b = values[1];
      var c = values[2];
      var d = values[3];
  
      var scale = Math.sqrt(a*a + b*b);
  
      // First option, don't check for negative result
      // Second, check for the negative result
      /** /
      var radians = Math.atan2(b, a);
      var angle = Math.round( radians * (180/Math.PI));
      /*/
      var radians = Math.atan2(b, a);
      if ( radians < 0 ) {
        radians += (2 * Math.PI);
      }
      var angle = Math.round( radians * (180/Math.PI));
      /**/
      
    } else {
      var angle = 0;
    }
  
    // works!
    console.log('Rotate: ' + angle + 'deg');
  }

  function updateVisibility() {
    console.log("updateVisibility");
    // Entferne die 'front'-Klasse von allen Zellen
    cells.forEach(cell => cell.classList.remove('front'));
  
    // Füge die 'front'-Klasse dem vordersten Fenster hinzu
    var frontCellIndex = (selectedIndex + cellCount) % cellCount;
    cells[frontCellIndex].classList.add('front');
  }

  function plusSlides() {
    selectedIndex++;
    rotateCarousel();
    cells.forEach(getCurrentRotationFixed);
  }

  // Berechung der translateZ-Eigenschaft für die .carousel__cell-Elemente
  // Dies es möglich, dass die Galerie dynamisch werden kann.
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
    var cells = document.querySelectorAll('.carousel__cell');
    cells.forEach(function(cell, index) {
      cell.style.transform = 'rotateY(' + index * (360 / cellCount) + 'deg) translateZ(' + translateZ + 'px)';
    });
  }
  
  // Initialer Aufruf und Event-Listener für Größenänderungen
  updateCarousel();
  window.addEventListener('resize', updateCarousel);
  
  

  // Alle 6 Sekunden das nächste Fenster anzeigen
  //setInterval(plusSlides, 6000);

  // Füge die 'front'-Klasse dem initial vordersten Fenster hinzu
  updateVisibility();
  

