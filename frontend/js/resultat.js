// js/resultat.js

// Option 1: If you saved the score temporarily in localStorage (easy way)
window.onload = () => {
  const score = localStorage.getItem("lastScore");
  const total = localStorage.getItem("lastTotal");

  const resultDiv = document.getElementById("resultat");

  if (score && total) {
    resultDiv.innerHTML = `
      <p>🎯 Vous avez obtenu <strong>${score}</strong> sur <strong>${total}</strong>.</p>
      <p>${getMessage(score, total)}</p>
    `;
  } else {
    resultDiv.textContent = "Aucun résultat trouvé.";
  }

  // Clear after displaying
  localStorage.removeItem("lastScore");
  localStorage.removeItem("lastTotal");
};

function getMessage(score, total) {
  const percentage = (score / total) * 100;
  if (percentage >= 90) return "🔥 Excellent travail !";
  if (percentage >= 75) return "💪 Très bien joué !";
  if (percentage >= 50) return "🙂 Pas mal, continuez !";
  return "😕 Peut mieux faire. Revois tes cours.";
}
