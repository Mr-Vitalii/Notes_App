import { extractDates, getCurrentDate } from '../helpers';


export default class NoteView {
    constructor(note, notesData, noteForm) {
        this.note = note;
        this.notesData = notesData;
        this.noteForm = noteForm;
        this.noteContainer = null;
    }

    createNote() {
        const currentDate = getCurrentDate();
        const dates = extractDates(this.note.content);

        this.noteContainer = document.createElement("div");
        this.noteContainer.classList.add("notes-table__row");
        this.noteContainer.innerHTML = `
      <div class="notes-table__item">${this.note.name}</div>
      <div class="notes-table__item">${currentDate}</div>
      <div class="notes-table__item">${this.note.category}</div>
      <div class="notes-table__item">${this.note.content}</div>
      <div class="notes-table__item">${dates.join(", ")}</div>
      <div class="notes-table_actions">
        <button class="notes-table__button" data-action="delete">X</button>
        <button class="notes-table__button" data-action="archive">Arch</button>
        <button class="notes-table__button" data-action="edit">VV</button>
      </div>
    `;

        const buttonsContainer = this.noteContainer.querySelector(".notes-table_actions");
        buttonsContainer.addEventListener("click", this.handleButtonClick.bind(this));

        return this.noteContainer;
    }

    handleButtonClick(event) {
        const action = event.target.dataset.action;
      
        switch (action) {
            case "delete":
                this.notesData.delete(this.note);
                break;
            case "archive":
                this.notesData.archiveNote(this.note);
                break;
            case "edit":
                this.noteForm.setEditingMode(this.note);
                break;
            default:
                break;
        }
    }
}