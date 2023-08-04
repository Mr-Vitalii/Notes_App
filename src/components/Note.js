import { v4 } from "uuid";


export default class Note {
    constructor(name, category, content) {
        this.id = v4(),
            this.name = name;
        this.category = category;
        this.content = content;
        this.isArchived = false;
    }
}
