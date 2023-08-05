
import { showToast } from '../helpers';

export default class DataService {
    constructor(notesList) {
        this.notes = notesList;
        this.isArchive = false;
        this.isEditing = false;
        this.category = {
            task: { active: 0, archive: 0 },
            thought: { active: 0, archive: 0 },
            idea: { active: 0, archive: 0 },
        };
        this.notes.forEach(element => {
            this.calculateNoteStats(element);
        });
    }

    get allNotes() {
        return this.notes.filter(note => !note.isArchived);
    }

    get archivedNotes() {
        return this.notes.filter(note => note.isArchived);
    }

    add(note) {
        this.notes.push(note);
        this.calculateNoteStats(note)
        document.dispatchEvent(new Event('notesChanged'));
    }

    archiveNote(note) {
        const noteIndex = this.notes.findIndex(el => el.id === note.id);
            if (this.notes[noteIndex].isArchived === false) {
                this.notes[noteIndex].isArchived = true;
                this.calculateNoteStats(note)
                document.dispatchEvent(new Event('notesChanged'));
            } else {
                this.returnFromArchive(note);
            }
    }

    returnFromArchive(note) {
        const noteIndex = this.notes.findIndex(el => el.id === note.id);
        this.notes[noteIndex].isArchived = false;
        this.calculateNoteStats(note)
        document.dispatchEvent(new Event('notesArchiveChanged'));
    }

    editNote(note, name, category, content) {
        const noteIndex = this.notes.findIndex(el => el.id === note.id);
            this.notes[noteIndex] = { ...this.notes[noteIndex], name, category, content };
            document.dispatchEvent(
                new Event(note.isArchived ? 'notesArchiveChanged' : 'notesChanged')
            );
            return this.notes[noteIndex];
    }

    calculateNoteStats(note) {
        switch (note.category) {
            case "Task":
                this.category.task.archive = this.notes.filter(el => el.category === note.category && el.isArchived).length;
                this.category.task.active = this.notes.filter(el => el.category === note.category && !el.isArchived).length;
                break;
            case "Random Thought":
                this.category.thought.archive = this.notes.filter(el => el.category === note.category && el.isArchived).length;
                this.category.thought.active = this.notes.filter(el => el.category === note.category && !el.isArchived).length;
                break;
            case "Idea":
                this.category.idea.archive = this.notes.filter(el => el.category === note.category && el.isArchived).length;
                this.category.idea.active = this.notes.filter(el => el.category === note.category && !el.isArchived).length;
                break;
        }
    }

    delete(note) {
        this.notes = this.notes.filter((t) => t.id !== note.id)
        this.calculateNoteStats(note)
        document.dispatchEvent(
            new Event(note.isArchived ? 'notesArchiveChanged' : 'notesChanged')
        );
    }

    clearAll() {
        if (this.notes.length === 0) {
            showToast("No notes to delete!");
            return
        }
        const userConfirmed = window.confirm("When you click on the 'OK' button, all notes will be deleted. Do you want to continue?");
        if (userConfirmed) {
            this.notes = [];
            document.dispatchEvent(
                new Event('notesChanged')
            );
            showToast("All notes deleted!");
        } 
    }
}
