let notesList = document.querySelector('.notes-list')
let addNoteBtn = document.querySelector('.add-note')
let saveNoteBtn = document.querySelector('.save-note')
let main = document.querySelector('.main')
let arrNotes = []
let notesItems = []
let allIds = new Set();
let currentNoteId;

checker()

function checker() {
    if (notesList.children.length === 0 && window.localStorage.getItem('notes')) {
        let notes = JSON.parse(window.localStorage.getItem('notes'))

        for (let i = 0; i < notes.length; i++) {
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
        
            note.id = `${notes[i].id}`
            icon.id = `${notes[i].id}`
        
            icon.onclick = removeNote
        
            title.textContent = notes[i].title
            someContent.textContent = notes[i].someContent
            
            let noteObj = {
                title: notes[i].title,
                value: notes[i].value,
                someContent: notes[i].someContent,
                id: note.id
            }
        
            note.appendChild(title)
            note.appendChild(someContent)
            note.appendChild(icon)
        
            notesList.appendChild(note)
            arrNotes.push(noteObj)
        }
    }
    
    
    if (notesList.children.length === 0 && arrNotes.length === 0) {
        window.localStorage.clear();
        while (main.firstChild) {
            main.removeChild(main.firstChild)
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
    let noteId = generateId()
    
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

    note.id = noteId
    icon.id = noteId

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
    
    checker()
}

function removeNote(event) {
    let parentElement = event.target.parentElement
    let newArray = []

    for (let i = 0; i <arrNotes.length; i++) {
        if (arrNotes[i].id === parentElement.id) {
            continue
        } else {
            newArray.push(arrNotes[i])
        }
    }

    for (let i = 0; i < notesList.childNodes.length; i++) {
        if (notesList.childNodes[i].id === parentElement.id) {
            notesList.removeChild(notesList.childNodes[i]);
        }
    }
    arrNotes = newArray;
    window.localStorage.clear();
    window.localStorage.setItem('notes', JSON.stringify(arrNotes))

    checker()
}

saveNoteBtn.addEventListener('click', () => {
    let titleArea = document.querySelector('.title-area'),
        textArea = document.querySelector('.text-area')

    let title = document.querySelector('li.active .title'),
        someContent = document.querySelector('li.active .some-content')

    let someContentValue = textArea.value === '' ? '' : textArea.value.split('\n')[0]

    if (someContentValue.length > 20) {
        someContentValue = someContentValue.split('')
        someContentValue.length = 20
        someContentValue = someContentValue.join('')
    }
    title.textContent = titleArea.value === '' ? 'Title undefined' : titleArea.value
    someContent.textContent = someContentValue

    for (let i = 0; i < arrNotes.length; i++) {
        if (arrNotes[i].id === currentNoteId) {
            arrNotes[i].title = titleArea.value
            arrNotes[i].value = textArea.value
            arrNotes[i].someContent = someContentValue
        }
    }
    window.localStorage.setItem('notes', JSON.stringify(arrNotes))
})