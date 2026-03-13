
let taskArray = [];

const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');

taskForm.onsubmit = function(event) {
    event.preventDefault();

    const title = document.getElementById('taskTitle').value;
    const priority = document.getElementById('taskPriority').value;
    const status = document.querySelector('input[name="status"]:checked').value;

    // Create a task object with a unique ID
    const newTask = {
        id: Date.now(),
        title: title,
        priority: priority,
        status: status
    };

 
    taskArray.push(newTask);

    addTaskToDOM(newTask);

    taskForm.reset();
};

function addTaskToDOM(task) {
    const li = document.createElement('li');
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.setAttribute('data-id', task.id);

 
    if (task.status === 'completed') {
        li.style.textDecoration = "line-through";
    }

    li.innerHTML = `
        <div>
            <span class="fw-bold">${task.title}</span> 
            <span class="badge bg-secondary ms-2">${task.priority}</span>
        </div>
        <div>
            <button class="btn btn-sm btn-success me-2 complete-btn">Complete</button>
            <button class="btn btn-sm btn-danger remove-btn">Remove</button>
        </div>
    `;

    li.querySelector('.complete-btn').onclick = function() {
        li.style.textDecoration = "line-through";
        task.status = 'completed';
    };

    li.querySelector('.remove-btn').onclick = function() {
        li.remove();
        taskArray = taskArray.filter(t => t.id !== task.id);
    };

    taskList.appendChild(li);
}
