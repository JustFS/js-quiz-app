class Quiz {
  constructor(questions) {
    this.score = 0;
    this.questions = questions;
    this.currentQuestionIndex = 0;
  }
  getCurrentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }
  guess(answer) {
    if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
      this.score++;
    }
    this.currentQuestionIndex++;
  }
  hasEnded() {
    return this.currentQuestionIndex >= this.questions.length;
  }
}

const QuizUI = {
  displayNext: function () {
      if (quiz.hasEnded()) {
        this.displayScore();
      } else {
        this.displayQuestion();
        this.displayChoices();
        this.displayProgress();
      }
  },

  displayQuestion: function() {
      this.populateIdWithHTML("question", quiz.getCurrentQuestion().text);
  },
  displayChoices: function() {
      var choices = quiz.getCurrentQuestion().choices;

      for(var i = 0; i < choices.length; i++) {
          this.populateIdWithHTML("choice" + i, choices[i]);
          this.guessHandler("guess" + i, choices[i]);
      }
  },
  displayScore: function() {
      var gameOverHTML = "<h1>Game Over</h1>";
      gameOverHTML += "<h2> Your score is: " + quiz.score + "</h2>";
      this.populateIdWithHTML("quiz", gameOverHTML);
  },
  
  populateIdWithHTML: function(id, text) {
      var element = document.getElementById(id);
      element.innerHTML = text;
  },
  guessHandler: function(id, guess) {
      var button = document.getElementById(id);
      button.onclick = function() {
          quiz.guess(guess);
          QuizUI.displayNext();
      }
  },
  
  displayProgress: function() {
      var currentQuestionNumber = quiz.currentQuestionIndex + 1;
      this.populateIdWithHTML("progress", "Question " + currentQuestionNumber + " of " + quiz.questions.length);
  }
};

class Question {
  constructor(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
  }
  isCorrectAnswer(choice) {
    return this.answer === choice;
  }
}
let questions = [
  new Question("Who was the first President of the United States?", [ "George Washington", "Thomas Jefferson", "Thomas Edison", "I don't know" ], "George Washington"),
  new Question("What is the answer to the Ultimate Question of Life, the Universe, and Everything?", ["Pi","42", "Wah?", "I don't know"], "42"),
  new Question("Do you love to code?", ["No","Yes", "Hell Yeah", "No"], "Hell Yeah"),
  new Question("What's the best programming language?", ["Javascript","C#", "Php", "Python"], "Javascript"),
];

//Create Quiz
let quiz = new Quiz(questions);

//Display Quiz
QuizUI.displayNext();


