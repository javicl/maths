let currentProfile = '';
let selectedCategory = '';
let problems = [];
let currentIndex = 0;
let userAnswers = [];
function generateAdditionProblem():
    num1 = random.randint(1, 20)
    num2 = random.randint(1, 20)
    problem = "You have {num1} apples and buy {num2} more. How many do you have now?"
    answer = num1 + num2
    return {problem: problem, answer: answer}

function generateSubtractionProblem():
    num1 = random.randint(1, 20)
    num2 = random.randint(1, num1)
    problem = "You have {num1} candies and eat {num2}. How many are left?"
    answer = num1 - num2
    return {problem: problem, answer: answer}

function generateMultiplicationProblem():
    num1 = random.randint(1, 10)
    num2 = random.randint(1, 10)
    problem = "Each book costs ${num1}. How much do {num2} books cost?"
    answer = num1 * num2
    return {problem: problem, answer: answer}

function generateDivisionProblem():
    divisor = random.randint(1, 10)
    multiple = random.randint(1, 10)
    num1 = divisor * multiple
    problem = "You have {num1} stickers and want to share them equally among {divisor} friends. How many does each friend get?"
    answer = multiple
    return {problem: problem, answer: answer}

function generateMoneyProblem():
    num1 = random.randint(1, 5)
    price = round(random.uniform(0.5, 2.0), 2)
    problem = "You buy {num1} apples at ${price} each. How much do you spend?"
    answer = num1 * price
    return {problem: problem, answer: answer}
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
    if category == 'fractions':
    for i in 1 to 10:
        type = random.choice(['of_number', 'to_decimal'])
        if type == 'of_number':
            numerator = random.randint(1, 5)
            denominator = random.randint(2, 5)
            number = random.randint(1, 20) * denominator  // ensure divisible
            problem = "What is {numerator}/{denominator} of {number}?"
            answer = (numerator / denominator) * number
        else:  // to_decimal
            fractions = [
                ('1/2', 0.5), ('1/4', 0.25), ('3/4', 0.75),
                ('1/5', 0.2), ('2/5', 0.4), ('3/5', 0.6), ('4/5', 0.8)
            ]
            fraction, decimal = random.choice(fractions)
            problem = "What is {fraction} as a decimal?"
            answer = decimal
        problems.append({problem: problem, answer: answer})
    if category == 'decimals':
    operations = ['+', '-', '*', '/']
    for i in 1 to 10:
        operation = random.choice(operations)
        if operation == '/':
            divisor = round(random.uniform(0.1, 10.0), 1)
            multiple = random.randint(1, 10)
            dividend = round(divisor * multiple, 1)
            problem = "{dividend} / {divisor}"
            answer = multiple
        else:
            num1 = round(random.uniform(0.1, 10.0), 1)
            num2 = round(random.uniform(0.1, 10.0), 1)
            if operation == '-':
                while num1 < num2:
                    num1 = round(random.uniform(0.1, 10.0), 1)
                    num2 = round(random.uniform(0.1, 10.0), 1)
            problem = "{num1} {operation} {num2}"
            if operation == '+':
                answer = num1 + num2
            elif operation == '-':
                answer = num1 - num2
            elif operation == '*':
                answer = num1 * num2
        problems.append({problem: problem, answer: answer})
    if category == 'geometry':
    shapes = ['rectangle', 'square']
    for i in 1 to 10:
        shape = random.choice(shapes)
        if shape == 'rectangle':
            length = random.randint(1, 10)
            width = random.randint(1, 10)
            question_type = random.choice(['area', 'perimeter'])
            if question_type == 'area':
                problem = "What is the area of a rectangle with length {length} and width {width}?"
                answer = length * width
            else:
                problem = "What is the perimeter of a rectangle with length {length} and width {width}?"
                answer = 2 * (length + width)
        else:  // square
            side = random.randint(1, 10)
            question_type = random.choice(['area', 'perimeter'])
            if question_type == 'area':
                problem = "What is the area of a square with side {side}?"
                answer = side * side
            else:
                problem = "What is the perimeter of a square with side {side}?"
                answer = 4 * side
        problems.append({problem: problem, answer: answer})

  if category == 'word':
    problemTypes = [generateAdditionProblem, generateSubtractionProblem, generateMultiplicationProblem, generateDivisionProblem, generateMoneyProblem]
    for i in 1 to 10:
        generator = random.choice(problemTypes)
        problem, answer = generator()
        problems.append({problem: problem, answer: answer})
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
