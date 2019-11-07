
document.body.onload = function() {

    // Displays all stored reminders
    displayAllReminders();
    
};

// Add reminder button
let addReminder = document.getElementById('addReminderButt');
// Add reminder on click event
addReminder.addEventListener('click', function () {

    // Gets user inputted reminder and inputted due date
    let reminderID = document.getElementById('inputedReminder').value;
    let dueDate = document.getElementById('inputedDueDate').value;

    // Saves the users reminder to Chrome Storage
    saveReminder(reminderID, dueDate);

    // Displays the reminder to the screen
    displayReminder(reminderID, dueDate);


}, false);

// Saves reminder to Chrome storage
function saveReminder(reminderID, dueDate) {

    // Gets currently saved reminders/due dates
    chrome.storage.sync.get({savedReminders: []}, function (result) {
        console.log(result.savedReminders);
    });

    // Saving data to storage
    // by passing an object you can define default values e.g.: []
    chrome.storage.sync.get({savedReminders: []}, function (result) {
        // the input argument is ALWAYS an object containing the queried keys
        // so we select the key we need
        let remindersTest = result.savedReminders;

        remindersTest.push({reminderID: reminderID, dueDate: dueDate});
        // set the new array value to the same key
        chrome.storage.sync.set({savedReminders: remindersTest}, function () {
            // you can use strings instead of objects
            // if you don't  want to define default values
            chrome.storage.sync.get('savedReminders', function (result) {
                // console.log(result.savedReminders)
            });
        });
    });
}

// Displays all reminders (when user clicks on extension)
function displayAllReminders(){

    // By passing an object you can define default values e.g.: []
    chrome.storage.sync.get({savedReminders: []}, function (result) {
        // The input argument is ALWAYS an object containing the queried keys
        // so we select the key we need
        let reminders = result.savedReminders;

        // Removes element from reminders/due dates array
        for (let i = 0; i < reminders.length; i++) {
            // Displays reminder
            // console.log("reminderID: " + reminders[i].reminderID + "dueDate: " + reminders[i].dueDate);
            displayReminder(reminders[i].reminderID, reminders[i].dueDate);
        }
    });
}

// Displays indiviudal reminder to screen
function displayReminder(reminderID, dueDate) {

    // Gets table element
    let table = document.getElementById('font1');

    // Creates new row
    let row = table.insertRow(0);

    // Creates new cell
    let cell = row.insertCell(0);
    // Displays reminder data in cell
    cell.innerHTML = reminderID;

    let butt = document.createElement('button');
    // Styling
    butt.setAttribute("style", "background: #212121; height: 21px; width: 21px; border-radius: 50%; border: 1px solid deepskyblue; float: right;");
    cell.appendChild(butt);

    // Creates paragraph element for due date
    let para = document.createElement('p');
    // Styling
    para.setAttribute("style", "color:beige; font-family: Verdana; font-size: 11px; font-weight: lighter;");
    para.innerHTML = dueDate;
    // Inserts due date into row
    cell.appendChild(para);

}

// Deletes all reminders
function deleteAllReminders(){
    chrome.storage.sync.clear();
}

// Delete all reminders button, used for testing
let removeAllReminders = document.getElementById('removeReminderButt');
removeAllReminders.addEventListener('click', function () {
    deleteAllReminders();
});

// Delete reminder
/*
let removeReminder = document.getElementById('removeReminderButt');
removeReminder.addEventListener('click', function() {

    reminderID = 'testR';
    dueDate = 'testD';

    // Delete data
    // By passing an object you can define default values e.g.: []
    chrome.storage.sync.get({savedReminders: []}, function (result) {
        // The input argument is ALWAYS an object containing the queried keys
        // so we select the key we need
        let reminders = result.savedReminders;

        // Removes element from reminders/due dates array
        for (let i = 0; i < reminders.length; i++) {
            if (reminders[i].reminderID === reminderID) {
                console.log('got here:', reminders[i].reminderID);
                reminders.splice(i, 1);
            }
        }

        // Set the new array value to the same key
        chrome.storage.sync.set({savedReminders: reminders}, function () {
            // You can use strings instead of objects
            // If you don't  want to define default values
            chrome.storage.sync.get('savedReminders', function (result) {

            });
        });
    });

});
*/

