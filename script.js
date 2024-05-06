//Ask user to allow notification access
// Function to request notification permission
function requestNotificationPermission() {
    Notification.requestPermission().then(function(permission) {
        if (permission !== "granted") {
            alert("Please allow notification access!");
            // You may want to handle the case where permission is not granted more gracefully than reloading the page.
            // For example, you could provide alternative functionality or guide the user on how to enable notifications.
            location.reload(); // This might cause an infinite loop if permission is repeatedly denied.
        }
    }).catch(function(err) {
        console.error('Notification permission request failed:', err);
        // Handle the error more gracefully. You might want to inform the user that notification permission could not be requested.
    });
}

// Check if Notification API is supported and request permission when a button is clicked
if ("Notification" in window) {

    document.getElementById("requestPermissionButton").addEventListener("click", function() {
        requestNotificationPermission();
    });
} else {
    // Handle the case where Notification API is not supported.
    console.error('Notification API is not supported');
   
}



var timeoutIds = [];

function scheduleRemiander()
{
    var title = document.getElementById("title").value;
    var description = document.getElementById("description").value;
    var date = document.getElementById("date").value;
    var time = document.getElementById("time").value;

    var dateTimeString = date + "  " + time;
    var scheduledTime = new Date(dateTimeString);
    var currentTime = new Date();
    var timeDifference = scheduledTime - currentTime;

    if(timeDifference >0)
    {
        addReminder(title,description,dateTimeString)

        var timeoutId = setTimeout(function ()
    {
        document.getElementById("notificationSound").play();
        var notification = new Notification(title,
        {
            body:description,
            icon:"bellicon"
        });
    },timeDifference);
    timeoutIds.push(timeoutId);
    }
    else{
        alert("The scheduled time is in the past!");
    }
}

function addReminder(title,description,dateTimeString)
{
    var tableBody = document.getElementById("reminderTableBody");
    var row = tableBody.insertRow();

    var titleCell = row.insertCell(0);
    var descriptionCell = row.insertCell(1);
    var dateTimeCell = row.insertCell(2);
    var actionCell = row.insertCell(3);

    titleCell.innerHTML = title;
    descriptionCell.innerHTML = description;
    dateTimeCell.innerHTML = dateTimeString;
    actionCell.innerHTML = '<button onclick = "deleteReminder(this);">Delete</button>';
}

function deleteReminder(button)
{
    var row = button.closest("tr")
    var index = row.rowIndex;
    clearTimeout(timeoutIds[index - 1]);
    timeoutIds.splice(index - 1,1);
    row.remove();
}