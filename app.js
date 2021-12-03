const waste = document.getElementById('waste');
const trashes = document.querySelectorAll('.trash span');

const yellow = [
    "Bouteille plastique",
    "Flacons plastiques",
    "Boîtes en carton",
    "Boîtes de conserve en fer",
    "Barquettes en aluminium",
    "Flacons plastiques"
];

const green = [
    "bouteilles de vin",
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

let currentWaste = [];
let randomSelection = [];
let temporaryYellow;
let temporaryGreen;
let temporaryBlue;
let temporaryBrown;

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
    console.log('drop');
    console.log(e)
}

// quelle couleur tenter e.path[1] === span#yellow

// create a random index
function randomNumber(array) {
    return Math.floor(Math.random() * array.length);
}

// create the random selection of wastes
function selection() {
    temporaryYellow = yellow;
    temporaryYellow.splice(randomNumber(yellow), 1);

    temporaryGreen = green;
    temporaryGreen.splice(randomNumber(green), 1);

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

console.log(randomSelection)