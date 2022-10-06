let tasks = [];
let orderedTasks = [];

const addTaskBtn = document.getElementById("addNewTaskBtn");
const taskName = document.getElementById("newTask");
const priorityLvl = document.getElementById("newPriority");

const tasksList = document.getElementById("toDoList");


function getLocateStorage(){
    const localStorageTasks = localStorage.getItem("tasks");

    if (localStorageTasks){
        const tasksToArr = JSON.parse(localStorageTasks);
        tasks = [...tasksToArr]
        createElementList(tasksToArr);
    }
}
getLocateStorage();
// localStorage.clear()
function addTask(){
    
    let newTaskObj = {};

    if (taskName.value != false && priorityLvl.value != false && priorityLvl.value != "noValue"){
        tasksList.innerHTML = "";

        newTaskObj["titulo"] = taskName.value;
        newTaskObj["tipo"] = priorityLvl.value;
        taskName.value = "";
        priorityLvl.value = priorityLvl[0].value="noValue";

        tasks.push(newTaskObj);

        orderArray(tasks);

        const localStorageTasks = JSON.stringify(orderedTasks);
        localStorage.setItem("tasks",localStorageTasks);

        createElementList(orderedTasks);
    }

}
addTaskBtn.addEventListener("click", addTask);

function deleteTask(event){

    const delBtn = event.target;
    let task = delBtn.closest("li");
    let taskId = task.classList[1];
    let taskIdNum = parseInt(taskId.substring(3));

    for (let i = 0; i < tasks.length; i++){
        if (taskIdNum == tasks[i].id){
            tasks[i].id = "deleted";
            tasksList.innerHTML = "";

            orderArray(tasks);
            createElementList(orderedTasks);

            const localStorageTasks = JSON.stringify(tasks);
            localStorage.setItem("tasks", localStorageTasks);
        }
    }
}

function createElementList(list){
    if (list.length > 0){



        for (let i = 0; i <list.length; i++){
            
            if (list[i].id != "deleted"){

                list[i]["id"] = i;

                let newTask = document.createElement("li");
                newTask.classList.add("toDo");
                newTask.classList.add(`id_${i}`);
                
                let deleteBtn = document.createElement("button");
                deleteBtn.classList.add("delete");

                deleteBtn.addEventListener("click", deleteTask)

                let priorityLvlSymbol = document.createElement("div");


                priorityLvlSymbol.classList.add("priority");
                if (list[i].tipo == "normal"){
                    priorityLvlSymbol.style.background = "green";
                    priorityLvlSymbol.title = "Prioridade: Normal"

                }if (list[i].tipo == "prioritario"){
                    priorityLvlSymbol.style.background = "orange";
                    priorityLvlSymbol.title = "Prioridade: Prioritario"

                }if (list[i].tipo == "urgente"){
                    priorityLvlSymbol.style.background = "red";
                    priorityLvlSymbol.title = "Prioridade: Urgente"
                }

                newTask.innerText = list[i].titulo;

                const priorityAndDelete = document.createElement("div");
                const deleteIcon = document.createElement("img");
                deleteIcon.classList.add("deleteIcon");
                deleteIcon.src = "/assets/images/deleteIcon.webp";

                deleteBtn.appendChild(deleteIcon);
                priorityAndDelete.classList.add("rightTaskSide");
                priorityAndDelete.appendChild(priorityLvlSymbol);
                priorityAndDelete.appendChild(deleteBtn);

                newTask.appendChild(priorityAndDelete);
                tasksList.appendChild(newTask);
                orderedTasks = [];
            }
            
        }
    }
}


function orderArray (list){
    for (element of list){
        if (element.tipo == "urgente"){
            orderedTasks.push(element)
        }
    }for (element of list){
        if (element.tipo == "prioritario"){
            orderedTasks.push(element)
        }
    }for (element of list){
        if (element.tipo == "normal"){
            orderedTasks.push(element)
        }
    }
}

// CAMPO DE PESQUISA

const searchInput = document.getElementById("searchInput");
const enterSearch = document.getElementById("enterSearch");

function search(){
    let searchResult = [];

    let searchFor = searchInput.value.toLowerCase();

    if (searchFor.length > 0){
        for (element of tasks){
            if (searchFor == element.titulo.toLowerCase()){
                
                tasksList.innerHTML = "";
                console.log("elemento encontrado");
                searchResult.push(element);
    
                orderArray(searchResult);
    
                createElementList(orderedTasks);
            }
        }

    }else{
        tasksList.innerHTML = "";
        orderArray(tasks);
        createElementList(orderedTasks);
    }
}

enterSearch.addEventListener("click", search);
searchInput.addEventListener("keyup", search);
