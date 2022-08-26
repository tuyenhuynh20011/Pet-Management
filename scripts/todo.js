'use strict'


// đặt biến
const taskInput=document.getElementById('input-task')
const addBtn = document.getElementById('btn-add')
const todoList= document.getElementById('todo-list')

// hàm chuyển class Instancesang object
function parseTodoTask() {
	const todoData =new todoTasks(taskInput.value,currentOwner,false)
	return todoData
}

const getTodoArr = JSON.parse(getFromStorage('todoArr')) || [];
const todoArr = (x) => saveToStorage("todoArr",x)
const checkCurrentUser = JSON.parse(getFromStorage("currentUser")) || [];
let currentOwner;
checkCurrentUser.map(e=> {
    currentOwner=e.username
})
render(getTodoArr)
// xử lý logic cho nút add 
// render những todolist của user đang có trong localstorage

addBtn.addEventListener('click',() => {
    parseTodoTask()
    console.log(parseTodoTask());
    if(!taskInput.value) // kiểm tra có dữ liệu nhập vào chưa 
    {
        alert('Please enter your task')
        return;
    }
    getTodoArr.push(parseTodoTask())
    render(getTodoArr)
    todoArr(JSON.stringify(getTodoArr))
    clearTodoArr()

})
// hàm render todolist 
function render (data) {
    todoList.innerHTML=''
   
    data.map((e,index) => 
    {
       if(e.owner==currentOwner)
       {
            todoList.innerHTML+=`
            <li  onclick="checkTask(${index})" id="li-${index}">${e.task}<span id="close${index}" onclick="closetasks(${index},event)" class="close" >×</span></li>
            `
       }
       if(e.isDone==true)
       {
        document.getElementById(`li-${index}`).classList.add('checked')
       }

    })
}

// hàm xóa value đang có trên form
const clearTodoArr = () => taskInput.value=""


// hàm xử lý logic khi ấn vào row bất kỳ sẽ hiện lên đã check
// biến dữ liệu isDone trong localstorage thành true or false 
function checkTask(id)
{
    var rowlist=document.getElementById(`li-${id}`)
    if(getTodoArr[id].isDone==false)
    {
        rowlist.classList.add('checked') 
        getTodoArr[id].isDone=true;
        todoArr(JSON.stringify(getTodoArr))
    }
    else
    {
        rowlist.classList.remove('checked') 
        getTodoArr[id].isDone=false;
        todoArr(JSON.stringify(getTodoArr))
    }
}

// hàm xử lý khi ấn vào nút x trên todoList
// ấn vào xóa dữ liệu tương ứng có trong mảng ở localstorage 
// cập nhật lại ra hiển thị
function closetasks(id,event){
    event.stopPropagation();
    var closeId=document.getElementById(`close${id}`);
    getTodoArr.splice(getTodoArr[id],1)
    todoArr(JSON.stringify(getTodoArr))
    var rowlist=document.getElementById(`li-${id}`)
    rowlist.remove()

}


