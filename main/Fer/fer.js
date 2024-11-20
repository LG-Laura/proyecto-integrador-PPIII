document.addEventListener('DOMContentLoaded', function() {
window.addEventListener('scroll', function() {
    const bus = document.querySelector('.bus');
    const busPosition = bus.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (busPosition < screenPosition) {
        bus.classList.add('bus-scroll');
    }
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
