//QUESTIONS
const STORE = [
  {question:'What is Albus Dumbledore\'s full name?',answerA:' Albus Percival Wulfric Brian Dumbledore',answerB:'Albus Patrick William Bob Dumbledore',answerC:'Albus Brian Percival Wulfric Dumbledore',answerD:'Albus William Bob Patrick Dumbledore',correct:' Albus Percival Wulfric Brian Dumbledore'},
  {question:'How many years in a row had Slytherin won the House Cup before Harry\'s arrival at Hogwarts in 1991?',answerA:'Three years',answerB:'Seven years',answerC:'Ten years',answerD:'Eight years',correct:'Seven years'},
  {question:'Which two characters share a Patronus?',answerA:'Ron Weasley and Neville Longbottom',answerB:'Harry Potter and James Potter',answerC:'Severus Snape and Lily Potter',answerD:'Dean Thomas and Ginny Weasley',correct:'Severus Snape and Lily Potter'},
  {question:'When Harry and Ron visit the Slytherin common room in disguise in The Chamber of Secrets, what is the password used to get inside?',answerA:'Salazar',answerB:'Pure-blood',answerC:'Parselmouth',answerD:'Draco dormiens nunquam titillandus',correct:'Pure-blood'},
  {question:'When Harry and Hermione use the Time-Turner to save Sirius in The Prisoner of Azkaban, how many times does Hermione turn it?',answerA:'One time',answerB:'Two times',answerC:'Three times',answerD:'Four times',correct:'Three times'}
]
let questionnum = 0;
let score = 0;

const QUESTION_TEXT_AREA = $('.js-question');
const ANSWER_RADIO_A_VAL = $('.js-answerA');
const ANSWER_RADIO_B_VAL = $('.js-answerB');
const ANSWER_RADIO_C_VAL = $('.js-answerC');
const ANSWER_RADIO_D_VAL = $('.js-answerD');
const INPUT_RADIO_VALUE = $('input').attr("value", "")
//Create question
function makeNextQuestion(){
  QUESTION_TEXT_AREA.text(STORE[questionnum].question);
  makeAnswers(questionnum);

}
//Create answers
function makeAnswers(questionnum){
  ANSWER_RADIO_A_VAL.val(STORE[questionnum].answerA);
  ANSWER_RADIO_B_VAL.val(STORE[questionnum].answerB);
  ANSWER_RADIO_C_VAL.val(STORE[questionnum].answerC);
  ANSWER_RADIO_D_VAL.val(STORE[questionnum].answerD);
  checkAnswer();
}
//check for correct on submit
function checkAnswer(){
  $('#js-quiz-form').submit(event => {
    event.preventDefault();
    let answer = $('input[name=answer]:checked').val();
    if (answer === STORE[questionnum].correct){
      score++;
      $('.js-score').text(`${score} / 5`)
      questionnum++;
      $('.js-completed').text(`${questionnum} / 5`)
      makeNextQuestion();
    }
    else {
      $('#js-quiz-form').parent().css("display", "none");
      $('.wrong-section p').text(`Sorry, you have submitted the incorrect answer. The correct answer was ${STORE[questionnum].correct}`)
      $('.wrong-section').parent().css("display", "block");
      questionnum++;
      $('.js-completed').text(`${questionnum} / 5`)
      $('.js-start').click(event => makeNextQuestion());
    }
  })
}
//handle Start
function handleStart(){
  $('.js-start').click(event => {
  $('.js-start-screen').css("display", "none");
  $('#js-quiz-form').css("display", "block");
  $('input').attr("display", "block")
  makeNextQuestion()});
}
handleStart();
