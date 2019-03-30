import TaskModel from "./model";


export default class TaskController {

    constructor(model , view) {
        this.model = model;
        this.view = view;

        this.view.bindTask(this.addTask.bind(this));
        this.view.addNewBtn();
        this.view.goBackBtn();
        this.view.bindToggleItem((id, finished) => {
            this.changeTaskStatus(id , finished);
        });
    }

    // init the view 
    setView() {
        this.model.find((task) => {
            this.view.updateView(task);
        });
    }

    // add new task
    addTask(task) {
        let newTask = {
            id: Date.now(),
			task, 
			finished: false
        };
        this.model.insert( newTask , () => {
            this.view.setClear();
            this.view.updateView(newTask);
            // set the view clear
            // this._view.setClear();
        });
    }

    changeTaskStatus(id , finished) {
        this.model.updateStatus({id, finished}, () => {
			this.view.changeStatus(id, finished);
		});
    }
}