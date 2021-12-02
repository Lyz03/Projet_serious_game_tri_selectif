const waste = document.getElementById('waste');
const trashes = document.querySelectorAll('.trash span');

// Drag and drop event
waste.addEventListener('dragstart', dragStart);
waste.addEventListener("dragend", dragEnd);

for (const index of trashes) {
    index.addEventListener('dragover', dragOver);
    index.addEventListener('drop', drop);
}

// drag and drop function
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