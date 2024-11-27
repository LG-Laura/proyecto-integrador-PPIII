(function(){
    emailjs.init({
      publicKey: "tnBGjZ8orne8I5Xm1",
    });
})();
      
document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita que el formulario recargue la página

    document.querySelector(".loading").style.display = "block";
    document.querySelector(".error-message").style.display = "none";
    document.querySelector(".sent-message").style.display = "none";
    
    // Captura los valores del formulario
    let nombre = document.getElementById("nombre").value;
    let email = document.getElementById("email").value;
    let telefono = document.getElementById("telefono").value;
    let mensaje = document.getElementById("mensaje").value;
    let asunto = document.getElementById("asunto").value;
    
    // Parámetros que se envían a EmailJS
    let params = {
        Nombre: nombre,
        Email: email,
        Telefono: telefono,
        Asunto: asunto,
        Mensaje: mensaje
    };

    // Realiza la petición POST a mi API
  // fetch('http://localhost:5041/api/Email/SendMailPrincipal', {
  Email/SendMailFerfetch('http://apinotificaciones.somee.com/api/Email/SendMailPrincipal', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(params)
  })
  .then(function(response) {
    if (response.ok) {
        console.log('SUCCESS!', response.status, response.text);
       document.querySelector(".loading").style.display = "none";
       const successModal = new bootstrap.Modal(document.getElementById('successModal'));
       successModal.show();
       setTimeout(() => {
           successModal.hide();
       }, 2500);
       document.getElementById("contact-form").reset();
    } else {
        document.querySelector(".loading").style.display = "none";
        document.querySelector(".error-message").innerText = "Hubo un error al enviar el mensaje. Inténtalo de nuevo más tarde.";
        document.querySelector(".error-message").style.display = "block";
    }
  })
  .catch(function(error) {
    console.log('FAILED...', error);
    document.querySelector(".loading").style.display = "none";
    document.querySelector(".error-message").innerText = "Hubo un error al enviar el mensaje. Inténtalo de nuevo más tarde.";
    document.querySelector(".error-message").style.display = "block";
  });
}); 
