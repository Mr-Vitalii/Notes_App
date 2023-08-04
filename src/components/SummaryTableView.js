export default class SummaryTableView {

    constructor(
        dataService,
        activeTaskCounter,
        archivedTaskCounter,
        activeThoughtCounter,
        archivedThoughtCounter,
        activeIdeaCounter,
        archivedIdeaCounter
    ) {
        this.dataService = dataService;
        this.activeTaskCounter = activeTaskCounter;
        this.archivedTaskCounter = archivedTaskCounter;
        this.activeThoughtCounter = activeThoughtCounter;
        this.archivedThoughtCounter = archivedThoughtCounter;
        this.activeIdeaCounter = activeIdeaCounter;
        this.archivedIdeaCounter = archivedIdeaCounter;
        this.registerEvents();
    }

    registerEvents() {
        document.addEventListener('load', () => this.drawSummary());
        document.addEventListener('notesChanged', () => this.drawSummary());
        document.addEventListener('notesArchiveChanged', () => this.drawSummary());
    }

    drawSummary() {
        this.activeTaskCounter.innerHTML = this.dataService.category.task.active;
        this.archivedTaskCounter.innerHTML = this.dataService.category.task.archive;
        this.activeThoughtCounter.innerHTML = this.dataService.category.thought.active;
        this.archivedThoughtCounter.innerHTML = this.dataService.category.thought.archive;
        this.activeIdeaCounter.innerHTML = this.dataService.category.idea.active;
        this.archivedIdeaCounter.innerHTML = this.dataService.category.idea.archive;
    }

}