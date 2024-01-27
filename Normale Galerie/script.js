var slideIndex = 1;
    var lastTimeout = undefined;
    showSlides(slideIndex);
    
    function plusSlides(n) {
      showSlides(slideIndex += n);
    }
    
    function currentSlide(n) {
      showSlides(slideIndex = n);
    }
    
    function showSlides(n) {
      if(n == undefined)
      {
          n = slideIndex+1;
      }
      var i;
      var slides = document.getElementsByClassName("mySlides");
      var dots = document.getElementsByClassName("dot");
      if (n > slides.length) {slideIndex = 1}
      if (n < 1) {slideIndex = slides.length}
    
      for (i = 0; i < dots.length; i++) {
          dots[i].className = dots[i].className.replace(" active", "");
      }
      for (i = 0; i < slides.length; i++) {
          slides[i].style.display = "none";
      }
      slides[slideIndex-1].style.display = "block";
      dots[slideIndex-1].className += " active";
      if(lastTimeout)
        clearTimeout(lastTimeout);
      lastTimeout = setTimeout(function(){plusSlides(1) }, 6000);
    }