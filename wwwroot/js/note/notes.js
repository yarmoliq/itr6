let yellowCallback      = function () { }
let pinkCallback        = function () { }
let blueCallback        = function () { }
let closeNoteCallback   = function () { }
let deleteNoteCallback  = function () { }

let displayNote = document.createElement("div");
displayNote.setAttribute("class", "display-note");
displayNote.setAttribute("id", "display-note");

let toolBar = document.createElement("div");
toolBar.setAttribute("class", "topnav");
toolBar.innerHTML = '<div class="topnav-el fl" onclick="yellowCallback()" >yellow</div>'     +
                    '<div class="topnav-el fl" onclick="pinkCallback()"   >pink</div >'      +
                    '<div class="topnav-el fl" onclick="blueCallback()"   >blue</div >'      +
                    '<div class="topnav-el fl" id="view-switch" onclick="switchView()"   >Raw</div >'      +
                    '<div class="topnav-el fr" onclick="closeNote()"      >&times;</div>'    +
                    '<div class="topnav-el fr" onclick="deleteNote()"     >&#128465;</div>';

let noteWindow = document.createElement("div");
noteWindow.setAttribute("class", "display-note-window");

let textArea = document.createElement("textarea");
textArea.setAttribute("class", "display-note-textarea");

noteWindow.appendChild(textArea);
displayNote.appendChild(toolBar);
displayNote.appendChild(noteWindow);
document.body.appendChild(displayNote);

let currentDisplayingNote;

const showNote = function (note) {
    displayNote.style.display = "block";
    textArea.value = note["Contents"];
    textArea.style.backgroundColor = note["Color"];
    currentDisplayingNote = note;
};

const closeNote = function () {
    displayNote.style.display = "none";
    currentDisplayingNote["Contents"] = textArea.value;
    currentDisplayingNote["Color"] = textArea.style.backgroundColor;
    closeNoteCallback(currentDisplayingNote);
};

const deleteNote = function () {
    displayNote.style.display = "none";
    deleteNoteCallback(currentDisplayingNote);
}

const switchView = function () {
    let sw = document.getElementById("view-switch");
    sw.innerHTML = (sw.innerHTML == "Raw") ? "MD" : "Raw";
}