import "./styles/common/common.scss";
import "./styles/components/header.scss";
import "./styles/components/notes-table.scss";
import "./styles/components/footer.scss";
import "./styles/styles.css"

import { v4 } from "uuid";

import extractDates from "./helpers/extractDates.js";
import getCurrentDate from "./helpers/getCurrentDate";

let isEditing = false;

let dataService = {
  tasks: [],
  isArchive: false,
  category: {
    task: {
      active: 0,
      archive: 0,
    },
    thought: {
      active: 0,
      archive: 0,
    },
    idea: {
      active: 0,
      archive: 0,
    },
  },

  get allTasks() {
    return this.tasks.filter(task => task.isArchived === false);
  },

  get archivedTasks() {
    return this.tasks.filter(task => task.isArchived === true);
  },

  add(task) {
    this.tasks.push(task);
    this.showStartMessage();
    this.calculateTaskStats(task)
    document.dispatchEvent(new Event('tasksChanged'));
    this.save();
  },

  save() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  },

  open() {
    this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    this.showStartMessage();
    this.tasks.forEach(element => {
      this.calculateTaskStats(element)
    });
  },

  archiveTask(task) {
    const taskIndex = this.tasks.findIndex(el => el.id === task.id);
    if (taskIndex !== -1) {
      if (this.tasks[taskIndex].isArchived === false) {
        this.tasks[taskIndex].isArchived = true;
        this.calculateTaskStats(task)
        document.dispatchEvent(new Event('tasksChanged'));
        this.save();
      } else {
        this.returnFromArchive(task);
      }

    } else {
      alert('Task not found!');
      return null;
    }
  },

  returnFromArchive(task) {
    const taskIndex = this.tasks.findIndex(el => el.id === task.id);
    this.tasks[taskIndex].isArchived = false;
    this.calculateTaskStats(task)
    document.dispatchEvent(new Event('tasksArchiveChanged'));
    this.save();
  },

  editTask(task, name, category, content) {
    const taskIndex = this.tasks.findIndex(el => el.id === task.id);
    if (taskIndex !== -1) {
      this.tasks[taskIndex] = { ...this.tasks[taskIndex], name, category, content };
      document.dispatchEvent(
        new Event(task.isArchived ? 'tasksArchiveChanged' : 'tasksChanged')
      );
      return this.tasks[taskIndex];
    } else {
      alert('Task not found!');
      return null;
    }
  },

  calculateTaskStats(task) {
    switch (task.category) {
      case "Task":
        this.category.task.archive = dataService.tasks.filter(el => el.category === task.category && el.isArchived).length;
        this.category.task.active = dataService.tasks.filter(el => el.category === task.category && !el.isArchived).length;
        break;
      case "Random Thought":
        this.category.thought.archive = dataService.tasks.filter(el => el.category === task.category && el.isArchived).length;
        this.category.thought.active = dataService.tasks.filter(el => el.category === task.category && !el.isArchived).length;
        break;
      case "Idea":
        this.category.idea.archive = dataService.tasks.filter(el => el.category === task.category && el.isArchived).length;
        this.category.idea.active = dataService.tasks.filter(el => el.category === task.category && !el.isArchived).length;
        break;
    }
  },

  delete(task) {
    // this.tasks.splice(this.tasks.indexOf(task), 1)
    this.tasks = this.tasks.filter((t) => t.id !== task.id)
    this.showStartMessage();
    this.calculateTaskStats(task)
    document.dispatchEvent(
      new Event(task.isArchived ? 'tasksArchiveChanged' : 'tasksChanged')
    );


    this.save();
  },

  showStartMessage() {
    if (this.isArchive) {
      startMessage.hidden = true;
      if (this.tasks.filter(t => t.isArchived).length !== 0) {
        startArchiveMessage.hidden = true;
      } else {
        startArchiveMessage.hidden = false;
      }
    } else {
      startArchiveMessage.hidden = true;
      if (this.tasks.length !== 0) {
        startMessage.hidden = true;
      } else {
        startMessage.hidden = false;
      }
    }
  }
}

class Task {
  constructor(name, category, content) {
    this.id = v4(),
      this.name = name;
    this.category = category;
    this.content = content;
    this.isArchived = false;
    this.isDone = false;
  }
}

class TasksListView {
  tasksContainer;
  dataService;

  constructor(tasksContainer) {
    this.tasksContainer = tasksContainer;
    this.dataService = dataService;
    this.registerEvents();
  }

  #drawList(tasksElements) {
    this.tasksContainer.innerHTML = "";
    tasksElements.forEach(taskElement => {
      const taskView = new TaskView(taskElement);

      const taskDiv = taskView.createIn();

      this.tasksContainer.appendChild(taskDiv);
    });
  }

  registerEvents() {
    document.addEventListener('tasksChanged', () => this.drawAll());
    document.addEventListener('tasksArchiveChanged', () => this.drawArchivedTasks());
  }

  drawAll() {
    let tasks = dataService.allTasks;
    if (tasks) {
      this.#drawList(tasks);
    } else {
      console.log("Not found");
    }
  }

  drawArchivedTasks() {
    let tasks = dataService.archivedTasks;
    if (tasks) {
      this.#drawList(tasks);
    } else {
      console.log("Not found");
    }
  }
}


class TaskView {
  constructor(task) {
    this.task = task;
    this.newDiv = null;
  }

