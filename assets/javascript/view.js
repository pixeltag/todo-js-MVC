import TaskTemp from "./temp";
import {qs, $on, $delegate} from './helper';


export default class TaskView {
    constructor(TaskTemp) {
        this.temp = TaskTemp;
        this.$tasksList = qs('.tasks-list');
        this.$addNewtask = qs('.add-new-btn');
        this.$taskItemValue = qs('.task-value');
        this.$inputCB = qs('.checkbox');
        
        this.$Newtask = qs('.add-new-tasks-btn');
        this.$tasksView = qs('.tasks-main-screen');
        this.$addTaskView = qs('.add-new-tasks');
        this.$goBack = qs('.go-parent');
    }
    updateView(tasks) {
        this.$tasksList.innerHTML += this.temp.taskMarkup(tasks);
        console.log(tasks);
    }

    setClear() {
        this.$taskItemValue.value = "";
    }

    bindTask(handler) {
        $on(this.$addNewtask , "click" , () => {
            const taskTitle = this.$taskItemValue.value.trim();
            // task validations
            if(taskTitle) {
                handler(taskTitle);
                this.backToMainList();
            } 
        });
    }

    changeStatus(id , finished) {
		const taskItem = qs(`[data-index="${id}"]`);
		if (!taskItem) {
			return;
		}
		taskItem.className = finished ? 'finished' : '';
		qs('input', taskItem).checked = finished;
    }

    bindToggleItem(handler) {
		$delegate(this.$tasksList, '.checkbox', 'click', ({target}) => {
			handler(target.id, target.checked);
		});
    } 
    

    addNewBtn() {
        $on(this.$Newtask , 'click' , (target) => {
            this.$addTaskView.classList.remove('hidden');
            this.$tasksView.classList.add('hidden'); 
            this.$Newtask.classList.add('hidden');
        });
    }

    backToMainList() {
        this.$addTaskView.classList.add('hidden');
        this.$tasksView.classList.remove('hidden');
        this.$Newtask.classList.remove('hidden');
    }

    goBackBtn() {
        $on(this.$goBack , 'click' , (target) => {
            this.backToMainList();
        });
    }
}
