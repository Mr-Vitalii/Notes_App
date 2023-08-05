export default class SummaryTableView {

    constructor(dataService, summaryTable) {
        this.dataService = dataService;
        this.summaryTable = summaryTable;
        this.registerEvents();
        this.drawSummary();
    }

    registerEvents() {
        // document.addEventListener('load', () => this.drawSummary());
        document.addEventListener('notesChanged', () => this.drawSummary());
        document.addEventListener('notesArchiveChanged', () => this.drawSummary());
    }

    drawSummary() {
        const category = this.dataService.category;
        this.summaryTable.querySelector("#tasks-active").innerHTML = category.task.active;
        this.summaryTable.querySelector("#tasks-archived").innerHTML = category.task.archive;
        this.summaryTable.querySelector("#thought-active").innerHTML = category.thought.active;
        this.summaryTable.querySelector("#thought-archived").innerHTML = category.thought.archive;
        this.summaryTable.querySelector("#idea-active").innerHTML = category.idea.active;
        this.summaryTable.querySelector("#idea-archived").innerHTML = category.idea.archive;
          

    }
}