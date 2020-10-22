let mousePosition;
let offset = [0, 0];
let isDown = false;
let target;

document.addEventListener('dblclick', function (event) {
    if (event.target.getAttribute("class") == "floating-note") {
        const noteId = event.target.id.split("-")[2]; // see: floating note id
        connection.invoke("GetNote", noteId).then( (data) => {
            let note = JSON.parse(data);
            showNote(note);
        });
    }
    else if (event.target.tagName == "HTML") {
        connection.invoke("CreateNote");
    }
});

document.addEventListener('mousedown',
    function (event) {
        if (event.target.getAttribute("class") == "floating-note") {
            target = event.target;
            isDown = true;
            offset = [
                target.offsetLeft - event.pageX,
                target.offsetTop - event.pageY
            ];
        }
    }
);

document.addEventListener('mouseup', function () {
    isDown = false;
});

document.addEventListener('mousemove', function (event) {
    if (isDown) {
        event.preventDefault();

        target.style.left = (event.pageX + offset[0]) + 'px';
        target.style.top  = (event.pageY + offset[1]) + 'px';
    }
});


// ----------------------------------------------------------------


deleteNoteCallback = function (note) {
    connection.invoke("DeleteNote", JSON.stringify(note));
};

closeNoteCallback = function (note) {
    let floatingNote = document.getElementById("floating-note-" + note["ID"]);

    note["posX"]   = parseInt(floatingNote.style.left.  replace('px', ''));
    note["posY"]   = parseInt(floatingNote.style.top.   replace('px', ''));
    note["width"]  = parseInt(floatingNote.style.width. replace('px', ''));
    note["height"] = parseInt(floatingNote.style.height.replace('px', ''));

    connection.invoke("ChangeNote", JSON.stringify(note));
}

// ----------------------------------------------------------------


const createFloatingNote = function (note) {
    let newNote = document.createElement("textarea");
    newNote.setAttribute("class", "floating-note");
    newNote.value = (note["Contents"] || "");
    newNote.style.left   =  note["posX"]   + 'px';
    newNote.style.top    =  note["posY"]   + 'px';
    newNote.style.width  =  note["width"]  + 'px';
    newNote.style.height =  note["height"] + 'px';
    newNote.style.backgroundColor = note["Color"];
    newNote.disabled = true;
    newNote.setAttribute("id", "floating-note-" + note["ID"]);

    document.body.appendChild(newNote);
};