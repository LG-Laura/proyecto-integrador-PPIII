
document.getElementById('contactForm').addEventListener("submit", function(event){
    event.preventDefault();
  
    let name = document.getElementById('nombre').value;
    let email = document.getElementById('email').value;
    let message = document.getElementById('mensaje').value;
  
    let params = {
      Name: name,
      Email: email,
      Message: message
    };
  
    // Realiza la petición POST a mi API
    //fetch('http://localhost:5041/api/Email/SendMailMaca', {
    fetch('http://apinotificaciones.somee.com/api/Email/SendMailMaca', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(params)
    })
    .then(function(response) {
      if (response.ok) {
          document.getElementById("contactForm").reset();
      } else {
          alert('ocurrio un error')
      }
    })
    .catch(function(error) {
      console.log('FAILED...', error);
    });
  });