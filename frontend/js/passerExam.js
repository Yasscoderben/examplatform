let timeLeft = 120;
    const timerDisplay = document.getElementById('timer');

    const countdown = setInterval(() => {
      if (timeLeft <= 0) {
        clearInterval(countdown);
        submitExam();
      } else {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent =` Temps restant : ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        timeLeft--;
      }
    }, 1000);

    function submitExam() {
      clearInterval(countdown);
      const answers = {
        q1: document.querySelector('input[name="q1"]:checked')?.value || "",
        q2: document.querySelector('input[name="q2"]:checked')?.value || "",
        q3: document.querySelector('input[name="q3"]:checked')?.value || "",
        q4: document.querySelector('input[name="q4"]:checked')?.value || ""
      };

      localStorage.setItem("examAnswers", JSON.stringify(answers));
      alert("Examen terminé ! Vos réponses ont été enregistrées.");
      window.location.href = "Resultat.html";
    }