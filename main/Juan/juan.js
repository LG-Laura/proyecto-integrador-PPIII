// Elementos del DOM
const taskForm = document.getElementById('task-form');
const queueColumn = document.getElementById('queue');
const inProgressColumn = document.getElementById('in-progress');
const doneColumn = document.getElementById('done');
const exportBtn = document.getElementById('export-btn');

// Cargar tareas desde LocalStorage al cargar la página
document.addEventListener('DOMContentLoaded', loadTasksFromStorage);

// Agregar una tarea nueva
taskForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const taskInput = document.getElementById('new-task');
  const taskText = taskInput.value.trim();

  if (taskText) {
    addTaskToColumn(taskText, 'queue');
    saveTaskToStorage(taskText, 'queue');
    taskInput.value = '';
  }
});

// Función para crear y agregar una tarjeta en la columna correspondiente
function addTaskToColumn(taskText, status) {
  const div = document.createElement('div');
  div.classList.add('card');
  div.draggable = true; // Habilitar drag-and-drop
  div.addEventListener('dragstart', dragStart);
  div.addEventListener('dragend', dragEnd);

  div.innerHTML = `
    <div class="card-body">
      <h5 class="task-text">${taskText}</h5>
      <div>
        <button class="btn btn-success btn-sm me-2 status-btn">Listo</button>
        <button class="btn btn-warning btn-sm me-2 edit-btn">Editar</button>
        <button class="btn btn-danger btn-sm me-2">Eliminar</button>
        <a href="#" class="btn btn-info btn-sm whatsapp-btn">WhatsApp</a>
      </div>
    </div>
  `;

  // Funcionalidad del botón "Listo"
  const statusBtn = div.querySelector('.status-btn');
  statusBtn.addEventListener('click', function () {
    div.classList.toggle('completed');
    updateTaskInStorage(taskText, div.classList.contains('completed'));
  });

  // Funcionalidad de eliminar tarea
  div.querySelector('.btn-danger').addEventListener('click', function () {
    div.remove();
    removeTaskFromStorage(taskText);
  });

  // Funcionalidad de editar tarea
  const editBtn = div.querySelector('.edit-btn');
  editBtn.addEventListener('click', function () {
    editTask(div, taskText);
  });

  // Funcionalidad del botón de WhatsApp
  const whatsappBtn = div.querySelector('.whatsapp-btn');
  whatsappBtn.addEventListener('click', function () {
    promptForPhoneNumberAndSendWhatsApp(taskText);
  });

  // Agregar la tarea a la columna correspondiente
  if (status === 'queue') {
    queueColumn.appendChild(div);
  } else if (status === 'in-progress') {
    inProgressColumn.appendChild(div);
  } else if (status === 'done') {
    doneColumn.appendChild(div);
  }
}

// Función para permitir arrastrar la tarjeta (drag-and-drop)
function dragStart(e) {
  e.dataTransfer.setData('text/plain', this.querySelector('.task-text').textContent);
  this.classList.add('dragging');
}

function dragEnd() {
  this.classList.remove('dragging');
}

// Permitir que las columnas acepten drop
document.querySelectorAll('.task-column').forEach(column => {
  column.addEventListener('dragover', function (e) {
    e.preventDefault(); // Necesario para permitir el drop
    this.classList.add('dragover');
  });

  column.addEventListener('dragleave', function () {
    this.classList.remove('dragover');
  });

  column.addEventListener('drop', function (e) {
    e.preventDefault();
    const taskText = e.dataTransfer.getData('text/plain');
    const newStatus = this.id;
    moveTaskToNewColumn(taskText, newStatus);
    this.classList.remove('dragover');
  });
});

