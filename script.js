let currentProfile = '';
let selectedCategory = '';
let problems = [];
let currentIndex = 0;
let userAnswers = [];

function selectProfile(profile) {
  currentProfile = profile;
  document.getElementById('profileSelection').style.display = 'none';
  document.getElementById('categorySelection').style.display = 'block';
  document.getElementById('categoryTitle').innerText = `${profile}, choose a category:`;
}

function selectCategory(category) {
  selectedCategory = category;
  problems = generateProblems(category);
  userAnswers = new Array(10).fill(null);
  currentIndex = 0;
  showTest();
}

function generateProblems(category) {
  let problems = [];
  for (let i = 0; i < 10; i++) {
    if (category === 'basic') {
      let num1 = Math.floor(Math.random() * 100) + 1;
      let num2 = Math.floor(Math.random() * 100) + 1;
      let op = ['+', '-', '*', '/'][Math.floor(Math.random() * 4)];
      if (op === '-') num1 = Math.max(num1, num2); // Ensure non-negative
      if (op === '/') num1 = num2 * (Math.floor(Math.random() * 10) + 1); // Integer division
      let problem = `${num1} ${op} ${num2}`;
      let answer = op === '+' ? num1 + num2 : op === '-' ? num1 - num2 : 
                   op === '*' ? num1 * num2 : num1 / num2;
      problems.push({ problem, answer });
    }
    // Similar logic for fractions, decimals, geometry, word problems
  }
  return problems;
}

function showTest() {
  document.getElementById('categorySelection').style.display = 'none';
  document.getElementById('test').style.display = 'block';
  document.getElementById('testTitle').innerText = `${currentProfile}, solve this problem (Question ${currentIndex + 1} of 10):`;
  document.getElementById('problem').innerText = problems[currentIndex].problem;
  document.getElementById('answerInput').value = '';
}

function appendToAnswer(char) {
  let input = document.getElementById('answerInput');
  if (char === '.' && input.value.includes('.')) return;
  input.value += char;
}

function backspace() {
  let input = document.getElementById('answerInput');
  input.value = input.value.slice(0, -1);
}

function nextQuestion() {
  let answer = document.getElementById('answerInput').value;
  userAnswers[currentIndex] = answer;
  let correct = Math.abs(parseFloat(answer) - problems[currentIndex].answer) < 0.001;
  let feedback = document.getElementById('feedback');
  feedback.innerText = correct ? 'Correct!' : 'Incorrect!';
  feedback.style.color = correct ? 'green' : 'red';
  feedback.style.display = 'block';
  setTimeout(() => {
    feedback.style.display = 'none';
    currentIndex++;
    if (currentIndex < 10) showTest();
    else showResults();
  }, 1000);
}

function showResults() {
  document.getElementById('test').style.display = 'none';
  document.getElementById('results').style.display = 'block';
  let score = 0;
  let details = '';
  problems.forEach((p, i) => {
    let userAns = parseFloat(userAnswers[i]);
    let correct = Math.abs(userAns - p.answer) < 0.001;
    if (correct) score++;
    details += `<p>${p.problem} = ? Your answer: ${userAnswers[i] || 'None'}, Correct answer: ${p.answer} [${correct ? 'Correct' : 'Incorrect'}]</p>`;
  });
  document.getElementById('resultsTitle').innerText = `${currentProfile}, here are your results:`;
  document.getElementById('score').innerText = `You got ${score} out of 10 correct!`;
  document.getElementById('details').innerHTML = details;
}

function tryAgain() {
  problems = generateProblems(selectedCategory);
  userAnswers = new Array(10).fill(null);
  currentIndex = 0;
  document.getElementById('results').style.display = 'none';
  showTest();
}

function chooseAnotherCategory() {
  document.getElementById('results').style.display = 'none';
  document.getElementById('categorySelection').style.display = 'block';
}
