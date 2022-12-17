console.log( 'js' );

$( document ).ready( function(){
    console.log( 'JQ' );
    setupClickListeners();
    getTasks();

}); // end doc ready

function getTasks(){
  console.log( 'in getTasks' );
  // ajax call to server to get tasks
  $.ajax({
    method: 'GET',
    url: '/weekend-to-do-app'
  }).then( (response) => {
    $('#toDoList').empty();
    for (let i = 0; i < response.length; i++) {
        $('#toDoList').append(`
            <li data-id="${response[i].id}">
                ${response[i].task}
                <button class="completeButton">Complete?</button>
                <button class="deleteButton">Delete</button> 
            </li>
        `)
      }
  }).catch( (error) => {
    console.log('Error in GET /weeknd-to-do-app client side', error)
  });
} // end getTasks

function setupClickListeners(){
    $('#addTaskButton').on('click', function(){
        console.log('in addTaskButton on click');
        // get user input and put in an object
        let newTask = $('#taskInput').val();
    
        let taskToSend = {
            task: newTask,
            complete: false,
        }

        saveTasks(taskToSend);
        
    });
}

function saveTasks(newTask){
    console.log('in saveTasks', newTask);
    
    $.ajax({
        method: 'POST',
        url: '/weeknd-to-do-app',
        data: newTask
      }).then( (response) => {
        console.log(response);
      }).catch( (error) => {
        console.log('Error in POST /weekend-to-do-app client side', error)
      })
       
    
}

function markTaskAsCompleted(){}

function deleteTask(){}



