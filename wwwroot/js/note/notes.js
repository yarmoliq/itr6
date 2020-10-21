let closeNoteCallBack = function (noteId) { }
let deleteNoteCallBack = function (noteId) { }

const createNote = function (noteId, contents, callBack) {
    noteId = "note" + noteId;
    
    let newNote = document.createElement("div");
    newNote.setAttribute("class", "display-note");
    newNote.setAttribute("id", noteId);
    
    let noteContent = document.createElement("div");
    noteContent.setAttribute("class", "display-note-content");
    
    let closeButton = document.createElement("div");
    closeButton.innerHTML = "&times;";
    closeButton.setAttribute("class", "display-close-note");
    closeButton.setAttribute("id", "close-" + noteId);
    closeButton.setAttribute("onclick", "closeNote(this.id)");
    noteContent.appendChild(closeButton);

    let trashButton = document.createElement("div");
    trashButton.innerHTML = "&#128465;"
    trashButton.setAttribute("class", "display-trash-note");
    trashButton.setAttribute("id", "trash-" + noteId);
    trashButton.setAttribute("onclick", "deleteNote(this.id)");
    noteContent.appendChild(trashButton);
    
    let textArea = document.createElement("textarea");
    textArea.setAttribute("class", "display-opened-note");
    textArea.setAttribute("id", "display-opened-note-" + noteId);
    textArea.value = contents;
    noteContent.appendChild(textArea);

    newNote.appendChild(noteContent);

    document.body.appendChild(newNote);

    callBack(newNote);
};

const showNote = function (noteId) {
    let note = document.getElementById(noteId);
    note.style.display = "block";
};

const closeNote = function (buttonId) {
    const noteId = buttonId.split("-")[1];
    let note = document.getElementById(noteId);
    note.style.display = "none";

    closeNoteCallBack(noteId);
};

const deleteNote = function (buttonId) {
    const noteId = buttonId.split("-")[1];
    let note = document.getElementById(noteId);
    note.parentNode.removeChild(note);

    deleteNoteCallBack(noteId);
}