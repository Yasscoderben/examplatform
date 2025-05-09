const form = document.getElementById('inscriptionForm');
const msg = document.getElementById('message');

form.addEventListener('submit', async function(e) {
  e.preventDefault();

    const user = {
    nom: document.getElementById('nom').value.trim(),
    prenom: document.getElementById('prenom').value.trim(),
    email: document.getElementById('email').value.trim(),
    password: document.getElementById('password').value,
    naissance: document.getElementById('date_naissance').value, 
    sexe: document.getElementById('sexe').value,
    etablissement: document.getElementById('etablissement').value.trim(),
    filiere: document.getElementById('filiere').value.trim(),
    type: document.getElementById('type').value 
  };


  try {
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    });

    const data = await res.json();

    if (res.ok) {
      msg.textContent = "inscription réussie !";
      msg.className = "message success";

      setTimeout(() => {
        window.location.href = "LOGIN.html";
      }, 1500);
    } else {
      msg.textContent = data.error || "Erreur inconnue.";
      msg.className = "message error";
    }
  } catch (err) {
    console.error("Erreur inscription:", err);
    msg.textContent = "Erreur réseau.";
    msg.className = "message error";
  }
});