  createIn() {
    this.newDiv = document.createElement("div");
    this.newDiv.classList.add("notes-table__row");

    const currentDate = getCurrentDate();

    const div1 = document.createElement("div");
    div1.classList.add("notes-table__item");
    div1.textContent = this.task.name;

    const div2 = document.createElement("div");
    div2.classList.add("notes-table__item");
    div2.textContent = currentDate;

    const div3 = document.createElement("div");
    div3.classList.add("notes-table__item");
    div3.textContent = this.task.category;

    const div4 = document.createElement("div");
    div4.classList.add("notes-table__item");
    div4.textContent = this.task.content;

    const div5 = document.createElement("div");
    div5.classList.add("notes-table__item");
    const dates = extractDates(this.task.content);
    div5.textContent = dates.join(", ");

    const div6 = document.createElement("div");
    div6.classList.add("notes-table__actions");

    const crossButton = document.createElement("button");
    crossButton.classList.add("notes-table__button");
    crossButton.textContent = "X";
    crossButton.addEventListener("click", () => dataService.delete(this.task));

    const archiveButton = document.createElement("button");
    archiveButton.classList.add("notes-table__button");
    archiveButton.textContent = "Arch";
    archiveButton.addEventListener("click", () => dataService.archiveTask(this.task));

    const changeTaskButton = document.createElement("button");
    changeTaskButton.classList.add("notes-table__button");
    changeTaskButton.textContent = "VV";
    changeTaskButton.addEventListener("click", () => {
      isEditing = true;
      fillTaskForm(this.task)
    });

    div6.appendChild(crossButton);
    div6.appendChild(archiveButton);
    div6.appendChild(changeTaskButton);


    this.newDiv.appendChild(div1);
    this.newDiv.appendChild(div2);
    this.newDiv.appendChild(div3);
    this.newDiv.appendChild(div4);
    this.newDiv.appendChild(div5);
    this.newDiv.appendChild(div6);

    return this.newDiv;
  }
}

class SummaryTableView {

  constructor(
    activeTaskCounter,
    archivedTaskCounter,
    activeThoughtCounter,
    archivedThoughtCounter,
    activeIdeaCounter,
    archivedIdeaCounter
  ) {
    this.activeTaskCounter = activeTaskCounter;
    this.archivedTaskCounter = archivedTaskCounter;
    this.activeThoughtCounter = activeThoughtCounter;
    this.archivedThoughtCounter = archivedThoughtCounter;
    this.activeIdeaCounter = activeIdeaCounter;
    this.archivedIdeaCounter = archivedIdeaCounter;
    this.registerEvents();
  }

  registerEvents() {
    document.addEventListener('tasksChanged', () => this.drawSummary());
    document.addEventListener('tasksArchiveChanged', () => this.drawSummary());
  }

  drawSummary() {
    this.activeTaskCounter.innerHTML = dataService.category.task.active;
    this.archivedTaskCounter.innerHTML = dataService.category.task.archive;
    this.activeThoughtCounter.innerHTML = dataService.category.thought.active;
    this.archivedThoughtCounter.innerHTML = dataService.category.thought.archive;
    this.activeIdeaCounter.innerHTML = dataService.category.idea.active;
    this.archivedIdeaCounter.innerHTML = dataService.category.idea.archive;
  }

}





//* Selector
const taskListMain = document.querySelector(".notes-table__list");

const startMessage = document.querySelector(".notes-table__message");
const startArchiveMessage = document.querySelector(".notes-table__message-archive");

const activeTaskCounter = document.querySelector("#tasks-active");
const archivedTaskCounter = document.querySelector("#tasks-archived");
const activeThoughtCounter = document.querySelector("#thought-active");
const archivedThoughtCounter = document.querySelector("#thought-archived");
const activeIdeaCounter = document.querySelector("#idea-active");
const archivedIdeaCounter = document.querySelector("#idea-archived");

const hiddenDiv = document.querySelector(".hiddenDiv");

const myForm = document.getElementById('noteForm');

//* Button 
const mainButton = document.querySelector("#mainButton");
const archiveButton = document.querySelector("#archiveButton");

const createButton = document.querySelector("#create-button");






//*Class initialization

const tasksListView = new TasksListView(taskListMain);
const summaryTableView = new SummaryTableView(
  activeTaskCounter,
  archivedTaskCounter,
  activeThoughtCounter,
  archivedThoughtCounter,
  activeIdeaCounter,
  archivedIdeaCounter
)



//* Loading from local storage
dataService.open();


//* EventListeners
window.addEventListener("load", function () {
  tasksListView.drawAll();
  document.dispatchEvent(new Event('tasksChanged'));
});

createButton.addEventListener("click", () => {
  isEditing = false;
  toggleTagVisibility(hiddenDiv);
});

myForm.addEventListener('submit', handlerSubmit);

archiveButton.addEventListener("click", () => {
  dataService.isArchive = true;
  dataService.showStartMessage();
  tasksListView.drawArchivedTasks()
});

mainButton.addEventListener("click", () => {
  dataService.isArchive = false;
  dataService.showStartMessage();

  tasksListView.drawAll()
});





//* Function

function toggleTagVisibility(htmlTag) {
  const computedStyle = window.getComputedStyle(htmlTag);
  if (computedStyle.visibility === "hidden") {
    htmlTag.style.visibility = "visible";
  } else {
    htmlTag.style.visibility = "hidden";
  }
}


function fillTaskForm(task) {
  myForm.nameInput.value = task.name;
  myForm.categorySelect.value = task.category;
  myForm.contentInput.value = task.content;
  myForm.task = task;
  toggleTagVisibility(hiddenDiv)
}

function handlerSubmit(e) {
  e.preventDefault();

  const formData = new FormData(myForm);

  const name = formData.get('name');
  const category = formData.get('category');
  const content = formData.get('content');

  if (isEditing) {
    const task = myForm.task;
    dataService.editTask(task, name, category, content);
  } else {
    dataService.add(new Task(name, category, content));
  }

  toggleTagVisibility(hiddenDiv)
}







