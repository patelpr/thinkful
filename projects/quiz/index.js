//Questions Storage, You can add as many as you want,
const STORE = [
  {question:'What is Albus Dumbledore\'s full name?',answerA:' Albus Percival Wulfric Brian Dumbledore',answerB:'Albus Patrick William Bob Dumbledore',answerC:'Albus Brian Percival Wulfric Dumbledore',answerD:'Albus William Bob Patrick Dumbledore',correct:' Albus Percival Wulfric Brian Dumbledore'},
  {question:'How many years in a row had Slytherin won the House Cup before Harry\'s arrival at Hogwarts in 1991?',answerA:'Three years',answerB:'Seven years',answerC:'Ten years',answerD:'Eight years',correct:'Seven years'},
  {question:'Which two characters share a Patronus?',answerA:'Ron Weasley and Neville Longbottom',answerB:'Harry Potter and James Potter',answerC:'Severus Snape and Lily Potter',answerD:'Dean Thomas and Ginny Weasley',correct:'Severus Snape and Lily Potter'},
  {question:'When Harry and Ron visit the Slytherin common room in disguise in The Chamber of Secrets, what is the password used to get inside?',answerA:'Salazar',answerB:'Pure-blood',answerC:'Parselmouth',answerD:'Draco dormiens nunquam titillandus',correct:'Pure-blood'},
  {question:'When Harry and Hermione use the Time-Turner to save Sirius in The Prisoner of Azkaban, how many times does Hermione turn it?',answerA:'One time',answerB:'Two times',answerC:'Three times',answerD:'Four times',correct:'Three times'}
]

let questionnum = 0;
let score = 0;
let wrong = 0

//Keyboard functionality
//compare key values to execute correct checking
$(function() {
   $(window).keypress(function(e) {
       var ev = e || window.event;
       var key = ev.keyCode || ev.which;
       //do stuff with "key" here...
       if(key === 97){
       	$('.js-answerA').attr('checked', 'checked').focus();
       }
       else if(key === 98){
       	$('.js-answerB').attr('checked', 'checked').focus();
       }
       else if(key === 99){
       	$('.js-answerC').attr('checked', 'checked').focus();
       }
       else if(key === 100){
       	$('.js-answerD').attr('checked', 'checked').focus();
       }})});
//Create html inputs and show questions and multiple choice,
function redoInputs(){
  $('#js-quiz-form').empty();
  $('#js-quiz-form').append(`
    <div>
    <p class="js-question">${STORE[questionnum].question}</p>
  </div>
  <div class="row">
    <div class="col-6">
      <kbd>[A]</kbd><input type="radio" name="answer" value="${STORE[questionnum].answerA}" class="js-answerA">${STORE[questionnum].answerA}
    </div>
    <div class="col-6">
      <kbd>[B]</kbd><input type="radio" name="answer" value="${STORE[questionnum].answerB}"  class="js-answerB">${STORE[questionnum].answerB}
    </div>
  </div>
  <div class="row">
    <div class="col-6">
      <kbd>[C]</kbd><input type="radio" name="answer"  value="${STORE[questionnum].answerC}"  class="js-answerC">${STORE[questionnum].answerC}
    </div>
    <div class="col-6">
      <kbd>[D]</kbd><input type="radio" name="answer" value="${STORE[questionnum].answerD}"  class="js-answerD">${STORE[questionnum].answerD}
    </div>
    <div class="row">
      <button class="start col-12" type="submit">Submit -or- <kbd>[ENTER]</kbd></button>
    </div>
  </div>
  `);
  checkAnswer();
}
//If answer is Correct
function correctAnswer(){
  $('#js-quiz-form').empty();
  $('#js-quiz-form').append(`
    <div>
      <p class="js-question">YAY!! That's right! The answer is ${STORE[questionnum].correct}</p>
    </div>
    <button class="next">Continue -or- <kbd>[ENTER]</kbd></button>`);
    $('.next').focus();
  $('.next').click(event => {
    checkCompletion();

  })}
//If answer is incorrect
function incorrectAnswer(){
  $('#js-quiz-form').empty();
  $('#js-quiz-form').append(`
    <div>
      <p class="js-question">Sorry, that answer is incorrect. The correct answer is ${STORE[questionnum].correct}</p>
    </div>
    <button class="next start">Continue <kbd>[ENTER]</kbd></button>`);
    $('.next').focus();
  $('.next').click(event => {
    checkCompletion();
  })}
//If answer is correct add a point
function scoreKeeper(){
  score++;
  $('.js-score').text(`score:${score} / ${STORE.length}`);

}
//If answer is incorrect add a Wrong Point
function wrongKeeper(){
  wrong++;
  $('.js-wrong').text(`Incorrect:${wrong} / ${STORE.length}`);

}
//Question number
function onQuest(){
  $('.js-completed').text(`Question #:${questionnum + 2} / ${STORE.length}`);
  questionnum++;
  console.log(questionnum);
  redoInputs();

}
//If the questionnumber is equal to the question storage length, End Quiz
function checkCompletion(){
  if(questionnum >= 4){
    $('#js-quiz-form').empty();
    $('#js-quiz-form').append(`
      <div>
        <p class="js-question">YOU FINISHED THE QUIZ WITH ${(score / STORE.length )*100}% </p>
        <button class="next">Retake!</button>
      </div>
    `);
    $('.next').focus();
    $('.next').click(event => location.reload())
      return;
    }else{
      onQuest();
    }

}
//check for correct on submit
function checkAnswer(){
  $('#js-quiz-form').submit(event => {
    event.preventDefault();
    let answer = $('input[name=answer]:checked').val();
    if(!answer){
      return;
    }
    if (answer === STORE[questionnum].correct){
      scoreKeeper();
      correctAnswer();
    }else{
      wrongKeeper();
      incorrectAnswer();
    }
  })};
    //handle Start
//Start Screen lift off application upon clicking
function handleStart(){
  $('.js-start').focus();
  $('.js-start').click(event => {
  $('.js-start-screen').css("display", "none");
  $('#js-quiz-form').css("display", "block");
  redoInputs()})};

handleStart();
