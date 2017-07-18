/* eslint no-multi-str: 0 */  // --> OFF
/* eslint no-undef: 0 */  // --> OFF
 
//Questions Storage, You can add as many as you want,
const STORE = [
  {
    question: 'What is Albus Dumbledore\'s full name?',
    answers:
    [
      'Albus Percival Wulfric Brian Dumbledore',
      'Albus Patrick William Bob Dumbledore',
      'Albus Brian Percival Wulfric Dumbledore',
      'Albus William Bob Patrick Dumbledore'
    ],
    correct: 'Albus Percival Wulfric Brian Dumbledore'
  },
  {
    question: 'How many years in a row had Slytherin won the House Cup before \
     Harry\'s arrival at Hogwarts in 1991?',
    answers:
    [
      'Three years',
      'Seven years',
      'Ten years',
      'Eight years'
    ],
    correct: 'Seven years'
  },
  {
    question: 'Which two characters share a Patronus?',
    answers: [
      'Ron Weasley and Neville Longbottom',
      'Harry Potter and James Potter',
      'Severus Snape and Lily Potter',
      'Dean Thomas and Ginny Weasley'
    ],
    correct: 'Severus Snape and Lily Potter'},
  {
    question: 'When Harry and Ron visit the Slytherin common room in disguise in \
    The Chamber of Secrets, what is the password used to get inside?',
    answers:
    [
      'Salazar',
      'Pure-blood',
      'Parselmouth',
      'Draco dormiens nunquam titillandus'
    ],
    correct: 'Pure-blood'
  },
  {
    question: 'When Harry and Hermione use the Time-Turner to save Sirius in The \
    Prisoner of Azkaban, how many times does Hermione turn it?',
    answers:
    [
      'One time',
      'Two times',
      'Three times',
      'Four times'
    ],
      correct: 'Three times'
  }
];
let questionnum = 0;
let score = 0;
let wrong = 0;
//Keyboard functionality
//compare key values to execute correct checking
$(function () {
  $(window).keypress(e => {
    const ev = e || window.event;
    const key = ev.keyCode || ev.which;
    //do stuff with "key" here...
    if (key === 97) {
    $('.js-answerA').prop('checked', 'checked').focus();
    } else if (key === 98) {
    $('.js-answerB').prop('checked', 'checked').focus();
    } else if (key === 99) {
    $('.js-answerC').prop('checked', 'checked').focus();
    } else if (key === 100) {
    $('.js-answerD').prop('checked', 'checked').focus();
    } 
  }); 
});
//Create html inputs and show questions and multiple choice,
function redoInputs() {
  $('#js-quiz-form').show();
  $('.js-question').text(STORE[questionnum].question);
  $('.js-answerA').val(STORE[questionnum].answers[0]);
  $('.js-answerB').val(STORE[questionnum].answers[1]);
  $('.js-answerC').val(STORE[questionnum].answers[2]);
  $('.js-answerD').val(STORE[questionnum].answers[3]);
  $('.js-labelA').text(STORE[questionnum].answers[0]);
  $('.js-labelB').text(STORE[questionnum].answers[1]);
  $('.js-labelC').text(STORE[questionnum].answers[2]);
  $('.js-labelD').text(STORE[questionnum].answers[3]);
  checkAnswer();
}
//If answer is Correct
function correctAnswer() {
  $('#js-quiz-form').hide();
  $('.js-next').show();
  $('.js-remark').text(`YAY!! That's right! The answer is ${STORE[questionnum].correct}`);
  $('.next').focus();
  $('.next').click(event => {
    $('.js-next').hide();
    checkCompletion();
  });
}
//If answer is incorrect
function incorrectAnswer() {
  $('#js-quiz-form').hide();
  $('.js-next').show();
  $('.js-remark').text(`Sorry, that is incorrect. The correct answer \
  is ${STORE[questionnum].correct}`);
  $('.next').focus();
  $('.next').click(event => {
    $('.js-next').hide();
    checkCompletion();
  });
}
function clean(){
  $('.js-answerA,.js-answerB,.js-answerC,.js-answerD').val('').prop('checked', false);
  $('input[name=answer]:checked').prop('checked', false);
}
//If answer is correct add a point
function scoreKeeper() {
  score++;
  $('.js-score').text(`Score:${score}`);
  return;
}
//If answer is incorrect add a Wrong Point
function wrongKeeper() {
  wrong++;
  $('.js-wrong').text(`Incorrect:${wrong}`);
}
function addOne() {
  if (questionnum === (score + (wrong - 1))) {
    questionnum++;
  }
}
//Question number
function onQuest() {
  $('.js-completed').text(`Question #:${questionnum + 1} / ${STORE.length}`);
  redoInputs();
}
//If the questionnumber is equal to the question storage length, End Quiz
function checkCompletion() {
  if ((score + wrong) !== STORE.length) {
      addOne();
      onQuest();
  } else {
    $('.js-complete').show();
    $('.js-question').text(`YOU FINISHED THE QUIZ WITH ${(score / STORE.length) * 100}%`);
    $('.retake').focus();
    $('.retake').click(event => {
      $('.js-complete').hide();
      handleStart();
    });
  }
}
//check for correct on submit
function checkAnswer() {
  $('#js-quiz-form').submit(event => {
    event.preventDefault();
    const answer = $('input[name=answer]:checked').val();
    if (!answer) {
      return;
    } else if (answer !== STORE[questionnum].correct) {
      wrongKeeper();
      clean();
      incorrectAnswer();
    } else {
      scoreKeeper();
      clean();
      correctAnswer();
    }
  });
}
//handle Start
//Start Screen lift off application upon clicking
function handleStart() {
  questionnum = 0;
  score = 0;
  wrong = 0;
  $('.js-wrong').text('Incorrect:');
  $('.js-score').text('Score:');
  $('.js-completed').text(`Question #:${questionnum} / ${STORE.length}`);
  $('.js-start-screen').show();
  $('.js-start').focus();
  $('.js-start').click(event => {
    $('.js-start-screen').hide();
    $('.js-completed').text(`Question #:${questionnum + 1} / ${STORE.length}`);
    redoInputs();
  });
}

handleStart();
