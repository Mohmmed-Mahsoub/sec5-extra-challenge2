var score = 0;
var allQuestions;
var max;
var questionNum;
var num
// A function constructor work as a machine to print whatever question and check the right answer
var Question = function(question, answers, correctAns) {
    this.question = question;
    this.answers = answers;
    this.correctAns = correctAns;
    this.showQuestion = function() {

        //print whatever question
        document.querySelector('.show-questions').innerHTML = '<p>' + question + '</p>';

        //print whatever answer
        for(var i=0; i < answers.length; i++) {
            var ans = document.createElement('p');
            ans.textContent = answers[i];
            document.querySelector('.show-questions').appendChild(ans);
        }
    }

    //check the right answer
    this.checkAnswer = function() {
        
        if(document.querySelector('.show-case input').value == correctAns) {
            score = score + 1;
            document.querySelector('.check').textContent = 'Correct Answer'            
        }else {
            document.querySelector('.check').textContent = 'Wrong Answer' 
        }
        document.querySelector('.score').textContent = 'Your score is: ' + score;
    }
    
}
//store all questions which the admin enter
allQuestions = [];

//when the admin fill the form whith questions and answers and click submit
document.querySelector('.submit').addEventListener('click', function() {

    // preventDefault behiver for the form
    event.preventDefault();

    // creat nwe inctance from the Question function constructor include: the question itself, the answers and the correct answer then pusth it to the allQuestions array
    allQuestions.push(new Question(document.querySelector('.admin .question').value, //the question itself
    [document.querySelector('.answers .answer-1').value,
    document.querySelector('.answers .answer-2').value,
    document.querySelector('.answers .answer-3').value], //the answers
    document.querySelector('.correct-ans').value //the correct answer
    ));

    //then make the inputs empty to fill it again
    document.querySelector('.admin .question').value = document.querySelector('.answers .answer-1').value = document.querySelector('.answers .answer-2').value = document.querySelector('.answers .answer-3').value = document.querySelector('.correct-ans').value = '';
    
});

//go to show the questions and start the game
document.querySelector('.start').addEventListener('click', function() {
    document.querySelector('.show-case').classList.toggle('hide');
    document.querySelector('.admin').classList.toggle('hide');
    document.querySelector('.show-questions').classList.remove('hide');
    document.querySelector('.show-case form').classList.remove('hide');

    //return score to zero
    score = 0;
    document.querySelector('.score').textContent = 'Your score is: ' + score;

    //return check answer to empty
    document.querySelector('.check').textContent = '';
    
    // generate random numbers without repetition
    max = allQuestions.length;
    questionNum = [];
    for (var i = 0; i <max; i ++) {
        var temp = Math.floor (Math.random () * max);

        //if it is not present
        if (questionNum.indexOf (temp) == -1) {
            questionNum.push (temp);

        //to continue looping until filling the array with different numbers only
        } else i--; 
    }

    // Call showQuestion function on first random questions
    num = 0;
    allQuestions[questionNum[num]].showQuestion();

    

});

//back to add more questions
document.querySelector('.back').addEventListener('click', function() {
    document.querySelector('.show-case').classList.toggle('hide');
    document.querySelector('.admin').classList.toggle('hide');
});

// Waiting for the answer number from the user then check if it's correct
document.querySelector('.show-case form').addEventListener('submit', function() {

    // preventDefault behiver for the form
    event.preventDefault();
    
    //check the right answer
    allQuestions[questionNum[num]].checkAnswer();

    //make the input empty after the user submits his answer
    document.querySelector('.show-case input').value = '';

    //check if the questions are finished
    if(num < max -1) {
        
        // go to the next random question
        num++;

        // Call showQuestion function for this next randon question
        allQuestions[questionNum[num]].showQuestion();
    
    //finish the test if there aren't more questions
    } else {
        document.querySelector('.show-questions').classList.add('hide');
        document.querySelector('.show-case form').classList.add('hide');
    }
    
});

