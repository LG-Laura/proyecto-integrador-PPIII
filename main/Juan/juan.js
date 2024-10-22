// Elementos del DOM
const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
const exportBtn = document.getElementById('export-btn');

// Cargar tareas desde LocalStorage al cargar la página
document.addEventListener('DOMContentLoaded', loadTasksFromStorage);

// Agregar una tarea nueva
taskForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const taskInput = document.getElementById('new-task');
  const taskText = taskInput.value.trim();

  if (taskText) {
    addTaskToList(taskText);
    saveTaskToStorage(taskText);
    taskInput.value = '';
  }
});

// Función para agregar la tarea como una card
function addTaskToList(taskText, isCompleted = false) {
  const div = document.createElement('div');
  div.classList.add('card');
  if (isCompleted) {
    div.classList.add('completed');
  }

  div.innerHTML = `
    <div class="card-body">
      <h5 class="task-text">${taskText}</h5>
      <div>
        <button class="btn btn-success btn-sm me-2 status-btn">${isCompleted ? 'Pendiente' : 'Listo'}</button>
        <button class="btn btn-warning btn-sm me-2 edit-btn">Editar</button>
        <button class="btn btn-danger btn-sm me-2">Eliminar</button>
        <a href="#" class="btn btn-info btn-sm whatsapp-btn">WhatsApp</a>
      </div>
    </div>
  `;

  // Funcionalidad del botón "Listo/Pendiente" para marcar la tarea como completada o pendiente
  const statusBtn = div.querySelector('.status-btn');
  statusBtn.addEventListener('click', function () {
    div.classList.toggle('completed');
    const isNowCompleted = div.classList.contains('completed');
    statusBtn.textContent = isNowCompleted ? 'Pendiente' : 'Listo';
    updateTaskInStorage(taskText, isNowCompleted);
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

  taskList.appendChild(div);
}

// Función para pedir el número de teléfono y enviar la tarea por WhatsApp
function promptForPhoneNumberAndSendWhatsApp(taskText) {
  const phoneNumber = prompt("Ingresa tu número de teléfono con código de país (ejemplo: 1123456789):");
  
  if (phoneNumber && validatePhoneNumber(phoneNumber)) {
    sendTaskToWhatsApp(taskText, phoneNumber);
  } else {
    alert("Por favor, ingresa un número de teléfono válido.");
  }
}

// Función para validar el número de teléfono (básica)
function validatePhoneNumber(phoneNumber) {
  const phoneRegex = /^[0-9]{11,15}$/; 
  return phoneRegex.test("549"+phoneNumber);
}

// Función para enviar la tarea a WhatsApp con el número ingresado por el usuario
function sendTaskToWhatsApp(taskText, phoneNumber) {
  const message = encodeURIComponent(`Tarea: ${taskText}`);
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;
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
      updateTaskTextInStorage(oldTaskText, newTaskText, div.classList.contains('completed'));
    }
  });
}

// Guardar tarea en LocalStorage
function saveTaskToStorage(taskText) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push({ text: taskText, completed: false });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Actualizar el estado de la tarea en LocalStorage
function updateTaskInStorage(taskText, isCompleted) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const updatedTasks = tasks.map(task => 
    task.text === taskText ? { text: task.text, completed: isCompleted } : task
  );
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

// Actualizar el texto de la tarea en LocalStorage
function updateTaskTextInStorage(oldTaskText, newTaskText, isCompleted) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const updatedTasks = tasks.map(task => 
    task.text === oldTaskText ? { text: newTaskText, completed: isCompleted } : task
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
  tasks.forEach(task => addTaskToList(task.text, task.completed));
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
