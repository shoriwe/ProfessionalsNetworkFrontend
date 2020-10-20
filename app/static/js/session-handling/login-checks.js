function handle_login(e){
    var result = {};
    var username_argument = "username=" + encodeURIComponent(document.getElementById("username-input-field").value);
    var password_argument = "password=" + encodeURIComponent(document.getElementById("password-input-field").value);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/login", false);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        result = JSON.parse(xhr.responseText);
    }}
    xhr.send(username_argument + "&" + password_argument);
    if (result["Error"] === undefined) {
        document.cookie = "session=" + result["Cookie"];
        window.location.href = "/dashboard";
    } else {
        document.getElementById("login-failed-message-id").style.display = "block";
    }
    result = null;
    username_argument = null;
    password_argument = null;
    xhr = null;
    return false;
}
