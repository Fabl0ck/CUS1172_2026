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
