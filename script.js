const inputBox = document.getElementById('inputBox');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

let editTodo= null;

//add function todo
const addTodo = () => {
    const inputText = inputBox.value.trim();
    if (inputText.length <= 0) {
        alert("you must write something in your list");
        return false;

    }
  
    if(addBtn.value ==="Edit"){
        editLocalTodos(editTodo.target.previousElementSibling.innerHTML);
        editTodo.target.previousElementSibling.innerHTML=inputText;
        addBtn.value="ADD"
        inputBox.value ="";
    }
    else{

    //create p tag list
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.innerHTML = inputText;
    li.appendChild(p);

  //create edit btn
    const editBtn = document.createElement("button");
    editBtn.innerHTML = "Edit"
    editBtn.classList.add("btn" , "editBtn")
    li.appendChild(editBtn)
    
    //create delete btn
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Remove"
    deleteBtn.classList.add("btn" , "deleteBtn") 
    li.appendChild(deleteBtn)
    
    
    todoList.appendChild(li);
    inputBox.value = "";

    saveLocalTodos(inputText);
    }

}
//function to update delete &edit
const updateTodo=(e)=>{
   //console.log(e.target.innerHTML)
   if(e.target.innerHTML === "Remove"){
    // console.log(e.target.parentElement);
    todoList.removeChild(e.target.parentElement);
    deleteLocalTodos(e.target.parentElement);
   }

   //edit button
   if(e.target.innerHTML === "Edit"){
    inputBox.value= e.target.previousElementSibling.innerHTML;
    inputBox.focus();
    addBtn.value = "Edit";
    editTodo= e;

   }
 }

 // function to save  local storage
 const saveLocalTodos= (todo )=>{
    let todos;
    if(localStorage.getItem("todos")=== null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"));

    }
    todos.push(todo);
      localStorage.setItem("todos", JSON.stringify(todos))

    // console.log(todos);
 }

 //function to get todo 
 const getLocalTodos=()=>{
    let todos;
    if(localStorage.getItem("todos")=== null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"));
        todos.forEach(todo => {

     //create p tag list
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.innerHTML = todo;
    li.appendChild(p);

  //create edit btn
    const editBtn = document.createElement("button");
    editBtn.innerHTML = "Edit"
    editBtn.classList.add("btn" , "editBtn")
    li.appendChild(editBtn)
    
    //create delete btn
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Remove"
    deleteBtn.classList.add("btn" , "deleteBtn") 
    li.appendChild(deleteBtn);
    
    
    todoList.appendChild(li); 
        });

    }

 }

 //function to delete local todod
 const deleteLocalTodos=(todo)=>{
    let todos;
    if(localStorage.getItem("todos")=== null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"));

    }
    let todoText= todo.children[0].innerHTML;
    let todoIndex =todos.indexOf(todoText);
    //slice/spice -- array function
    todos.splice(todoIndex , 1);
    localStorage.setItem("todos" , JSON.stringify(todos));
    console.log(todoIndex);
 }

 const editLocalTodos=(todo)=>{
    let todos=JSON.parse(localStorage.getItem("todos"));
    let todoIndex=todos.indexOf(todo);
    todos[todoIndex]=inputBox.value;
    localStorage.setItem("todos", JSON.stringify(todos));

 }
document.addEventListener('DOMContentLoaded', getLocalTodos);
addBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', updateTodo);