// Función para mover tarea entre columnas
function moveTaskToNewColumn(taskText, newStatus) {
  // Remover la tarea de la columna actual
  const allCards = document.querySelectorAll('.card');
  allCards.forEach(card => {
    if (card.querySelector('.task-text').textContent === taskText) {
      card.remove();
    }
  });

  // Agregar la tarea a la nueva columna
  addTaskToColumn(taskText, newStatus);

   // Cambiar el color si la tarea se mueve a la columna 'done'
  if (newStatus === 'done') {
    taskDiv.classList.add('completed');
  } else {
    taskDiv.classList.remove('completed');
  }

  // Actualizar el estado de la tarea en LocalStorage
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const updatedTasks = tasks.map(task =>
    task.text === taskText ? { text: task.text, status: newStatus } : task
  );
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}



// Función para pedir el número de teléfono y enviar la tarea por WhatsApp
function promptForPhoneNumberAndSendWhatsApp(taskText) {
  const phoneNumber = prompt("Ingresa tu número de teléfono (ejemplo: 1123456789):");
  
  if (phoneNumber && validatePhoneNumber(phoneNumber)) {
    sendTaskToWhatsApp(taskText, phoneNumber);
  } else {
    alert("Por favor, ingresa un número de teléfono válido.");
  }
}

// Función para validar el número de teléfono (básica)
function validatePhoneNumber(phoneNumber) {
  const phoneRegex = /^[0-9]{11,15}$/; 
  return phoneRegex.test("549" + phoneNumber);
}

// Función para enviar la tarea a WhatsApp con el número ingresado por el usuario
function sendTaskToWhatsApp(taskText, phoneNumber) {
  const message = encodeURIComponent(`Tarea: ${taskText}`);
  const whatsappUrl = `https://api.whatsapp.com/send?phone=549${phoneNumber}&text=${message}`;
  window.open(whatsappUrl, '_blank');
}

// Función para permitir la edición de una tarea
function editTask(div, oldTaskText) {
  const taskTextElement = div.querySelector('.task-text');
  const editBtn = div.querySelector('.edit-btn');
  
  // Cambiar el texto a un campo input para editar
  const input = document.createElement('input');
  input.type = 'text';
  input.value = taskTextElement.textContent;
  input.classList.add('form-control', 'me-2');
  
  // Reemplazar el texto de la tarea por el campo input
  taskTextElement.replaceWith(input);
  editBtn.textContent = 'Guardar';
  editBtn.classList.remove('btn-warning');
  editBtn.classList.add('btn-success');

  // Cambiar funcionalidad del botón a "Guardar"
  editBtn.addEventListener('click', function () {
    const newTaskText = input.value.trim();
    
    if (newTaskText) {
      // Reemplazar el input con el texto editado
      taskTextElement.textContent = newTaskText;
      input.replaceWith(taskTextElement);

      // Cambiar el botón de nuevo a "Editar"
      editBtn.textContent = 'Editar';
      editBtn.classList.remove('btn-success');
      editBtn.classList.add('btn-warning');

      // Actualizar la tarea en LocalStorage
      updateTaskTextInStorage(oldTaskText, newTaskText);
    }
  });
}

// Guardar tarea en LocalStorage
function saveTaskToStorage(taskText, status) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push({ text: taskText, status });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Actualizar el texto de la tarea en LocalStorage
function updateTaskTextInStorage(oldTaskText, newTaskText) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const updatedTasks = tasks.map(task => 
    task.text === oldTaskText ? { text: newTaskText, status: task.status } : task
  );
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

// Eliminar tarea de LocalStorage
function removeTaskFromStorage(taskText) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const updatedTasks = tasks.filter(task => task.text !== taskText);
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

// Cargar tareas guardadas en LocalStorage
function loadTasksFromStorage() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => addTaskToColumn(task.text, task.status));
}

// Exportar la lista de tareas a un archivo Excel
exportBtn.addEventListener('click', function () {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
  // Convertir las tareas a formato de tabla para Excel
  const worksheet = XLSX.utils.json_to_sheet(tasks);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'To-Do List');

  // Descargar el archivo Excel
  XLSX.writeFile(workbook, 'todolist.xlsx');
});
