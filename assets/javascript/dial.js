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
storageBucket: "",
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
    trainName = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    firstTrain = $("#first-train").val().trim();
    frequency = $('#frequency').val().trim();
    comment = $("#comment-input").val().trim();
})