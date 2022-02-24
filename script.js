  curQues = 0
  var score = 0
  var timer = 30

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

function displayScore() {
  document.getElementById("score").innerHTML = `
Score: ${score}
  `
}

function quizCompleted() {
  displayScore()
  clearInterval(clearTimer)
  console.log('Quiz Completed!')
  document.getElementById('qd').innerHTML = ''
  document.getElementById('od').innerHTML = ''
  document.getElementById('initials').classList.remove('hidden')
  document.getElementById('scores').classList.remove('hidden')
}

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

function resetPage() {
  window.location.reload();
} 