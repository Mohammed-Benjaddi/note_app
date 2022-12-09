let notesList = document.querySelector('.notes-list')
let addNoteBtn = document.querySelector('.add-note')
let saveNoteBtn = document.querySelector('.save-note')
// let removeNoteBtn = document.querySelector('.remove-note')
let main = document.querySelector('.main')
let arrNotes = []
let notesItems = []
let allIds = new Set();
let currentNoteId;


checker()
// window.localStorage.getItem()

function checker() {

    if (window.localStorage.getItem('savedNotes').length > 0) {
        // let savedNotes = JSON.parse(window.localStorage.getItem('savedNotes'));
        
        // for (let i = 0; i < main.childNodes.length; i++) {
        //     main.removeChild(main.childNodes[i])
        // }


        console.log('yes it is');

        // savedNotes.forEach(function (note) {
        //     notesList.appendChild(createNote(note))
        // })
    }

    if (notesList.children.length === 0) {

        for (let i = 0; i < main.childNodes.length; i++) {
            main.removeChild(main.childNodes[i])
        }

        let paragraph = document.createElement('h3')
        paragraph.textContent = 'There is no notes'
        paragraph.style.cssText = 'display: flex; justify-content: center; align-items: center; height: 100%;'

        main.appendChild(paragraph)
    } else {
        notesItems = notesList.childNodes

        notesItems.forEach(note => {
            note.addEventListener('click', () => {
                notesItems.forEach(prevNote => {
                    prevNote.className = ''
                })
                note.classList.add('active')
                currentNoteId = note.id

                let titleArea = document.querySelector('.title-area')
                let textArea = document.querySelector('.text-area')

                for (let i = 0; i < arrNotes.length; i++) {
                    if (arrNotes[i].id === note.id) {
                        titleArea.value = arrNotes[i].title
                        textArea.value = arrNotes[i].value
                    }
                }
            })
        });
    }
}

function generateId() {
    let randomNumber = Math.floor(Math.random() * 100)
    
    while (allIds.has(randomNumber)) {
        randomNumber = Math.floor(Math.random() * 100)
    }
    allIds.add(randomNumber)
    return randomNumber
}

addNoteBtn.onclick = () => {
    let note = document.createElement('li')
    let title = document.createElement('h4')
    let someContent = document.createElement('p')
    let icon = document.createElement('i')
    let titleArea,
        textArea

    
    if (notesList.children.length === 0) {
        for (let i = 0; i < main.childNodes.length; i++) {
            main.removeChild(main.childNodes[i])
        }

        titleArea = document.createElement('textarea')
        textArea = document.createElement('textarea')

        titleArea.placeholder = 'Title'
        textArea.placeholder = 'Write Your Note Here'

        titleArea.className = 'title-area'
        textArea.className = 'text-area'

        titleArea.id = 'title-area'
        textArea.id = 'text-area'

        main.appendChild(titleArea)
        main.appendChild(textArea)
    }


    title.className = 'title'
    someContent.className = 'some-content'
    icon.className = 'fas fa-trash remove-btn'

    note.id = `${generateId()}`
    icon.id = `${generateId()}`


    // note.onclick = selectNote(note.id)
    icon.onclick = removeNote


    title.textContent = 'Title undefined'
    someContent.textContent = ''
    
    let noteObj = {
        title: title.textContent,
        value: '',
        someContent: someContent.textContent,
        id: note.id
    }

    note.appendChild(title)
    note.appendChild(someContent)
    note.appendChild(icon)

    notesList.appendChild(note)
    arrNotes.push(noteObj)
    // console.log(arrNotes);

    // console.log('notes items', notesItems);
    
    checker()
}

function removeNote(event) {
    let parentElement = event.target.parentElement
    let newNotes = []
    let notesList = document.querySelector('.notes-list')
    for (let i = 1; i < notesList.childNodes.length; i++) {
        if (notesList.childNodes[i].id !== parentElement.id) {
            newNotes.push(notesList.childNodes[i])
        }
    }

    notesList.remove()
    console.log(newNotes);

    let newNotesList = document.createElement('ul')
    newNotesList.className = 'notes-list'

    for (let i = 0; i < newNotes.length; i++) {
        newNotesList.appendChild(newNotes[i])
    }

    document.querySelector('.side-menu').appendChild(newNotesList)


    // console.log('new notes : ', newNotes);
    // console.log('notes list : ', notesList.children);

    // while (notesList.firstChild) {
    //     notesList.removeChild(notesList.firstChild)
    // }

    // for (let i = 0; i < newNotes.length; i++) {
    //     notesList.appendChild(newNotes[i])
    // }

}

saveNoteBtn.addEventListener('click', () => {
    let titleArea = document.querySelector('.title-area'),
        textArea = document.querySelector('.text-area')

    let title = document.querySelector('li.active .title'),
        someContent = document.querySelector('li.active .some-content')

    for (let i = 0; i < arrNotes.length; i++) {
        if (arrNotes[i].id === currentNoteId) {
            arrNotes[i].title = titleArea.value
            arrNotes[i].value = textArea.value
        }
    }

    let someContentValue = textArea.value === '' ? '' : textArea.value.split('\n')[0]
    
    if (someContentValue.length > 20) {
        someContentValue = someContentValue.split('')
        someContentValue.length = 20
        someContentValue = someContentValue.join('')
    }
    title.textContent = titleArea.value === '' ? 'Title undefined' : titleArea.value
    someContent.textContent = someContentValue

    window.localStorage.setItem('savedNotes', JSON.stringify(arrNotes))
})