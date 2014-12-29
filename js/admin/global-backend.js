//change these to those listed in your Parse account
Parse.initialize("your Parse Application ID here", "Your Parse Javascript Key here");

/*Issues / TODO:
1. show user's name in some form in the navbar

/*$(document).ready(function () {
    $('#user-logout').prepend("<p>Hey, " + Parse.User.current().attributes.username + "</p>");
});*/

if (!Parse.User.current()) {
    window.location.href = "../login.html";
}

function logOut() {
    Parse.User.logOut();
    window.location.href = "../login.html";
};