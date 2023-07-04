let notesList = document.querySelector('.notes-list'),
    addNoteBtn = document.querySelector('.add-note'),
    saveNoteBtn = document.querySelector('.save-note'),
    main = document.querySelector('.main'),
    bars = document.querySelector('.bars'),
    arrNotes = [],
    notesItems = [],
    allIds = new Set(),
    currentNoteId;

checker()


bars.addEventListener('click', () => {
    if (bars.classList.contains('active')) {
        bars.classList.remove('active')
        document.querySelector('.container').classList.remove('menu-isActive')
        document.querySelector('aside').classList.remove('menu-isActive')
    } else {
        bars.classList.add('active')
        document.querySelector('.container').classList.add('menu-isActive')
        document.querySelector('aside').classList.add('menu-isActive')
    }
})

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
                textArea.placeholder = 'Start Writing'

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

                textArea.focus()

                for (let i = 0; i < arrNotes.length; i++) {
                    if (arrNotes[i].id === note.id) {
                        titleArea.value = arrNotes[i].title
                        textArea.value = arrNotes[i].value
                    }
                }

                if (window.innerWidth < 767) {
                    if (bars.classList.contains('active')) {
                        bars.classList.remove('active')
                        document.querySelector('.container').classList.remove('menu-isActive')
                        document.querySelector('aside').classList.remove('menu-isActive')
                    }

                }
            })
        });
    }
}

// function generates ids for notes
function generateId() {
    let randomNumber = Math.floor(Math.random() * 100)

    while (allIds.has(randomNumber)) {
        randomNumber = Math.floor(Math.random() * 100)
    }
    allIds.add(randomNumber)
    return randomNumber
}

// this function works when you add new note
addNoteBtn.onclick = () => {
    let note = document.createElement('li')
    let title = document.createElement('h4')
    let someContent = document.createElement('p')
    let icon = document.createElement('i')
    let titleArea = document.querySelector('.title-area')
    let textArea = document.querySelector('.text-area')
    let noteId = generateId()

    if (notesList.children.length === 0) {
        for (let i = 0; i < main.childNodes.length; i++) {
            main.removeChild(main.childNodes[i])
        }

        let titleArea = document.createElement('textarea')
        let textArea = document.createElement('textarea')

        titleArea.placeholder = 'Title'
        textArea.placeholder = 'Start Writing'

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


    notesItems.forEach(prevNote => {
        prevNote.className = ''
    })
    note.classList.add('active')
    currentNoteId = note.id

    titleArea.focus()


    for (let i = 0; i < arrNotes.length; i++) {
        if (arrNotes[i].id === note.id) {
            console.log('title: ', arrNotes[i].title);
            console.log('title: ', arrNotes[i].value);
            titleArea.value = arrNotes[i].title
            textArea.value = arrNotes[i].value
        }
    }


    checker()
}

// this function works when you delete a note
function removeNote(event) {
    let parentElement = event.target.parentElement,
        newArray = [],
        lastNote;

    let titleArea = document.querySelector('.title-area')
    let textArea = document.querySelector('.text-area')

    for (let i = 0; i < arrNotes.length; i++) {
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

    // --------------------------------------------------------------
    checker()

    lastNote = arrNotes[arrNotes.length - 1]
    titleArea.value = lastNote.title
    textArea.value = lastNote.value
    currentNoteId = lastNote.id

    console.log('currentNoteId: ', currentNoteId);

    setActiveNote(currentNoteId)

}

// when you save notes this function works
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

async function setActiveNote(id) {
    for (let i = 0; i < notesList.childElementCount; i++) {
        const element = notesList.children[i];
        if (element.id === id) {
            element.setAttribute('isActive', true)
        } else {
            element.classList.remove('active')
        }
    }
}