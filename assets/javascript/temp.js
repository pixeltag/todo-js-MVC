export default class TaskTemp {

     taskMarkup(item) {
        return `<li data-index="${item.id}" ${item.finished ? ' class="finished"' : ''}>
        <div class="checkbox-btn">
            <input class="checkbox" id="${item.id}" type="checkbox" ${item.finished ? 'checked' : ''}>
                <label for="${item.id}"><span></span>${item.task}</label>
        </div>
    </li>`;
     }

}