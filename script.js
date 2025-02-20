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
    const problems = [];
    for (let i = 0; i < 10; i++) {
        let problem, answer;
       if (category === 'basic') {
            const operations = ['+', '-', '*', '/'];
            const operation = operations[Math.floor(Math.random() * 4)];
            if (operation === '+') {
                const num1 = Math.floor(Math.random() * 100) + 1; // 1 to 100
                const num2 = Math.floor(Math.random() * 100) + 1; // 1 to 100
                problem = `What is ${num1} + ${num2}?`;
                answer = num1 + num2; // Integer result
            } else if (operation === '-') {
                const num1 = Math.floor(Math.random() * 100) + 1; // 1 to 100
                const num2 = Math.floor(Math.random() * num1) + 1; // 1 to num1
                problem = `What is ${num1} - ${num2}?`;
                answer = num1 - num2; // Integer result (non-negative)
            } else if (operation === '*') {
                const num1 = Math.floor(Math.random() * 12) + 1; // 1 to 12
                const num2 = Math.floor(Math.random() * 12) + 1; // 1 to 12
                problem = `What is ${num1} * ${num2}?`;
                answer = num1 * num2; // Integer result
            } else if (operation === '/') {
                const divisor = Math.floor(Math.random() * 12) + 1; // 1 to 12
                const multiple = Math.floor(Math.random() * 10) + 1; // 1 to 10
                const dividend = divisor * multiple; // Ensures exact division
                problem = `What is ${dividend} / ${divisor}?`;
                answer = multiple; // Integer result
            }
        } else if (category === 'fractions') {
            const type = Math.random() < 0.5 ? 'of_number' : 'to_decimal';
            if (type === 'of_number') {
                const denominator = Math.floor(Math.random() * 4) + 2; // 2 to 5
                const numerator = Math.floor(Math.random() * (denominator - 1)) + 1; // 1 to (denominator-1)
                const k = Math.floor(Math.random() * 10) + 1; // 1 to 10
                const number = k * denominator; // Ensures integer answer
                problem = `What is ${numerator}/${denominator} of ${number}?`;
                answer = numerator * k; // Integer result
            } else { // to_decimal
                const fractions = [
                    { frac: '1/2', dec: 0.5 },
                    { frac: '1/4', dec: 0.25 },
                    { frac: '3/4', dec: 0.75 },
                    { frac: '1/5', dec: 0.2 },
                    { frac: '2/5', dec: 0.4 },
                    { frac: '3/5', dec: 0.6 },
                    { frac: '4/5', dec: 0.8 }
                ];
                const selected = fractions[Math.floor(Math.random() * fractions.length)];
                problem = `What is ${selected.frac} as a decimal?`;
                answer = selected.dec; // Decimal result
            }
        } else if (category === 'decimals') {
            const operations = ['+', '-', '*', '/'];
            const operation = operations[Math.floor(Math.random() * 4)];
            if (operation === '/') {
                const divisor = (Math.floor(Math.random() * 99) + 1) / 10; // 0.1 to 9.9
                const multiple = Math.floor(Math.random() * 10) + 1; // 1 to 10
                const dividend = divisor * multiple; // Ensures exact division
                problem = `${dividend.toFixed(1)} / ${divisor.toFixed(1)}`;
                answer = multiple; // Integer result
            } else {
                let num1 = (Math.floor(Math.random() * 99) + 1) / 10; // 0.1 to 9.9
                let num2 = (Math.floor(Math.random() * 99) + 1) / 10; // 0.1 to 9.9
                if (operation === '-') {
                    while (num1 < num2) { // Prevent negative answers
                        num1 = (Math.floor(Math.random() * 99) + 1) / 10;
                        num2 = (Math.floor(Math.random() * 99) + 1) / 10;
                    }
                }
                problem = `${num1.toFixed(1)} ${operation} ${num2.toFixed(1)}`;
                if (operation === '+') answer = num1 + num2;
                else if (operation === '-') answer = num1 - num2;
                else if (operation === '*') answer = num1 * num2;
            }
        } else if (category === 'geometry') {
            const shapes = ['rectangle', 'square'];
            const shape = shapes[Math.floor(Math.random() * 2)];
            if (shape === 'rectangle') {
                const length = Math.floor(Math.random() * 10) + 1; // 1 to 10
                const width = Math.floor(Math.random() * 10) + 1; // 1 to 10
                const questionType = Math.random() < 0.5 ? 'area' : 'perimeter';
                if (questionType === 'area') {
                    problem = `What is the area of a rectangle with length ${length} and width ${width}?`;
                    answer = length * width; // Integer result
                } else {
                    problem = `What is the perimeter of a rectangle with length ${length} and width ${width}?`;
                    answer = 2 * (length + width); // Integer result
                }
            } else { // square
                const side = Math.floor(Math.random() * 10) + 1; // 1 to 10
                const questionType = Math.random() < 0.5 ? 'area' : 'perimeter';
                if (questionType === 'area') {
                    problem = `What is the area of a square with side ${side}?`;
                    answer = side * side; // Integer result
                } else {
                    problem = `What is the perimeter of a square with side ${side}?`;
                    answer = 4 * side; // Integer result
                }
            }
        } else if (category === 'word') {
            const generators = [
                () => {
                    const num1 = Math.floor(Math.random() * 20) + 1; // 1 to 20
                    const num2 = Math.floor(Math.random() * 20) + 1; // 1 to 20
                    problem = `You have ${num1} apples and buy ${num2} more. How many do you have now?`;
                    answer = num1 + num2; // Integer result
                    return { problem, answer };
                },
                () => {
                    const num1 = Math.floor(Math.random() * 20) + 1; // 1 to 20
                    const num2 = Math.floor(Math.random() * num1) + 1; // 1 to num1
                    problem = `You have ${num1} candies and eat ${num2}. How many are left?`;
                    answer = num1 - num2; // Integer result
                    return { problem, answer };
                },
                () => {
                    const num1 = Math.floor(Math.random() * 10) + 1; // 1 to 10
                    const num2 = Math.floor(Math.random() * 10) + 1; // 1 to 10
                    problem = `Each book costs $${num1}. How much do ${num2} books cost?`;
                    answer = num1 * num2; // Integer result
                    return { problem, answer };
                },
                () => {
                    const divisor = Math.floor(Math.random() * 9) + 2; // 2 to 10
                    const multiple = Math.floor(Math.random() * 10) + 1; // 1 to 10
                    const num1 = divisor * multiple; // Ensures exact division
                    problem = `You have ${num1} stickers and want to share them equally among ${divisor} friends. How many does each friend get?`;
                    answer = multiple; // Integer result
                    return { problem, answer };
                },
                () => {
                    const num1 = Math.floor(Math.random() * 5) + 1; // 1 to 5
                    const price = (Math.floor(Math.random() * 151) + 50) / 100; // 0.50 to 2.00
                    problem = `You buy ${num1} apples at $${price.toFixed(2)} each. How much do you spend?`;
                    answer = num1 * price; // Decimal result
                    return { problem, answer };
                }
            ];
            const generator = generators[Math.floor(Math.random() * generators.length)];
            ({ problem, answer } = generator());
        }
        
        problems.push({ problem, answer });
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
