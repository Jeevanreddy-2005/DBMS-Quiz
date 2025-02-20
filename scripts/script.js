document.addEventListener("DOMContentLoaded", () => {
  const startForm = document.getElementById("start-form");
  const moduleContainer = document.getElementById("module-container");
  const quizContainer = document.getElementById("quiz-container");
  const startContainer = document.getElementById("start-container");
  const questionContainer = document.getElementById("question-container");
  const optionsContainer = document.getElementById("options-container");
  const feedbackContainer = document.getElementById("feedback-container");
  const feedbackText = document.getElementById("feedback-text");
  const ratingContainer = document.getElementById("rating-container");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const submitBtn = document.getElementById("submit-btn");
  const sendFeedbackBtn = document.getElementById("send-feedback-btn");
  let score = 0;

  let questions = [];
  let currentQuestionIndex = 0;
  let studentId = sessionStorage.getItem("studentId"); // Retrieve studentId from sessionStorage
  let selectedModule = null;

  // Start form submission
  startForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const usn = document.getElementById("usn").value;

    const response = await fetch("/api/saveStudent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, usn }),
    });

    const result = await response.json();
    studentId = result.studentId;
    sessionStorage.setItem("studentId", studentId); // Store studentId in sessionStorage

    startContainer.style.display = "none";
    moduleContainer.style.display = "block";
  });

  // Module button click event listener
  document.querySelectorAll(".module-btn").forEach((button) => {
    button.addEventListener("click", async () => {
      const module = button.getAttribute("data-module");
      selectedModule = module;

      try {
        const response = await fetch(`/api/questions/${module}`);
        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }
        questions = await response.json();
        currentQuestionIndex = 0;
        displayQuestion();

        moduleContainer.style.display = "none";
        quizContainer.style.display = "block";
      } catch (error) {
        console.error("Error fetching questions:", error);
        // Handle error (e.g., show error message to user)
      }
    });
  });

  // Previous button click event listener
  prevBtn.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      displayQuestion();
    }
  });

  // Next button click event listener
  nextBtn.addEventListener("click", () => {
    // Calculate score before moving to the next question
    const score = calculateScore();

    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      displayQuestion();
    } else {
      // Show feedback form after last question
      quizContainer.style.display = "none";
      feedbackContainer.style.display = "block";

      // Display marks in feedback.html
      const finalScore = calculateScore(); // Calculate final score again
      const marksDisplay = document.getElementById("marks-display");
      marksDisplay.textContent = `Module ${selectedModule} Score: ${finalScore} out of ${questions.length}`;
    }
  });

  // Submit button click event listener
  submitBtn.addEventListener("click", async () => {
    const score = calculateScore();
    try {
      const response = await fetch("/api/saveScore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ studentId, module: selectedModule, score }),
      });
      if (!response.ok) {
        throw new Error("Failed to save score");
      }

      // Store score and module in sessionStorage for use in feedback.html
      sessionStorage.setItem("score", score);
      sessionStorage.setItem("module", selectedModule);

      // Redirect to feedback.html
      window.location.href = "../feedback.html"; // Adjust path if necessary
    } catch (error) {
      console.error("Error saving score:", error);
      // Handle error (e.g., show error message to user)
    }
  });

  // Send feedback button click event listener
  sendFeedbackBtn.addEventListener("click", async () => {
    const rating = ratingContainer.querySelector(
      'input[name="rating"]:checked'
    );
    const feedback = feedbackText.value.trim();

    if (!rating) {
      alert("Please rate your understanding.");
      return;
    }

    try {
      const response = await fetch("/api/saveFeedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId,
          module: selectedModule,
          rating: rating.value,
          feedback,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to save feedback");
      }
      alert("Feedback sent successfully.");

      // Reset feedback form and return to module selection
      feedbackText.value = "";
      rating.checked = false;

      // Redirect back to index.html (main module selection screen)
      window.location.href = "../index.html"; // Adjust path if necessary
    } catch (error) {
      console.error("Error saving feedback:", error);
      // Handle error (e.g., show error message to user)
    }
  });

  // Function to display current question
  function displayQuestion() {
    const question = questions[currentQuestionIndex];
    questionContainer.innerHTML = `<h2>${currentQuestionIndex + 1}. ${
      question.question
    }</h2>`;

    optionsContainer.innerHTML = ""; // Clear previous options

    for (let i = 0; i < 4; i++) {
      const optionLabel = document.createElement("label");
      const optionInput = document.createElement("input");
      optionInput.type = "radio";
      optionInput.name = "option";
      optionInput.value = i;
      optionLabel.appendChild(optionInput);
      optionLabel.appendChild(
        document.createTextNode(question[`option${i + 1}`])
      );
      optionsContainer.appendChild(optionLabel);
    }

    submitBtn.style.display =
      currentQuestionIndex === questions.length - 1 ? "block" : "none";
    nextBtn.style.display =
      currentQuestionIndex === questions.length - 1 ? "none" : "block";
  }

  // Function to calculate score
  function calculateScore() {
    // let score = 0;
    const selectedOptions = document.querySelectorAll(
      'input[name="option"]:checked'
    );
    selectedOptions.forEach((option, index) => {
      if (parseInt(option.value) === questions[index].answer) {
        score++; // +1 for each correct answer
        // alert("CORRECT ANSWER");
      } else {
        // alert("WORNG ANSWER!");
      }
    });
    return score;
  }
});
