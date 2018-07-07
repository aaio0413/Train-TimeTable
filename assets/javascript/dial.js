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
var nextArrival = 0;
var minAway = 0;


$('#add-train-btn').on('click', function(event) {
    event.preventDefault();

    trainName = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    firstTrain = $("#first-train").val().trim();
    frequency = $('#frequency').val().trim();
    // comment = $("#comment-input").val().trim();



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
        minAway: tMinutesTillTrain
    });
});


  // Firebase watcher + initial loader HINT: .on("value")
dataRef.ref().on("child_added", function(childSnapshot) {

    $("#table-body").append("<tr class='table-content'><td class='train-name'> " + childSnapshot.val().trainName +
      " </td><td class='destination'> " + childSnapshot.val().destination +
        " </td><td class='frequency'> " + childSnapshot.val().frequency + 
          " </td><td class='next-arrival'> " + childSnapshot.val().nextArrival + 
          " </td><td class='min-away'> " + childSnapshot.val().minAway + "</td></tr>");

  // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});