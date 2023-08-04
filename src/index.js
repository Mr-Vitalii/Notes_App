import "./styles/common/common.scss";
import "./styles/components/header.scss";
import "./styles/components/notes-table.scss";
import "./styles/components/footer.scss";
import "./styles/components/note-form.scss";


import notesList from './data/notes';
import DataService from "./components/DataService";

import  NotesListView  from './components/NotesListView.js';
import  NoteForm  from './components/NoteForm.js';
import  SummaryTableView  from './components/SummaryTableView.js';


//* Selector
const notesListContainer = document.querySelector("#notesListContainer");
const startMessage = document.querySelector("#startMessage");
const activeTaskCounter = document.querySelector("#tasks-active");
const archivedTaskCounter = document.querySelector("#tasks-archived");
const activeThoughtCounter = document.querySelector("#thought-active");
const archivedThoughtCounter = document.querySelector("#thought-archived");
const activeIdeaCounter = document.querySelector("#idea-active");
const archivedIdeaCounter = document.querySelector("#idea-archived");
const noteFormElement = document.querySelector('#noteForm');

//* Button 
const mainMenuButton = document.querySelector("#mainMenuButton");
const archiveButton = document.querySelector("#archiveButton");
const createNoteButton = document.querySelector("#createNoteButton");


//*Class initialization
const dataService = new DataService(notesList)
const noteForm = new NoteForm(noteFormElement, dataService);
const notesListView = new NotesListView(notesListContainer, startMessage, dataService, noteForm);
const summaryTableView = new SummaryTableView(
  dataService,
  activeTaskCounter,
  archivedTaskCounter,
  activeThoughtCounter,
  archivedThoughtCounter,
  activeIdeaCounter,
  archivedIdeaCounter
)


//* EventListeners
window.addEventListener("load", function () {
  notesListView.renderAllNotes();
  document.dispatchEvent(new Event('notesChanged'));
});

createNoteButton.addEventListener("click", () => {
  noteForm.openForm()
});

mainMenuButton.addEventListener("click", () => {
  dataService.isArchive = false;
  notesListView.renderStartMessage();
  notesListView.renderAllNotes()
});

archiveButton.addEventListener("click", () => {
  dataService.isArchive = true;
  notesListView.renderStartMessage();
  notesListView.renderArchivedNotes()
});























