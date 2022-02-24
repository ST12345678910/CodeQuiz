  //starts off with question 0, score at 0, and timer with 30 seconds
  
  curQues = 0
  var score = 0
  var timer = 30

// pulls questions from other doc, then replaces the Question and Answer blanks

function showQues() {
  document.getElementById("qd").innerHTML = `
<p
>
  ${questions[curQues].question}
</p>
`
  document.getElementById('od').innerHTML = `
  <p
    class="option"
    data-option='${questions[curQues].options[0]}'
    data-answer='${questions[curQues].answer}'
  >
    ${questions[curQues].options[0]}
  </p>
  <p
    class="option"
    data-option='${questions[curQues].options[1]}'
    data-answer='${questions[curQues].answer}'
  >
    ${questions[curQues].options[1]}
  </p>
  `
}

// take value from statement then uses it to fill in score

function displayScore() {
  document.getElementById("score").innerHTML = `
Score: ${score}
  `
}

// turns questions/answers to blank, and shows the initials box and scores

function quizCompleted() {
  displayScore()
  clearInterval(clearTimer)
  console.log('Quiz Completed!')
  document.getElementById('qd').innerHTML = ''
  document.getElementById('od').innerHTML = ''
  document.getElementById('initials').classList.remove('hidden')
  document.getElementById('scores').classList.remove('hidden')
}

//stringifies the users score and adds it to local storage plus console log, the users score is taken from the completion of the quiz, and the initials are entered

document.getElementById('submit').addEventListener('click', function (event) {
    var highScore = {
      time: timer,
      initials: document.getElementById('highScore').value
    }
    console.log(highScore)
    if (localStorage.getItem('score')) {
      var scores = JSON.parse(localStorage.getItem('score'))
      scores.push(highScore)
      localStorage.setItem('score', JSON.stringify(scores))
    } else {
      var scores = []
      scores.push(highScore)
      localStorage.setItem('score', JSON.stringify(scores))
    }
    var scores = JSON.parse(localStorage.getItem("score"))
    scores.forEach(function (score) {
        document.getElementById('scores').innerHTML += `
${score.initials}
${score.time}
<hr></hr>
    `
      })
  })

// if the option is correct, then it is console logged, and the score and next question are shown, if the answer is wrong then 10 seconds are subtracted from the timer and Incorrect will appear in the console

document.addEventListener("click", function (event) {
    if (event.target.classList.contains("option")) {
      if (event.target.dataset.option == event.target.dataset.answer) {
        console.log("Correct!")
        score += 1
        curQues += 1
        if (curQues == questions.length) {
          quizCompleted()
        } else {
          displayScore()
          showQues()
        }
      } else {
        console.log("Incorrect")
        timer -= 10
      }
    }
  })

//starts the timer, then when the times runs out, the statemetn NO MORE TIME is shown and nothing else

function timerFunction() {
  timer -= 1
  document.getElementById('timer').innerHTML = `
  Time: ${timer}
  `
  if (timer < 0) {
    document.getElementById('everything').innerHTML = `
<h1> NO MORE TIME </h1>
`
  }
}

// remove start button when it is pressed, show questions. clears all but reset button

  var clearTimer
document.getElementById("start").addEventListener('click', function (event) {
    document.getElementById('start').classList.add('hidden')
    document.getElementById('qo').classList.remove("hidden")
    displayScore()
    clearTimer = setInterval(timerFunction, 1000)
    showQues()
  document.getElementById('seeScores').classList.add('hidden')
  document.getElementById('scores').classList.add('hidden')
  document.getElementById('resetPage').classList.remove("hidden")
  })

// takes values from local storage and displays them for the user when they press the "see score" button

document.getElementById('seeScores').addEventListener('click', function (event) {
  var highScore = {
    time: timer,
    initials: document.getElementById('highScore').value
  }
  console.log(highScore)
  if (localStorage.getItem('score')) {
    var scores = JSON.parse(localStorage.getItem('score'))
    scores.push(highScore)
    localStorage.setItem('score', JSON.stringify(scores))
  } else {
    var scores = []
    scores.push(highScore)
    localStorage.setItem('score', JSON.stringify(scores))
  }
  var scores = JSON.parse(localStorage.getItem("score"))
  scores.forEach(function (score) {
    document.getElementById('scores').innerHTML += `
${score.initials}
${score.time}
<hr></hr>
    `
  })
})

// reloads the whole page when the reset button is pressed

function resetPage() {
  window.location.reload();
} 