const buttonAddTask = document.getElementById("add-task-button");
const inputAddTask = document.getElementById("input-task");
const listOfTasks = document.getElementById("task-list");

// localStorage.clear()

let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
localStorage.removeItem("inputText");

if (taskList.length)
    taskList.forEach(element => {
        listOfTasks.insertAdjacentHTML('beforeend', element);
    })

setEventsOnList();

inputAddTask.addEventListener('input', (e) => {
    localStorage.setItem("inputText", e.target.value)
})

buttonAddTask.addEventListener('click', () => {
    let item = createListItem();

    taskList.push(item);
    localStorage.setItem("tasks", JSON.stringify(taskList));

    inputAddTask.value = '';

    listOfTasks.insertAdjacentHTML('beforeend', item);

    setEventsOnList();
})

function createListItem() {
    if(localStorage.getItem("inputText") === null)
        localStorage.setItem("inputText", '');
    console.log(typeof(localStorage.getItem("inputText")))
    return `
        <li>
            <input type="checkbox">
            <span class="task">${localStorage.getItem("inputText")}</span>
            <button class="delete-btn">x</button>
        </li>`;
}
function setEventsOnList() {
    for(let liItem of listOfTasks.children) {
        let index = Array.prototype.indexOf.call(listOfTasks.children, liItem);

        liItem.lastElementChild.addEventListener('click', () => {

            taskList.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(taskList))

            liItem.remove();
        });

        liItem.firstElementChild.addEventListener('input', () => {
            if(liItem.firstElementChild.checked){
                liItem.firstElementChild.setAttribute('checked', 'checked')
                liItem.firstElementChild.nextElementSibling.style.textDecoration = "line-through";
            }
            else{
                liItem.firstElementChild.removeAttribute('checked');
                liItem.firstElementChild.nextElementSibling.style.textDecoration = "none";
            }
            taskList.splice(index, 1,liItem.outerHTML);
            localStorage.setItem("tasks", JSON.stringify(taskList))
        })
    }
}
