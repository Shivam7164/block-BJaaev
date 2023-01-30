let inputText = document.querySelector("[type=text]")
let root = document.querySelector("ul")
let allActivity = document.querySelector(".activity")
let a = document.querySelector("a")
let icon = document.querySelector("i")

let allData = JSON.parse(localStorage.getItem("todos")) || [];

function handleInput(event) {
    let value = event.target.value
    if (event.keyCode === 13) {

        if (value === '') {
            alert('value can`t be empty')

        } else {
            let todo = {
                name: value,
                isDone: false
            }
            if (allData.length === 0) {
                todo.id = 0
            } else {
                allData.forEach((elm, i) => {
                    todo.id = ++i
                })
            }
            allData.push(todo)
            event.target.value = ""
            createUI(allData)
        }
    }
    localStorage.setItem("todos",
        JSON.stringify(allData))
}

inputText.addEventListener("keyup", handleInput)


// handleDelete
function handleDelete(id) {
    allData.splice(id, 1)

    //updated all ids
    allData.map((elm, i) => elm.id = i)

    localStorage.setItem("todos",
        JSON.stringify(allData))
    createUI(allData)
}

// handleChange
function handleChange(event) {
    let id = event.target.dataset.id;
    // console.log(id);
    allData[id].isDone = !allData[id].isDone
    localStorage.setItem("todos", JSON.stringify(allData))
    createUI(allData)
}
// doubleClick
function doubleClick(e , ele, id){
    let p = e.target
   let input = document.createElement("input")
   input.value = ele
   
   e.target.parentElement.replaceChild(input,p)

input.addEventListener('keyup', function (e) {
   if(e.keyCode === 13){
    e.target.parentElement.replaceChild(p,e.target)
    p.innerText = input.value
 allData = allData.filter((e,i) =>{
    if(e.id == id){
        e.name = input.value
        e.id = i
        return e
    }else{
        e.id = i
        return e
    }
 })
 localStorage.setItem("todos",JSON.stringify(allData))
 createUI(allData)
   } 
});

}

function createUI(data) {
    allActivity.innerHTML = ''
    root.innerHTML = ""
    data.forEach((ele, index) => {
        let li = document.createElement("li")
        let input = document.createElement("input")
        input.type = "checkbox"
        input.checked = ele.isDone
        input.setAttribute("data-id", index)
        input.addEventListener("input", handleChange)
        let p = document.createElement("p")
        input.checked ?    p.classList.add('lineThrough'):   p.classList.remove('lineThrough')
        p.innerText = ele.name
p.addEventListener('dblclick', (e) => doubleClick (e,ele.name,ele.id))
        let span = document.createElement("span")
        span.setAttribute("data-id", data.indexOf(ele))
        span.innerText = "X"
        span.addEventListener("click", (e) => handleDelete(ele.id))
        li.append(input, p, span)
        root.append(li)
    })
    activity()
}


// filter active 
function activeData() {
    createUI(allData.filter(e => !e.isDone))
}


// filter completed
function filterCompleted() {
    createUI(allData.filter(e => e.isDone))
}

// filter all
function allValue() {
    createUI(allData)
}

// clear data
function allCompletedData() {
    let d = allData.filter(e => !e.isDone)
    localStorage.setItem('todos', JSON.stringify(d))
    allData = d

    //updated all ids
    allData.map((elm, i) => elm.id = i)
    createUI(allData)
}

function clickAll(){
  let r = allData.every((elm)=>elm.isDone===true)
     if(r){
        allData.forEach((elm)=> elm.isDone=false)
     }else{
        allData.forEach((elm)=> elm.isDone=true)
     }
    
    createUI(allData)
}

icon.addEventListener("click", clickAll)

function activity() {
    let Item = document.createElement("h2")
    let d = allData.filter(e => {
        if(e.isDone === false){
           return `${e.isDone}`
        }
    })
    Item.innerText = `${d.length} item left`
    let all = document.createElement("h2")
    all.innerText = "all"
    all.addEventListener("click", allValue)
    let active = document.createElement("h2")
    active.innerText = "active"
    active.addEventListener("click", activeData)
    let completed = document.createElement("h2")
    completed.innerText = "completed"
    completed.addEventListener("click", filterCompleted)
    let allCompleted = document.createElement("h2")
    allCompleted.innerText = "clear"
    allData.some((todo) => todo.isDone === true) ? allCompleted.classList.remove('display') : allCompleted.classList.add('display')
    allCompleted.addEventListener("click", allCompletedData)
    allData.length === 0 ? allActivity.innerHTML="" : allActivity.append(Item, all, active, completed, allCompleted)
}




