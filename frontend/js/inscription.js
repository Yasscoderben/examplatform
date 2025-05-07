const form = document.getElementById('inscriptionForm');
const msg = document.getElementById('message');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const user = {
    nom: document.getElementById('nom').value.trim(),
    prenom: document.getElementById('prenom').value.trim(),
    email: document.getElementById('email').value.trim(),
    date_naissance: document.getElementById('date_naissance').value,
    sexe: document.getElementById('sexe').value,
    etablissement: document.getElementById('etablissement').value.trim(),
    filiere: document.getElementById('filiere').value.trim(),
    type: document.getElementById('type').value
  };

  localStorage.setItem("utilisateur_inscrit", JSON.stringify(user));

  msg.textContent = "Inscription réussie !";
  msg.className = "message success";

  setTimeout(() => {
    window.location.href = "LOGIN.html";
  }, 1500);
});