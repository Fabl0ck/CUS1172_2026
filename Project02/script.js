let tasks = []; // The array to store task objects
const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');

taskForm.onsubmit = function(event) {
    event.preventDefault();

    // Get values from form
    const title = document.getElementById('taskTitle').value;
    const priority = document.getElementById('taskPriority').value;
    const status = document.querySelector('input[name="status"]:checked').value;

    // Create task object
    const newTask = {
        id: Date.now(), // Unique ID for finding it later
        title: title,
        priority: priority,
        status: status
    };

    // Add to array
    tasks.push(newTask);

    // Add to DOM
    renderTask(newTask);

    // Clear form
    taskForm.reset();
};

function renderTask(task) {
    const li = document.createElement('li');
    li.setAttribute('data-id', task.id);
    li.className = `list-group-item d-flex justify-content-between align-items-center`;
    
    // Set initial style if completed
    if (task.status === 'completed') {
        li.style.textDecoration = "line-through";
    }

    li.innerHTML = `
        <span><strong>${task.title}</strong> [${task.priority}]</span>
        <div>
            <button class="btn btn-sm btn-success btn-complete">Complete</button>
            <button class="btn btn-sm btn-danger btn-remove">Remove</button>
        </div>
    `;

    // Event: Mark Complete
    li.querySelector('.btn-complete').onclick = function() {
        li.style.textDecoration = "line-through";
        task.status = "completed"; // Update object in array
    };

    // Event: Remove
    li.querySelector('.btn-remove').onclick = function() {
        // Remove from DOM
        li.remove();
        // Remove from array
        tasks = tasks.filter(t => t.id !== task.id);
    };

    taskList.appendChild(li);
}
