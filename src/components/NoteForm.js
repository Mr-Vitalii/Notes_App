import { toggleTagVisibility } from '../helpers';
import Note from "./Note";


export default class NoteForm {
    constructor(formElement, dataService) {
        this.formElement = formElement;
        this.dataService = dataService;
        this.isEditing = false;
        this.registerEvents();
    }

    registerEvents() {
        this.formElement.addEventListener('submit', this.handleFormSubmit.bind(this));
        const cancelButton = this.formElement.querySelector('#cancelButton');
        if (cancelButton) {
            cancelButton.addEventListener('click', this.closeForm.bind(this));
        }
    }

    openForm() {
        this.isEditing = false;
        this.formElement.reset();
        toggleTagVisibility(this.formElement);
    }

    handleFormSubmit(event) {
        event.preventDefault();

        const formData = new FormData(this.formElement);
        const name = formData.get('name');
        const category = formData.get('category');
        const content = formData.get('content');

        if (this.isEditing) {
            const note = this.formElement.note;
            this.dataService.editNote(note, name, category, content);
        } else {
            this.dataService.add(new Note(name, category, content));
        }

        toggleTagVisibility(this.formElement);
    }

    setEditingMode(note) {
        this.isEditing = true;
        this.formElement.nameInput.value = note.name;
        this.formElement.categorySelect.value = note.category;
        this.formElement.contentInput.value = note.content;
        this.formElement.note = note;
        this.formElement.style.visibility = 'visible';
    }

    closeForm(e) {
        e.preventDefault();
        this.formElement.reset();
        toggleTagVisibility(this.formElement);
    }
}