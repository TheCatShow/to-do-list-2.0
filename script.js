const addBtn = document.querySelector('#addBtn');
const taskInput = document.querySelector('#taskInput');
const list = document.querySelector('#list');
let tasks = [];

if (localStorage.getItem('tasksLS')) {
    tasks = JSON.parse(localStorage.getItem('tasksLS'));
}

tasks.forEach(task => {
    // const cssClass = task.complete ? "item done" : "item";
    let cssClass;
    if (task.complete == true) {
        cssClass = "item done";
    } else {
        cssClass = "item";
    }
    list.insertAdjacentHTML("beforeend",
        `<li class="${cssClass}" id="${task.id}">${task.text}
        <div class="btns">
            <i class="fa-regular fa-square-check" data-action="complete"></i>
            <i class="fa-solid fa-trash-can" data-action="delete"></i>
        </div>
    </li> `
    )
});

// [task1, task2, task3]

list.addEventListener('click', function (event) {
    target = event.target
    if (target.dataset.action == 'complete') {
        completeBtn();
    }
    if (target.dataset.action == 'delete') {
        removeTask();
    }
    writeLS();
})

addBtn.addEventListener('click', function () {
    const newItem = document.createElement('li');
    addTask(newItem);
    list.append(newItem);
    taskInput.value = '';
    console.log(tasks);
    writeLS();
})

function addTask(newItem) {
    newItem.classList.add('item');
    newItem.textContent = taskInput.value;
    const itemBtns = document.createElement('div');
    newItem.append(itemBtns);
    itemBtns.className = 'item__btns';

    const doneBtn = document.createElement('i');
    doneBtn.className = 'fa-regular fa-square-check';
    itemBtns.append(doneBtn);
    doneBtn.setAttribute('data-action', 'complete');

    const deleteButton = document.createElement('i');
    deleteButton.className = 'fa-solid fa-trash-can';
    itemBtns.append(deleteButton);
    deleteButton.setAttribute('data-action', 'delete');

    let newTask = {
        id: Date.now(),
        text: taskInput.value,
        complete: false
    }

    tasks.push(newTask);
    newItem.setAttribute('id', newTask.id);
}

function completeBtn(target) {
    target.closest('li').classList.toggle('done');
    let currentId = target.closest('li').id;
    const index = tasks.findIndex((task) => {
        return task.id == currentId;
    });

    if (tasks[index].complete == false) {
        tasks[index].complete = true;
    } else {
        tasks[index].complete = false;
    }
}

function removeTask(target) {
    target.closest('li').remove();
    taskInput.value = '';
    const index = tasks.findIndex((task) => {
        return task.id == target.closest('li').id
    });
    tasks.splice(index, 1);
}

function writeLS() {
    localStorage.setItem('tasksLS', JSON.stringify(tasks));
}