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


const Display = {
  populateSelector: function(id, text) {
    let element = document.getElementById(id);
    element.innerHTML = text;
  },
  question: function() {
    this.populateSelector("question", quiz.getCurrentQuestion().text);
  },
  choices: function() {
    var choices = quiz.getCurrentQuestion().choices;

    for(let i = 0; i < choices.length; i++) {
      this.populateSelector("choice" + i, choices[i]);
      this.guessHandler("guess" + i, choices[i]);
    }
  },
  guessHandler: function(id, guess) {
    let button = document.getElementById(id);
    button.onclick = function() {
      quiz.guess(guess);
      quizApp();
    }
  },
  progress: function() {
    let currentQuestionNumber = quiz.currentQuestionIndex + 1;
    this.populateSelector("progress", "Question " + currentQuestionNumber + " of " + quiz.questions.length);
  },
  endQuiz: function() {
    endQuizHTML = `
      <h1>Quiz terminé !</h1>
      <h2> votre score est de : ${quiz.score} / ${quiz.questions.length}`;
      this.populateSelector("quiz", endQuizHTML);
  },
};

quizApp = () => {
  if (quiz.hasEnded()) {
    Display.endQuiz();
  } else {
    Display.question();
    Display.choices();
    Display.progress();
  }
}

//Create Quiz
let quiz = new Quiz(questions);
quizApp();
