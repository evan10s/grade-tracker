$(document).ready(function() {
    var query = new Parse.Query(Parse.User);
    query.find().then(function(results) {
        for(var i = 0; i < results.length; i++) {
            console.log(results[i].attributes.username);
            $('#user-table-add').append('<tr id="' + results[i].attributes.username + '"><td>' + results[i].attributes.username + '</td><td><a class="action-btn" href="javascript:chooseNewRole(\'' + results[i].attributes.username + '\')"><span class="glyphicon glyphicon-user"></span></a><a class="action-btn" href="javascript:confirmDelete(\'' + results[i].attributes.username + '\')"><span class="glyphicon glyphicon-trash"></span></a></td></tr>');
        }
        console.log(results);
    }, function(error) {
        console.log(error);
    });
    
});

function deleteUser(user) {
    //Cloud Code function to delete user
    console.log('deleteUser function ran');
    $('#final-delete-confirm').button('loading');
    Parse.Cloud.run('deleteUser', { userToDelete: user },
                    {success: function (result) {
                        console.log("User deleted");
                        $('#delete-user').modal('hide');
                        $('#' + user).remove();
                        $('#final-delete-confirm').button('reset');
                    },
                    error: function (error) {
                        console.log("Problem deleting the user: " + error);
                        $('#final-delete-confirm').button('error');
                    }}
    
    );
}

function confirmDelete(user) {
    $('#delete-user-modal-message').empty().append("<strong>Really delete " + user + "?</strong> <br /> <br /> Deleting a user only removes his or her access rights.  User data will <strong>not</strong> be deleted.");
    $('#final-delete-confirm').empty().append("Delete " + user).attr("href","javascript:deleteUser('" + user + "')");
    $('#delete-user').modal('show');
}

function chooseNewRole(user) {
    $('#change-role-modal-title').empty().append("Select new role for " + user);
    /*Make active selection user's current role
    - Admins cannot change their own role (show error message instead of modal?  Don't show icon at all?)
    */
    $('#change-user-role').modal('show');
    $('#save-new-role'). attr("href", "javascript:changeRole('" + user + "')")
    //Cloud Code function to change role - needs to only work for admins
}

function changeRole(user) {
    var role = $('input[name="role-choices"]:checked').val();
    Parse.Cloud.run('changeRole', { user: user, role: role }, {
        success: function (result) {
            console.log("Role changed")
        },
        error: function (error) {
            console.log("Problem changing role: " + error);
            $('#save-new-role').button('error');
        }
    })
}