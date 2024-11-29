document.getElementById("contact-form").addEventListener("submit", function(event) {
  event.preventDefault();

  // Muestro el estado de carga
  document.querySelector(".loading").style.display = "block";
  document.querySelector(".error-message").style.display = "none";
  document.querySelector(".sent-message").style.display = "none";
  
  // Capturo los valores del formulario
  let nombre = document.getElementById("nombre").value;
  let consulta = document.getElementById("tema_consulta").value;
  let email = document.getElementById("email").value;
  let comentario = document.getElementById("comentario").value;
  
  // Creo el objeto con los parámetros a enviar a la API
  let params = {
      Para: email,
      Asunto: consulta,
      NombreCompleto: nombre,
      Contenido: comentario
  };
  
  // Realiza la petición POST a mi API
  fetch('http://www.apinotificaciones.somee.com/api/email', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(params)
  })
  .then(function(response) {
    if (response.ok) {
        document.querySelector(".loading").style.display = "none";
        document.querySelector(".sent-message").style.display = "block";
        
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
