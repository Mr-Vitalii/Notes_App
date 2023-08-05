import { extractDates, getCurrentDate, showToast } from '../helpers';


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
        const icons = {
            head: '<i class="fa-solid fa-head-side-virus"></i>',
            cart: '<i class="fa-solid fa-cart-shopping"></i>',
            lightbulb: '<i class="fa-regular fa-lightbulb"></i>'
        }
        let currentIcon;
        switch (this.note.category) {
            case "Task":
                currentIcon = icons.cart;
                break;
            case "Random Thought":
                currentIcon = icons.head;
                break;
            case "Idea":
                currentIcon = icons.lightbulb;
                break;
        }
        this.noteContainer = document.createElement("div");
        this.noteContainer.classList.add("notes-table__row");
        this.noteContainer.innerHTML = `
      <div class="notes-table__item"><span>${currentIcon}</span> <span>${this.note.name}</span></div>
      <div class="notes-table__item">${currentDate}</div>
      <div class="notes-table__item">${this.note.category}</div>
      <div class="notes-table__item">${this.note.content}</div>
      <div class="notes-table__item">${dates.join(", ")}</div>
      <div id="noteButtonContainer" class="notes-table__item-actions">
      <button id="noteButton" class="button button--note" data-action="edit"><i class="fa-solid fa-pencil"></i></button>
      <button id="noteButton" class="button button--note" data-action="archive"><i class="fa-solid fa-boxes-packing"></i></button>
      <button id="noteButton" class="button button--note" data-action="delete"><i class="fa-solid fa-trash"></i></button>
       
      </div>
    `;

        const buttonsContainer = this.noteContainer.querySelector("#noteButtonContainer");
        buttonsContainer.addEventListener("click", this.handleButtonClick.bind(this));

        return this.noteContainer;
    }

    handleButtonClick(event) {
        const button = event.target.closest('#noteButton');
        // if (!button) return
        const action = button.dataset.action;

        switch (action) {
            case "delete":
                this.notesData.delete(this.note);
                showToast("Note deleted!");
                break;
            case "archive":
                this.notesData.archiveNote(this.note);
                showToast("Note added to the archive!");
                break;
            case "edit":
                this.noteForm.setEditingMode(this.note);
                break;
            default:
                break;
        }
    }
}