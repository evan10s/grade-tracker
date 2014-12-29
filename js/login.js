//change these to those listed in your Parse account
Parse.initialize("your Parse Application ID here", "Your Parse Javascript Key here");
var badLogin = '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span> The username or password you entered was invalid. (',
    requestTimedOut = '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span> We couldn\'t log you in because the request timed out.  Check your internet connection.',
    badConnection = '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span> We couldn\'t log you in because of a problem with your internet connection.  Check your internet connection.',
    otherError = '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span> We couldn\'t log you in because of an error: ';

function login() {
    $('#sign-in').button('loading');
    var username = $("#username").val();
    var password = $("#password").val();

    Parse.User.logIn(username, password, {
    success: function(user) {
            
            username = "";
            password = "";
            window.location.href = "index.html";
        },
        error: function(user, error) {
            $('#sign-in').button('reset');
            username = "";
            password = "";
            if(error.message === "invalid login parameters")
            {
                if(!$('#bad-login').hasClass('hidden')) //If there is already an error message being displayed...
                {
                    $('#bad-login').empty().append(badLogin + error.code + ")");
                }
                else //Otherwise,...
                {
                    $('#bad-login').removeClass('hidden').append(badLogin + error.code + ")");
                    //...there is no error message being displayed; so the error message can be displayed with no other action needed.
                }
            }
            else if(Parse.Error.TIMEOUT)
            {
                if(!$('#bad-login').hasClass('hidden')) //If there is already an error message being displayed...
                {
                    $('#bad-login').empty().append(requestTimedOut + error.code + ")"); //...then remove the previous error and display the new error message. 
                }
                else //Otherwise,...
                {
                    $('#bad-login').removeClass('hidden').append(requestTimedOut + error.code + ")");
                    //...there is no error message being displayed; so the error message can be displayed with no other action needed.
                }
            }
            else if(Parse.Error.CONNECTION_FAILED)
            {
                if(!$('#bad-login').hasClass('hidden')) //If there is already an error message being displayed...
                {
                    $('#bad-login').empty().append(badConnection + error.code + ")"); //...then remove the previous error and display the new error message. 
                }
                else //Otherwise,...
                {
                    $('#bad-login').removeClass('hidden').append(badConnection + error.code + ")");
                    //...there is no error message being displayed; so the error message can be displayed with no other action needed.
                }
            }
            else //A different error than the ones above occurred.
            {
                if(!$('#bad-login').hasClass('hidden')) //If there is already an error message being displayed...
                {
                    $('#bad-login').empty().append(otherError + error.message + " (" + error.code + ")");
                }
                else //Otherwise,...
                {
                    $('#bad-login').removeClass('hidden').append(otherError + error.message + " (" + error.code + ")");
                    //...there is no error message being displayed; so the error message can be displayed with no other action needed.
                }
            }
        }
    })
}