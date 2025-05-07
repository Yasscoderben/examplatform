const form = document.getElementById('loginForm');
    const msg = document.getElementById('message');

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      const user = JSON.parse(localStorage.getItem("utilisateur_inscrit"));

      if (user && user.email === email && user.password === password) {
        msg.textContent = "Connexion réussie !";
        msg.className = "message success";
        setTimeout(() => {
          window.location.href = "auth.html";
        }, 1500);
      } else {
        msg.textContent = "Email ou mot de passe incorrect.";
        msg.className = "message error";
      }
    });