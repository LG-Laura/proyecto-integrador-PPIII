document.addEventListener('DOMContentLoaded', function() {
window.addEventListener('scroll', function() {
    const bus = document.querySelector('.bus');
    const busPosition = bus.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (busPosition < screenPosition) {
        bus.classList.add('bus-scroll');
    }
});

const form = document.getElementById("registrationForm");
const statusMessage = document.getElementById("statusMessage");

form.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevenir el envío estándar del formulario

    // Capturar los valores del formulario
    const fullName = document.getElementById("fullName").value;
    const documentNumber = document.getElementById("document").value;
    const email = document.getElementById("email").value;
    const occupationSelect  = document.getElementById("occupation");
    const selectedOptionText = occupationSelect.options[occupationSelect.selectedIndex].text;

    // Preparar los datos para el envío
    const params = {
        Nombre: fullName,
        Documento: documentNumber,
        Correo: email,
        Ocupacion: selectedOptionText
    };

    // Mostrar un mensaje de carga
    statusMessage.style.display = "block";
    statusMessage.innerText = "Enviando datos...";

    // Realizar la solicitud a la API
    // fetch('http://localhost:5041/api/Email/SendMailFer', {
        fetch('http://www.apiNotificaciones.somee.com/api/Email/SendMailFer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params)
    })
    .then(response => {
        if (response.ok) {
            statusMessage.innerText = "Registro enviado con éxito.";
            statusMessage.style.color = "green";
            form.reset(); // Limpiar el formulario
        } else {
            statusMessage.innerText = "Hubo un error al enviar el registro.";
            statusMessage.style.color = "red";
        }
    })
    .catch(error => {
        console.error("Error al enviar el formulario:", error);
        statusMessage.innerText = "Error al enviar el formulario. Intenta más tarde.";
        statusMessage.style.color = "red";
    });
});
});

if (busPosition < screenPosition) {
    bus.classList.add('bus-scroll');
    console.log("Bus moving!");
}

// Selecciona el countdown y añade el evento mousedown para arrastrar
const countdown = document.getElementById("countdown");

countdown.onmousedown = function(event) {
    let shiftX = event.clientX - countdown.getBoundingClientRect().left;
    let shiftY = event.clientY - countdown.getBoundingClientRect().top;

    function moveAt(pageX, pageY) {
        countdown.style.left = pageX - shiftX + 'px';
        countdown.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);

    countdown.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
        countdown.onmouseup = null;
    };
};

countdown.ondragstart = function() {
    return false;
};
