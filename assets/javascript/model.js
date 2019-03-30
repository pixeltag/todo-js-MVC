export default class TaskModel {

    constructor(callback) {

        this.getLocalStorage = () => {
            return  JSON.parse(localStorage.getItem("TaskStore") || []);
        };
        
        this.setLocalStorage = (tasks) => {
            return  localStorage.setItem("TaskStore", JSON.stringify(tasks));
        };
		if (callback) {
			callback(); 
        }
        
    }

    find(callback) {
        let tasks = this.getLocalStorage();
        for (let index = 0; index < tasks.length; index++) {
            if(callback) {
                callback(tasks[index]);
            }
            
        }
    }

    insert(task, callback) {
        if(localStorage) {
            let tasks = this.getLocalStorage();
            tasks.push(task);
            this.setLocalStorage(tasks);
            // console.log(this.storage);
        }
		if (callback) {
			callback();
		}
    }
    

    updateStatus(task , callback) {
        const id = task.id;
        const status = task.finished;
        console.log(status);
        let tasks = this.getLocalStorage();
        for (let index = 0; index < tasks.length; index++) {
            if(tasks[index].id == id) {
                    tasks[index].finished = status;   
                    console.log(tasks);         
                    this.setLocalStorage(tasks);
            }
        }
        if(callback) {
            callback();
        }

    }


} 