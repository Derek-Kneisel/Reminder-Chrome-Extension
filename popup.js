//
// let changeColor = document.getElementById('changeColor');
//
// chrome.storage.sync.get('color', function(data) {
//   changeColor.style.backgroundColor = data.color;
//   changeColor.setAttribute('value', data.color);
// });
//
// changeColor.onclick = function(element) {
//   let color = element.target.value;
//   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     chrome.tabs.executeScript(
//         tabs[0].id,
//         {code: 'document.body.style.backgroundColor = "' + color + '";'});
//   });
// };

document.body.onload = function() {

    // Holds reminders
    let reminders = [];
    // Holds due dates
    let dueDates = [];

    // Gets number of reminders for looping through storage
    // let numReminders = parseInt(document.getElementById('numReminders').innerHTML);

    // Gets the reminders from storage
    chrome.storage.sync.get('reminders', function(items) {
        if (!chrome.runtime.error) {
            // console.log(Object.values(items));
            reminders = items.data;
            // reminders.push(Object.values(items)[0]);
        }
    });
    // Gets the due dates from storage
    chrome.storage.sync.get('dueDate', function(items) {
        if (!chrome.runtime.error) {
            dueDates.push(Object.values(items)[0]);
        }
    });
    
    console.log(reminders);
    // console.log(dueDates);

};

// Add reminder button
let addReminder = document.getElementById('addReminderButt');
// Add reminder on click event
addReminder.addEventListener('click', function () {
    // Gets data from inputted reminder and inputted due date
    let reminder = document.getElementById('inputedReminder').value;
    let dueDate = document.getElementById('inputedDueDate').value;

    // Gets number of reminders for looping through storage
    // let numReminders = parseInt(document.getElementById('numReminders').innerHTML);
    // numReminders += 1;
    // Makes an incremented key
    // let key = numReminders.toString();

    // Stores reminders
    let reminders = [];

    console.log('reminders BEFORE get current:');
    console.log(reminders);

    // Gets the current reminders
    chrome.storage.sync.get("reminders", function(items) {
        if (!chrome.runtime.error) {
            reminders = items.data;
        }
    });

    console.log('reminders AFTER get current:');
    console.log(reminders);

    // Adds the new reminder
    reminders.push(reminder);

    console.log('reminders AFTER adding NEW reminder:');
    console.log(reminders);

    // Saves the data (reminders and due dates) with storage api
    chrome.storage.sync.set({reminders: reminders}, function() {
        console.log('Value is set to ' + reminders);
    });
    chrome.storage.sync.set({'dueDate': dueDate}, function() {
        console.log('dueDate is set to ' + dueDate);
    });

}, false);

/*
 Tracking changes made to a data object, you can add a listener to its onChanged event
 Whenever anything changes in storage, that event fires
 */
chrome.storage.onChanged.addListener(function(changes, namespace) {
    for (var key in changes) {
        var storageChange = changes[key];
        console.log('Storage key "%s" in namespace "%s" changed. ' +
            'Old value was "%s", new value is "%s".',
            key,
            namespace,
            storageChange.oldValue,
            storageChange.newValue);
    }
});

