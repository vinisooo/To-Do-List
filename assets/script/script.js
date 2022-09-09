let tasks = [];
let orderedTasks = [];

const addTaskBtn = document.getElementById("addNewTaskBtn");
const taskName = document.getElementById("newTask");
const priorityLvl = document.getElementById("newPriority");

const tasksList = document.getElementById("toDoList");

function addTask(){
    
    let newTaskObj = {};

    if (taskName.value != false && priorityLvl.value != false){
        tasksList.innerHTML = "";
        newTaskObj["titulo"] = taskName.value;
        newTaskObj["tipo"] = priorityLvl.value;
        

        tasks.push(newTaskObj);

        for (let i = 0; i < tasks.length; i++){
            newTaskObj["id"] = i;
        }

        orderArray(tasks);
        
        createElementList(orderedTasks);
        
    }else{
        alert("O campo está vazio")
    }

}
addTaskBtn.addEventListener("click", addTask);

function deleteTask(event){

    const delBtn = event.target;
    let task = delBtn.closest("li");
    let taskId = task.classList[1];
    let taskIdNum = parseInt(taskId.substring(3));
    console.log(taskIdNum);

    for (let i = 0; i < tasks.length; i++){
        if (taskIdNum == tasks[i].id){
            tasks.shift(tasks[i]);

            tasksList.innerHTML = "";
            orderArray(tasks);
        
            createElementList(orderedTasks);
        }
    }
}

function createElementList(list){
    if (list.length > 0){

        for (let i = 0; i <list.length; i++){

            let newTask = document.createElement("li");
            newTask.classList.add("toDo");
            newTask.classList.add(`id_${i}`);
            
            let deleteBtn = document.createElement("button");
            deleteBtn.classList.add("delete");
            deleteBtn.innerText = "Excluir";

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

            
            newTask.appendChild(priorityLvlSymbol);
            newTask.appendChild(deleteBtn);
            tasksList.appendChild(newTask);
            orderedTasks = [];
            
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
                
                tasksList.innerHTML = ""
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
