var datetimeLocal = $('#firstTrainTime')
datetimeLocal.on('focus', function (event) {
    this.type = 'datetime-local';
    this.focus();
});