const yellow = [
    "Bouteilles plastiques",
    "Flacons plastiques",
    "Boites en carton",
    "Boites de conserve en fer",
    "Barquettes en aluminium",
    "Cannettes"
];

const green = [
    "Bouteilles de vin",
    "Bouteilles en verre",
    "Pots de confiture",
    "Bocaux de conserve"
];

const blue = [
    "Journaux",
    "Magazines"
];

const brown = [
    "Restes de repas",
    "Pots de yaourts"
];

const waste = document.getElementById('waste');
const trashes = document.querySelectorAll('.trash span');
const scoreSpan = document.getElementById('score');
const goodGuessesSpan = document.querySelector('#good_guesses span');
const wrongGuessesSpan = document.querySelector('#wrong-guesses span');
const trueFalseP = document.getElementById('true_false');
const informations = document.getElementById('informations');

let currentWasteDropped;
let randomSelection;
let temporaryYellow;
let temporaryGreen;
let temporaryBlue;
let temporaryBrown;
let isDropped = 0;
let points = 0;
let wrongGuesses = [];
let goodGuesses = [];
let currentWaste;

// Checks if the touch is used
isTouch = !!("ontouchstart" in window || navigator.msMaxTouchPoints);

document.getElementById('get_info').addEventListener('click', function () {
    informations.style.display = 'block';
});

document.getElementById('hide_information').addEventListener("click", function () {
    informations.style.display = 'none';
});

scoreSpan.innerText = points.toString();

function runGame() {
    if (isTouch) {
        // add a click event on each trashes
        for (const index of trashes) {
            index.addEventListener('click', clickForTouch)
        }

    } else {
        // Drag and drop event
        waste.addEventListener('dragstart', dragStart);
        waste.addEventListener("dragend", dragEnd);

        for (const index of trashes) {
            index.addEventListener('dragover', dragOver);
            index.addEventListener('drop', drop);
        }
    }
}
runGame();

// click function for tough devices
function clickForTouch() {
    isDropped++;
    printWaste();
    currentWasteDropped = this.id;
    isGoodTrash();
    gameEnd();
}

// drag and drop functions
function dragOver(e) {
    e.preventDefault();
}

function dragStart() {
    this.classList.add('grabbed');
}

function dragEnd() {
    this.classList.remove('grabbed');
}

function drop(e) {
    isDropped++;
    printWaste();
    currentWasteDropped = e.path[1].id;
    isGoodTrash();
    gameEnd();
}

// end game
function gameEnd() {
    if (isDropped >= 10){
        trueFalseP.innerText = 'Fini !'
        setTimeout(function () {
            document.getElementById('game').style.display = 'none';
            document.getElementById('result').style.display = 'flex';
        }, 1200);

        printAnswers();
    }
}

// create a random index
function randomNumber(array) {
    return Math.floor(Math.random() * array.length);
}

// create the random selection of wastes
function selection() {
    temporaryYellow = Array.from(yellow);
    temporaryYellow.splice(randomNumber(temporaryYellow), 1);

    temporaryGreen = Array.from(green);
    temporaryGreen.splice(randomNumber(temporaryGreen), 1);

    temporaryBlue = [blue[randomNumber(blue)]];
    temporaryBrown = [brown[randomNumber(brown)]];

    return temporaryYellow.concat(temporaryGreen, temporaryBlue, temporaryBrown)
}

//shuffle array
function shuffleArray(array){
    return array.sort(()=> Math.random() - 0.5);
}

// pick a waste
function setWaste() {
    randomSelection = selection();
    randomSelection = shuffleArray(randomSelection);
    waste.innerText = randomSelection[0];
    currentWaste = waste.innerText;
}
setWaste();

//print the waste (one by one)
function printWaste() {
    if (isDropped < 10) {
        waste.innerText = randomSelection[isDropped]
    } else {
        waste.innerText = '';
    }
}

// Chek if it was the good trash
function isGoodTrash () {
    trashColor('yellow', yellow);
    trashColor('green', green);
    trashColor('blue', blue);
    trashColor('brown', brown);
}

// base for isGoodTrash
function trashColor(color, array) {
    if (currentWasteDropped === color) {
        if (array.includes(currentWaste)) {
            points++;
            scoreSpan.innerText = points.toString();
            goodGuesses.push(currentWaste);
            trueFalseP.innerText = 'Vrai';
        } else {
            wrongGuesses.push(currentWaste);
            trueFalseP.innerText = 'Faux';
        }
        currentWaste = waste.innerText;
    }
}

// print good and wrong answers
function printAnswers() {
    goodGuesses.forEach(function (value) {
        goodGuessesSpan.innerHTML += value + "<br>";
    });
    wrongGuesses.forEach(function (value) {
        // where was it supposed to go
        if (yellow.includes(value)) {
            wrongGuessesSpan.innerHTML +=  value + " vas dans la poubelle jaune <br>";
        } else if (green.includes(value)) {
            wrongGuessesSpan.innerHTML +=  value + " vas dans la poubelle verte <br>";
        } else if (blue.includes(value)) {
            wrongGuessesSpan.innerHTML +=  value + " vas dans la poubelle bleu <br>";
        } else {
            wrongGuessesSpan.innerHTML +=  value + " vas dans la poubelle marron <br>";
        }
    });
}

function resetGame() {
    currentWasteDropped = '';
    randomSelection = [];
    temporaryYellow = [];
    temporaryGreen = [];
    temporaryBlue = [];
    temporaryBrown = [];
    isDropped = 0;
    points = 0;
    wrongGuesses = [];
    goodGuesses = [];
    wrongGuessesSpan.innerText = '';
    goodGuessesSpan.innerText = '';
    scoreSpan.innerText = points.toString();
    trueFalseP.innerText = "Faites glisser les déchets dans la bonne poubelle, sur mobile cliquer sur la poubelle";
    document.getElementById('game').style.display = 'block';
    document.getElementById('result').style.display = 'none';
    runGame();
    setWaste();
}

document.getElementById('reset').addEventListener('click', resetGame);