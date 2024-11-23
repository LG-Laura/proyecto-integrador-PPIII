// particlesJS("particle-canvas", {
//     "particles": {
//         "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
//         "color": { "value": "#ff6c39" },
//         "shape": { "type": "circle" },
//         "opacity": { "value": 0.6, "random": true },
//         "size": { "value": 7, "random": true },
//         "move": { "speed": 3 }
//     },
//     "interactivity": {
//         "events": {
//             "onhover": { "enable": true, "mode": "repulse" }
//         }
//     }
// });

// Inicializa EmailJS
// (function(){
//     emailjs.init("UnwxxufSfCOzt9nYZ");
// })();
document.getElementById('form')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   const button = document.getElementById('button');
    button.value = 'Enviando...';
    
   // Muestra el mensaje de carga
   document.querySelector(".loading").style.display = "block";
   document.querySelector(".error-message").style.display = "none";
   document.querySelector(".sent-message").style.display = "none";
     
   const serviceID = 'default_service';
   const templateID = 'template_kw8az8h';

   emailjs.sendForm(serviceID, templateID, this)
   .then(function(response) {
    console.log('SUCCESS!', response.status, response.text);
        document.querySelector(".loading").style.display = "none";
        document.querySelector(".sent-message").style.display = "block";
        document.getElementById("form").reset(); // Limpiar el formulario
  }, function(error) {
    console.log('FAILED...', error);
        document.querySelector(".loading").style.display = "none";
        document.querySelector(".error-message").innerText = "Hubo un error al enviar el mensaje. Inténtalo de nuevo más tarde.";
        document.querySelector(".error-message").style.display = "block";
  });
});

  