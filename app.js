const waste = document.getElementById('waste');
const trashes = document.querySelectorAll('.trash span');
const scoreSpan = document.getElementById('score');
const goodGuessesP = document.getElementById('good_guesses');
const wrongGuessesP = document.getElementById('wrong-guesses');
const trueFalseP = document.getElementById('true_false');
const informations = document.getElementById('informations');

const yellow = [
    "Bouteille plastique",
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

let currentWasteDropped;
let randomSelection;
let temporaryYellow;
let temporaryGreen;
let temporaryBlue;
let temporaryBrown;
let isDropped = - 0;
let points = 0;
let wrongGuesses = [];
let goodGuesses = [];

document.getElementById('get_info').addEventListener('click', function () {
    informations.style.display = 'block';
});

document.getElementById('hide_information').addEventListener("click", function () {
    informations.style.display = 'none';
});

scoreSpan.innerText = points.toString();

// Drag and drop event
waste.addEventListener('dragstart', dragStart);
waste.addEventListener("dragend", dragEnd);

for (const index of trashes) {
    index.addEventListener('dragover', dragOver);
    index.addEventListener('drop', drop);
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
    currentWasteDropped = e.path[1].id
    isGoodTrash()
    if (isDropped === 10){
        trueFalseP.innerText = 'Fini !'
        setTimeout(function () {
            document.getElementById('game').style.display = 'none';
            document.getElementById('result').style.display = 'block';
        }, 1200);

        printAnswers();
    }
}

// quelle couleur tenter e.path[1] === span#yellow

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

randomSelection = selection();
randomSelection = shuffleArray(randomSelection);
waste.innerText = randomSelection[0];
let currentWaste = waste.innerText;

//print the waste (one by one)
function printWaste() {
    if (isDropped !== 10) {
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

// give the answer if it's a wrong guess
function printAnswers() {
    if (goodGuesses.length === 0) {
        goodGuessesP.style.display = 'none';
    } else if (wrongGuesses.length === 0) {
        wrongGuessesP.style.display = 'none';
    }
    goodGuesses.forEach(function (value) {
        goodGuessesP.innerText += ` ${value}, `;
    });
    wrongGuesses.forEach(function (value) {
       wrongGuessesP.innerText += ` ${value}, `;
    });
}