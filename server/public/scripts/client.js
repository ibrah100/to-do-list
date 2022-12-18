console.log( 'js' );

$( document ).ready( function(){
    console.log( 'JQ' );
    $('body').on('click', '#addTaskButton', saveTasks);
    $('body').on('click', '#completeButton', markTaskAsCompleted);

    getTasks();

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
        $('#toDoList').append(`
            <li data-id="${response[i].id}">
                ${response[i].task}
                <button class="completeButton">✔</button>
                <button class="deleteButton">Delete</button> 
            </li>
        `)
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
    let idToUpdate = $(this).data().id;
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

function deleteTask(){}



