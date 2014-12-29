$(document).ready(function() {
    var query = new Parse.Query("Classes");
    query.find().then(function(results) {
        for(var i = 0; i < results.length; i++) {
            console.log(results[i].attributes.username);
            $('#classes-table-add').append('<tr id="' + results[i].attributes.username + '"><td>' + results[i].attributes.username + '</td><td><a class="action-btn" href="javascript:chooseNewRole(\'' + results[i].attributes.username + '\')"><span class="glyphicon glyphicon-user"></span></a><a class="action-btn" href="javascript:confirmDelete(\'' + results[i].attributes.username + '\')"><span class="glyphicon glyphicon-trash"></span></a></td></tr>');
        }
        console.log(results);
    }, function(error) {
        console.log(error);
    });

});