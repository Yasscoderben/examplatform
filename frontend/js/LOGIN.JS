const form = document.getElementById('loginForm');
const msg = document.getElementById('message');

form.addEventListener('submit', async function(e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      // Store user data for session use
      localStorage.setItem("userId", data.user.id);
      localStorage.setItem("userType", data.user.type);

      msg.textContent = "Connexion réussie !";
      msg.className = "message success";

      setTimeout(() => {
        window.location.href = "auth.html"; // redirect after login
      }, 1500);
    } else {
      msg.textContent = data.error || "Email ou mot de passe incorrect.";
      msg.className = "message error";
    }
  } catch (err) {
    console.error("Erreur lors de la connexion :", err);
    msg.textContent = "Erreur serveur.";
    msg.className = "message error";
  }
});
