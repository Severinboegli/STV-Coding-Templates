var carousel = document.querySelector('.carousel');
var cellCount = 9;
var selectedIndex = 0;

var cells = document.querySelectorAll('.carousel__cell');

function rotateCarousel() {
  var angle = selectedIndex / cellCount * -360;
  carousel.style.transform = 'translateZ(-288px) rotateY(' + angle + 'deg)';
}

var prevButton = document.querySelector('.previous-button');
prevButton.addEventListener( 'click', function() {
  selectedIndex--;
  rotateCarousel();
  cells.forEach(getCurrentRotationFixed);
});

var nextButton = document.querySelector('.next-button');
nextButton.addEventListener( 'click', function() {
  selectedIndex++;
  rotateCarousel();
  cells.forEach(getCurrentRotationFixed);
});

function getCurrentRotationFixed( elid ) {
    var el = document.getElementById(elid);
    var st = window.getComputedStyle(el, null);
    var tr = st.getPropertyValue("-webkit-transform") ||
         st.getPropertyValue("-moz-transform") ||
         st.getPropertyValue("-ms-transform") ||
         st.getPropertyValue("-o-transform") ||
         st.getPropertyValue("transform") ||
         "fail...";
  
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

