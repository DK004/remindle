showTask();
let note = document.getElementById('note');
let addbtn = document.getElementById('add');



addbtn.addEventListener('click', function () {
    noteValue = note.value;
    if(noteValue.trim() != 0){
        let webtask = localStorage.getItem("localTask");
        if (webtask == null) {
            taskObj = [];
        }
        else {
            taskObj = JSON.parse(webtask);
        }
        taskObj.push(noteValue);
        localStorage.setItem("localTask", JSON.stringify(taskObj));
        
    }
    showTask();
    note.value = '';
})

function showTask() {
    let webtask = localStorage.getItem("localTask");
    if (webtask == null) {
        taskObj = [];
    }
    else {
        taskObj = JSON.parse(webtask);
    }
    let html = '';
    let addedTask = document.getElementById('addedTask');
    taskObj.forEach((item, index) => {
        html += `<div id='card ' class="card bg-warning text-dark m-3 " style="width: 18rem;">
        <div class="card-header">Note ${index+1}</div>        
        <div class="card-body">
                    <p class="card-text " id='addNote'>${item}</p>
                    <hr />
                    <a href="#" class="card-link text-dark" style="font-size: 2rem;" onclick='editTask(${index})'> <i class="fa fa-edit"> </a></i>
                    <a href="#" class="card-link text-dark" style="font-size: 2rem;  float: right;" onclick='deleteItem(${index})' > <i
                            class="fa fa-trash"> </a></i>
                </div>
            </div>`;
    });
    addedTask.innerHTML = html;
}


function editTask(index){
    let saveIndex = document.getElementById('saveIndex');
    let savebtn = document.getElementById('save');
    let webtask = localStorage.getItem("localTask");
    let taskObj = JSON.parse(webtask);
    saveIndex.value =index;
    note.value = taskObj[index];
    addbtn.style.display ="none";
    savebtn.style.display ='block';
}
let savebtn = document.getElementById('save');
savebtn.addEventListener('click', function(){
    let webtask = localStorage.getItem("localTask");
    let taskObj = JSON.parse(webtask);
    let saveIndex = document.getElementById('saveIndex').value;
    taskObj[saveIndex]=note.value;
    localStorage.setItem("localTask", JSON.stringify(taskObj));
    savebtn.style.display='none';
    addbtn.style.display ='block';
    note.value ='';
    showTask();
})






// Dele the note
function deleteItem(index){
let webtask =localStorage.getItem("localTask");
let taskObj=JSON.parse(webtask);
taskObj.splice(index, 1);
localStorage.setItem("localTask",JSON.stringify(taskObj));
showTask();
}


// search
let search = document.getElementById('search')
search.addEventListener('input', function(){
    let list = document.querySelectorAll('div');
    Array.from(list).forEach(function(item){
        let searchText = item.getElementsByTagName('div')[0].innerText;
        let searchVal = search.value;
        let re = new RegExp(searchVal, 'gi');
        if(searchText.match(re)){
            item.style.display='block';
        }
        else{
            item.style.display='none';
        }
    })
})