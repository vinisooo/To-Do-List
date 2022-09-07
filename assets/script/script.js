let tasks = [];
let orderedArray = [];

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
        orderArray();
        
        createElementList(orderedArray);
        
    }else{
        alert("O campo está vazio")
    }

}
addTaskBtn.addEventListener("click", addTask);


function createElementList(list){
    if (list.length > 0){

        for (let i = 0; i <list.length; i++){

            let newTask = document.createElement("li");
            newTask.classList.add("toDo");

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
            tasksList.appendChild(newTask);
            orderedArray = [];
            
        }
    }
}


function orderArray (){
    for (item of tasks){
        if (item.tipo == "urgente"){
            orderedArray.push(item)
        }
    }for (item of tasks){
        if (item.tipo == "prioritario"){
            orderedArray.push(item)
        }
    }for (item of tasks){
        if (item.tipo == "normal"){
            orderedArray.push(item)
        }
    }
    return "something"
}