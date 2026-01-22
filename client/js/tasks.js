const taskListEl = document.getElementById('taskList');
const statusEl = document.getElementById('status');
const logoutBtn = document.getElementById('logoutBtn');

const taskTitleInput = document.getElementById('taskTitle');
const createTaskBtn = document.getElementById('createTaskBtn');
const createStatusEl = document.getElementById('createStatus');

const prevBtn = document.getElementById('prevPageBtn');
const nextBtn = document.getElementById('nextPageBtn');
const pageInfoEl = document.getElementById('pageInfo');

const adminSection = document.getElementById('adminSection');
const purgeBtn = document.getElementById('purgeBtn');
const adminStatusEl = document.getElementById('adminStatus');

// Protect page
if (!localStorage.getItem('token')) {
  window.location.href = '/';
}

// Logout
logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  window.location.href = '/';
});

// Pagination state
let currentPage = 1;
const limit = 5;

// Role-based UI
if (localStorage.getItem('role') === 'admin') {
  adminSection.style.display = 'block';
}

// Load tasks initially
loadTasks();

// Pagination controls
prevBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    loadTasks();
  }
});

nextBtn.addEventListener('click', () => {
  currentPage++;
  loadTasks();
});

// Create task
createTaskBtn.addEventListener('click', async () => {
  createStatusEl.textContent = 'Creating task...';

  try {
    await apiFetch('/tasks', {
      method: 'POST',
      body: JSON.stringify({
        title: taskTitleInput.value
      })
    });

    taskTitleInput.value = '';
    createStatusEl.textContent = 'Task created';
    loadTasks();
  } catch (err) {
    setMessage(statusEl, err.message, 'status');

  }
});

// Admin purge
purgeBtn.addEventListener('click', async () => {
  adminStatusEl.textContent = 'Executing admin action...';

  try {
    await apiFetch('/tasks/admin/purge', {
      method: 'DELETE'
    });

    setMessage(adminStatusEl, 'All tasks purged', 'success');
    loadTasks();
  } catch (err) {
    adminStatusEl.textContent = err.message;
  }
});

// Load tasks
async function loadTasks() {
  setMessage(statusEl, 'Loading tasks...', 'status');


  try {
    const result = await apiFetch(`/tasks?page=${currentPage}&limit=${limit}`);

    taskListEl.innerHTML = '';

    if (result.data.length === 0 && currentPage > 1) {
      currentPage--;
      return loadTasks();
    }

    result.data.forEach(task => {
      const li = document.createElement('li');
      li.textContent = task.title;
      taskListEl.appendChild(li);
    });

    pageInfoEl.textContent = `Page ${result.page} of ${Math.ceil(result.total / limit)}`;
    statusEl.textContent = '';
  } catch (err) {
    statusEl.textContent = err.message;
  }
}
