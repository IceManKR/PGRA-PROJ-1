const API_BASE = '';

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const messageEl = document.getElementById('message');

document.getElementById('loginBtn').addEventListener('click', () => {
  authenticate('login');
});

document.getElementById('registerBtn').addEventListener('click', () => {
  authenticate('register');
});

async function authenticate(type) {
  messageEl.textContent = 'Processing...';

  try {
    const res = await fetch(`${API_BASE}/auth/${type}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: emailInput.value,
        password: passwordInput.value
      })
    });

    const data = await res.json();

    if (!res.ok) {
      messageEl.textContent = data.error || 'Something went wrong';
      return;
    }

    // Save token
    localStorage.setItem('token', data.token);
    localStorage.setItem('role', data.role);

    // Redirect to dashboard
    window.location.href = '/app';
  } catch (err) {
    messageEl.textContent = 'Network error';
  }
}
