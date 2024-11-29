
document.getElementById('contactForm').addEventListener("submit", function(event){
  event.preventDefault();


  let name = document.getElementById('name').value;
  let email = document.getElementById('email').value;
  let message = document.getElementById('message').value;

  let params = {
    Email: email,
    Name: name,
    Message: message
  };

  // Realiza la petición POST a mi API
  fetch('http://apinotificaciones.somee.com/api/Email/SendMailLaura', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(params)
  })
  .then(function(response) {
    if (response.ok) {
        document.getElementById("contactForm").reset();
        document.getElementById("successModal").classList.add("visible");
    } else {
        alert('ocurrio un error')
    }
  })
  .catch(function(error) {
    console.log('FAILED...', error);
  });
});

document.getElementById("closeModal").addEventListener("click", function() {
  document.getElementById("successModal").classList.remove("visible");
});


  