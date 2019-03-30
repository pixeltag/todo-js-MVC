import TaskModel from "./model";
import TaskView from "./view";
import TaskTemp from "./temp";
import TaskController from "./controller";

const model         = new TaskModel();
const temp          = new TaskTemp();
const view          = new TaskView(temp);
const controller    = new TaskController(model , view);


controller.setView();
// const initView = () => controller.     