var datetimeLocal = $('#firstTrainTime')
datetimeLocal.on('focus', function (event) {
    this.type = 'datetime-local';
    this.focus();
});

var config = {
    apiKey: "AIzaSyCGIhsz7MZpUMNSfl1x0vbixXOfd5AJzHk",
    authDomain: "train-dial.firebaseapp.com",
    databaseURL: "https://train-dial.firebaseio.com",
    projectId: "train-dial",
    storageBucket: "train-dial.appspot.com",
    messagingSenderId: "1008326484759"
};

firebase.initializeApp(config);
var dataRef = firebase.database();

var trainName = "";
var destination = "";
var firstTrain = 0;
var frequency = 0;
var minAway = 0;
var count = 0;
var key;
var idCount=0;

$('#add-train-btn').on('click', function(event) {
    event.preventDefault();

    trainName = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    firstTrain = $("#first-train").val().trim();
    frequency = $('#frequency').val().trim();

    if (!('idCount' in localStorage)) {
        console.log('idCount does not exist in local storage');
        localStorage.setItem("idCount", count);
    } else {
        count = parseInt(localStorage.getItem('idCount')) + 1;
        // localStorage.setItem('idCount', idCount++);
        localStorage.setItem("idCount", count);
        
        console.log(localStorage.getItem('idCount'));
    }

    idCount = parseInt(localStorage.getItem('idCount'));

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % frequency;
    var tMinutesTillTrain = frequency - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");

    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    nextArrival = moment(nextTrain).format('hh:mm');


    dataRef.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        nextArrival: nextArrival,
        minAway: tMinutesTillTrain,
        count: idCount
    })

});

dataRef.ref().on("child_added", function(childSnapshot) {
    itemCount = childSnapshot.val().count;

    $("#table-body").append("<tr class='table-content' id='" + itemCount + "'><td class='train-name'> " + childSnapshot.val().trainName +
      " </td><td class='destination'> " + childSnapshot.val().destination +
        " </td><td class='frequency'> " + childSnapshot.val().frequency + 
          " </td><td class='next-arrival'> " + childSnapshot.val().nextArrival + 
          " </td><td class='min-away'> " + childSnapshot.val().minAway + 
          " </td><td><button type='submit' class='delete-item-btn' id='" + itemCount + "'>Delete</button></td></tr>");

  // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});


$('#delete-btn').on('click', function() {
    dataRef.ref().remove();
    console.log('success?');
    $('#table-body').empty();

    localStorage.clear();
    count = 0;
});


$(document).on('click', '.delete-item-btn', function() {
    var item = parseInt($(this).attr('id'), 10);
    var buttonNum = (item +0);

    console.log('button is clicked, the itemCount for this item is: ' + buttonNum);
    alert(buttonNum);

    dataRef.ref().orderByChild('count').equalTo(buttonNum).on("child_added", function(snapshot) {
        console.log(snapshot.key);
        key = snapshot.key;
    });

    dataRef.ref().child(key).remove();
    console.log('success?');

    var removeHtml = $('.table-content#' + buttonNum);
    removeHtml.remove();


});