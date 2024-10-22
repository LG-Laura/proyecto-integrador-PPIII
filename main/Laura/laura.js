particlesJS("particle-canvas", {
    "particles": {
        "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
        "color": { "value": "#ff6c39" },
        "shape": { "type": "circle" },
        "opacity": { "value": 0.6, "random": true },
        "size": { "value": 7, "random": true },
        "move": { "speed": 3 }
    },
    "interactivity": {
        "events": {
            "onhover": { "enable": true, "mode": "repulse" }
        }
    }
});

// Inicializa EmailJS
(function(){
    emailjs.init("servicio_es7xuet"); // Reemplaza con tu User ID
  })();
  
  // Agrega el evento de envío al formulario
  document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();
  
    // Enviar el formulario
    emailjs.sendForm("servicio_es7xuet", "__ejs-test-mail-service__", this)
      .then(function() {
        alert("Mensaje enviado exitosamente!");
        // Limpiar el formulario
        document.getElementById("contactForm").reset();
      }, function(error) {
        alert("Error al enviar el mensaje: " + JSON.stringify(error));
      });
  });
  