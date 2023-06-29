let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

// Empty Array To Store The Tasks
let arrayOfTasks = [];

// test localstorage
if (window.localStorage.getItem("task")) {
    arrayOfTasks = JSON.parse(window.localStorage.getItem("task"));
    addElementsToPageFrom();
};



// add task
submit.onclick = function () {
    if (input.value != "") {
        addTaskToArray(input.value);
       input.value = "";

    }
};

//remove
tasksDiv.addEventListener("click", (e) => {
        if (e.target.classList.contains("del")) {
        e.target.parentElement.remove();
    // remove task from local storage
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));

    }else{
        // //--------- done ---------------
        e.target.classList.toggle("done");
        for (let i = 0; i < arrayOfTasks.length; i++) {
            if (arrayOfTasks[i].id == e.target.getAttribute("data-id")) {
                arrayOfTasks[i].completed == false? arrayOfTasks[i].completed = true: arrayOfTasks[i].completed = false;
        
            }
        }
        addDataToLocalStorageFrom(arrayOfTasks)

    }

});


//------------------------------------
function addTaskToArray(taskText) {
    const task = {
     id: Date.now(),
     title: taskText,
     completed: false,
    };
arrayOfTasks.push(task);
addElementsToPageFrom(arrayOfTasks);
addDataToLocalStorageFrom(arrayOfTasks);

}

// -----------start-----add taske to page---------start------------------------------
function addElementsToPageFrom() {
    //Empty tasks Div
    tasksDiv.innerHTML ="";
    //looping on Array of tasks
    arrayOfTasks.forEach((task)=> {
        let div = document.createElement("div");
        div.className ="task";
        // check if task is done
        if (task.completed) {
        div.className ="task done";
        }
        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title));
        // creat Button Delete
        let span = document.createElement("span");
        span.className = "del"
        span.appendChild(document.createTextNode("Delet"));
        div.appendChild(span);
        //append div in tasks
        tasksDiv.appendChild(div)
    })
};

//---------------start----add task to local glo----------------------------------
function addDataToLocalStorageFrom (arrayOfTasks) {
    window.localStorage.setItem("task", JSON.stringify(arrayOfTasks))
};



// ---------------delete Task With local storg----------
function deleteTaskWith(task_remov) {

    arrayOfTasks = arrayOfTasks.filter((task_F) =>task_F.id != task_remov);
    addDataToLocalStorageFrom(arrayOfTasks);

}






