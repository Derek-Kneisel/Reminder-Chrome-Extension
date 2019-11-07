
document.body.onload = function() {



};

// Add reminder button
let addReminder = document.getElementById('addReminderButt');
// Add reminder on click event
addReminder.addEventListener('click', function () {

    // Gets data from inputted reminder and inputted due date
    let reminder = document.getElementById('inputedReminder').value;
    let dueDate = document.getElementById('inputedDueDate').value;

    chrome.storage.sync.get({savedReminders: []}, function (result) {

        console.log(result.savedReminders);

    });

    reminderID = reminder;

    // Saving data to storage
    // by passing an object you can define default values e.g.: []
    chrome.storage.sync.get({savedReminders: []}, function (result) {
        // the input argument is ALWAYS an object containing the queried keys
        // so we select the key we need
        var remindersTest = result.savedReminders;

        console.log('type of data structure: ' + typeof remindersTest);

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

}, false);


// Delete reminder
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

        // set the new array value to the same key
        chrome.storage.sync.set({savedReminders: reminders}, function () {
            // you can use strings instead of objects
            // if you don't  want to define default values
            chrome.storage.sync.get('savedReminders', function (result) {
                // console.log(result.savedReminders)
            });
        });
    });

});

