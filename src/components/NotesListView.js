
import NoteView from './NoteView';

export default class NotesListView {

    constructor(notesContainer, startMessage, notesData, noteForm) {
        this.notesContainer = notesContainer;
        this.startMessage = startMessage;
        this.notesData = notesData;
        this.noteForm = noteForm;
        this.registerEvents();
    }

    #drawList(notes) {
        this.notesContainer.innerHTML = "";
        notes.forEach(note => {
            const noteView = new NoteView(note, this.notesData, this.noteForm);
            const noteDiv = noteView.createNote();
            this.notesContainer.appendChild(noteDiv);
        });
    }

    registerEvents() {
        document.addEventListener('notesChanged', () => {
            this.renderAllNotes();
            this.renderStartMessage();
        });
        document.addEventListener('notesArchiveChanged', () => {
            this.renderArchivedNotes();
            this.renderStartMessage();
        });

        this.notesContainer.addEventListener('click', this.handleButtonClick);
    }

    renderAllNotes() {
        const notes = this.notesData.allNotes;
        this.#drawList(notes);
    }

    renderArchivedNotes() {
        const notes = this.notesData.archivedNotes;
        this.#drawList(notes);
    }

    renderStartMessage() {
        const isNotesEmpty = this.notesData.notes.filter(note => !note.isArchived).length === 0;
        const isArchivedEmpty = this.notesData.notes.filter(note => note.isArchived).length === 0;
        if (this.notesData.isArchive) {
            this.startMessage.hidden = !isArchivedEmpty;
        } else {
            this.startMessage.hidden = !isNotesEmpty;
        }
    }

    deleteListeners() {
        document.removeEventListener('notesChanged', this.renderAllNotes);
        document.removeEventListener('notesArchiveChanged', this.renderArchivedNotes);
    }

}