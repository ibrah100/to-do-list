console.log( 'js' );

$( document ).ready( function(){
    console.log( 'JQ' );
    getTasks();
    $('body').on('click', '#addTaskButton', saveTasks);
    $('body').on('click', '.completeButton', markTaskAsCompleted);
    $('body').on('click', '.deleteButton', deleteTask);

}); // end doc ready

function getTasks(){
  console.log( 'in getTasks' );
  // ajax call to server to get tasks
  $.ajax({
    method: 'GET',
    url: '/tasks'
  }).then( (response) => {
    $('#toDoList').empty();
    for (let i = 0; i < response.length; i++) {
        if (response[i].complete === true) {
            $('#toDoList').append(`
                <li class="list-group-item" data-id="${response[i].id}">
                    <span class="complete">${response[i].task}</span>
                    <button class="completeButton btn btn-outline-dark">✅</button>
                    <button class="deleteButton btn btn-outline-dark">🗑️</button> 
                </li>
            `)
        } else {
            $('#toDoList').append(`
                <li class="list-group-item" data-id="${response[i].id}">
                    ${response[i].task}
                    <button class="completeButton btn btn-outline-dark">🔲</button>
                    <button class="deleteButton btn btn-outline-dark">🗑️</button> 
                </li>
            `)
        }
      }
  }).catch( (error) => {
    console.log('Error in GET /tasks client side', error)
  });
} // end getTasks

function saveTasks(){
   
    console.log('in addTaskButton on click');
    
    // get user input and put in an object
    let newTask = $('#taskInput').val();
    console.log('Here is your new task: ' + newTask);

    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: {
            task: newTask,
            complete: false
        }
      }).then( (response) => {
        console.log(response);
        getTasks();
      }).catch( (error) => {
        console.log('Error in POST /tasks client side', error)
      })
       
}

function markTaskAsCompleted(){
    console.log('Task is completed');
    let idToUpdate = $(this).parent().data().id;
    console.log(idToUpdate);

    $.ajax({
        method: 'PUT',
        url: `/tasks/${idToUpdate}`,
        data: {
        complete: true,
        },
    }).then((response) => {
        getTasks();
    }).catch(function (error) {
        console.log("Error in PUT /tasks on client side", error);
        });
}

function deleteTask(){
    let idToDelete = $(this).parent().data().id;
    console.log(idToDelete);

    $.ajax ({
        method: 'DELETE',
        url: `/tasks/${idToDelete}`
    }).then ((res) => {
        getTasks();
    }).catch((error) => {
        console.log('error in DELETE /tasks on client side', error);
    })
}



