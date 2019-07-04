
var $list, $addTaskInput, $addTaskColor;


const BASE_URL = 'http://195.181.210.249:3000/todo/';


function main() {
   
    
    prepareDOMElements();
    prepareDOMEvents();
    getTodos();
    asyncAwaitGetTodos();
}


function getTodos() {
   
    axios.get(BASE_URL)
    
        .then(res => {
            prepareInitialList(res.data);
        })
    
        .catch(err => {
            console.log('zlapalem blad w promisie');
        });
}






async function asyncAwaitGetTodos() {
    try {
 
        var result = await axios.get(BASE_URL);
   
        prepareInitialList(result.data);
    } catch (error) {
    
        console.log('zlapalem blad w async/await');
    }
}


function prepareInitialList(elements) {
  
    elements.forEach(element => {
  
        addElementToList($list, element);
    });
}


function prepareDOMElements() {
  
    $list = document.getElementById('people-list');
    $addTaskInput = document.getElementById('add-people-value');
    $addTaskColor = document.getElementById('element-color');
}


function prepareDOMEvents() {
 
    var addButton = document.getElementById('add');

    addButton.addEventListener('click', addButtonHandler);
    $list.addEventListener('click', listClickHandler);
}


function addButtonHandler() {

    axios.post(BASE_URL, {
   
        title: $addTaskInput.value,
        extra: $addTaskColor.value,
    }).then(() => {
     
        $list.innerHTML = '';
        getTodos();
    })
}


function listClickHandler(event) {
  
    if (event.target.tagName != "BUTTON") {
      
        return;
    }

  
    deleteElement(event.target.dataset.taskId);
}

function deleteElement(elementId) {

    axios.delete(BASE_URL + elementId);

    document.getElementById(elementId).remove();
}


function addElementToList($listWhereAdd, todo) {
 
    var createdElement = createListElement(todo);
  
    $listWhereAdd.appendChild(createdElement);
}


function createListElement(todo) {
  
    var newListElement = document.createElement('li');

   
    var keysWithValuesArray = Object.entries(todo);
  
    var keysWithValuesArrayWithoutNulls = keysWithValuesArray.filter(el => el[1] != null);
 
    var keysJoinedWithValuesArray = keysWithValuesArrayWithoutNulls.map(el => el[0] + ': ' + el[1]);

   
    var valueToShow = Object.entries(todo).filter(el => el[1] != null).map(el => el[0] + ': ' + el[1]).join(', ');


    
    newListElement.textContent = valueToShow;
  
    newListElement.style.color = todo.extra;
  
    newListElement.id = todo.id;


  
    var deleteButton = document.createElement('button');
    
    deleteButton.textContent = 'delete';
  
    deleteButton.dataset.taskId = todo.id;
  
    newListElement.appendChild(deleteButton);

   
    return newListElement;
}


document.addEventListener('DOMContentLoaded', main);