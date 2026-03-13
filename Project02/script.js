// 1. Maintain an array to store task details
let taskArray = [];

// 2. Programmatically register the 'onsubmit' event
const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');

taskForm.onsubmit = function(event) {
    event.preventDefault();

    // Capture values from the form
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

    // Append to the array
    taskArray.push(newTask);

    // Append to the DOM
    addTaskToDOM(newTask);

    // Reset form for next entry
    taskForm.reset();
};

function addTaskToDOM(task) {
    // Create the <li> element
    const li = document.createElement('li');
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.setAttribute('data-id', task.id);

    // Apply strike-through if initial status is completed
    if (task.status === 'completed') {
        li.style.textDecoration = "line-through";
    }

    // Task content HTML
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

    // 3. Programmatically register 'Complete' event
    li.querySelector('.complete-btn').onclick = function() {
        li.style.textDecoration = "line-through";
        // Update status in array
        task.status = 'completed';
    };

    // 4. Programmatically register 'Remove' event
    li.querySelector('.remove-btn').onclick = function() {
        // Remove from DOM
        li.remove();
        // Remove from array using filter
        taskArray = taskArray.filter(t => t.id !== task.id);
    };

    // Append the new item to the list
    taskList.appendChild(li);
}
