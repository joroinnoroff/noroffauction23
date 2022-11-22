$(document).ready(function() {
  $('#autoWidth').lightSlider({
      autoWidth:true,
      loop:true,
      onSliderLoad: function() {
          $('#autoWidth').removeClass('cS-hidden');
      } 
  });  
});

const hamburger = document.querySelector('.hamburger');

hamburger.addEventListener("click", function () {
this.classList.toggle('is-active');
});
import 'boxicons'

document.addEventListener("DOMContentLoaded", function(event) {
      
      
  const cartButtons = document.querySelectorAll('.cart-button');

   cartButtons.forEach(button => {

            button.addEventListener('click',cartClick);

   });

   function cartClick(){
    let button =this;
    button.classList.add('clicked');
   }
  
  
  
});