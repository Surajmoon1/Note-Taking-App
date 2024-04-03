const button = document.querySelector('#btn');


const saveNotes = () => {
    const notes = document.querySelectorAll('.text')
    let data = [];
    notes.forEach(
        (note) => {
            data.push(note.value)
        }
    )
    console.log(data)

    if (data.length === 0) {
        localStorage.removeItem('notes')
    } else {
        localStorage.setItem('notes', JSON.stringify(data))
    }
}


const addNote = (text = '') => {
    let note = document.createElement('div')
    note.classList.add('note')
    note.innerHTML = `
     <div class="toolbar">   
         <i class="save fa-solid fa-floppy-disk"></i>
         <i class="delete fa-solid fa-trash-can"></i>
     </div>
     <textarea class="text">${text}</textarea>
    `;

    note.querySelector('.delete').addEventListener('click', () => {
        confirmDelete = confirm('Do you Really wanna Delete ?')
        if (confirmDelete == true) {
            note.remove()
        } 
        saveNotes()

    })

    note.querySelector('.save').addEventListener('click', function () {
        saveNotes()
    })

    note.querySelector('.text').addEventListener("focusout", function () {
        saveNotes()
    })

    document.querySelector('#main').prepend(note)

    saveNotes()
}



(
    function () {
        const lsnote = JSON.parse(localStorage.getItem('notes')) || []

        if (lsnote.length === 0) {
            localStorage.removeItem('notes')
        } else {
            // addNote()
        }

        lsnote.forEach(
            (lsnotes) => {
                addNote(lsnotes)
            }
        )
    }
)()

button.addEventListener('click', function () {
    addNote()
})

addNote()



