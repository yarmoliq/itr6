let closeNoteCallback   = function () { }
let deleteNoteCallback  = function () { }

let displayNote = document.createElement("div");
displayNote.setAttribute("class", "display-note");
displayNote.setAttribute("id", "display-note");

let toolBar = document.createElement("div");
toolBar.setAttribute("class", "topnav");
toolBar.innerHTML = '<div class="topnav-el fl" onclick="yellow()" >yellow</div>'     +
                    '<div class="topnav-el fl" onclick="pink()"   >pink</div >'      +
                    '<div class="topnav-el fl" onclick="blue()"   >blue</div >'      +
                    '<div class="topnav-el fl" id="view-switch" onclick="switchMarkdown()"   >MD</div >'      +
                    '<div class="topnav-el fr" onclick="closeNote()"      >&times;</div>'    +
                    '<div class="topnav-el fr" onclick="deleteNote()"     >&#128465;</div>';

let noteWindow = document.createElement("div");
noteWindow.setAttribute("class", "display-note-window");

let textArea = document.createElement("textarea");
textArea.setAttribute("class", "display-note-textarea");

let markDown = document.createElement("div");
markDown.style.display = "none";

noteWindow.appendChild(textArea);
noteWindow.appendChild(markDown);
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
    
    hideMarkDown();
    
    currentDisplayingNote["Contents"] = textArea.value;
    currentDisplayingNote["Color"] = textArea.style.backgroundColor;
    closeNoteCallback(currentDisplayingNote);
};

const deleteNote = function () {
    displayNote.style.display = "none";
    deleteNoteCallback(currentDisplayingNote);
}

const converter = new showdown.Converter();

const switchMarkdown = function () {
    let sw = document.getElementById("view-switch");
    if (sw.innerHTML == "Raw") {
        hideMarkDown();        
    }
    else {
        showMarkDown();
    }
}

const showMarkDown = function () {
    let sw = document.getElementById("view-switch");

    sw.innerHTML = "Raw";
    textArea.style.display = "none";

    markDown.innerHTML = converter.makeHtml(textArea.value);
    markDown.style.display = "block";
}

const hideMarkDown = function () {
    let sw = document.getElementById("view-switch");

    sw.innerHTML = "MD";
    textArea.style.display = "block";
    markDown.style.display = "none";
}

const yellow = function () {
    textArea.style.backgroundColor = "rgb(255, 253, 181)";
}

const blue = function () {
    textArea.style.backgroundColor = "rgb(181, 219, 255)";
}

const pink = function () {
    textArea.style.backgroundColor = "rgb(255, 207, 247)";
}