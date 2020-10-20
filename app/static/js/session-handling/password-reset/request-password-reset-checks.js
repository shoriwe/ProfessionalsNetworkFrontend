function handle_reset_request(e){
    var result = {};
    var username_argument = "username=" + encodeURIComponent(document.getElementById("username-input-field").value);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/reset/password", false);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        result = JSON.parse(xhr.responseText);
    }}
    xhr.send(username_argument);
    document.getElementById("reset-password-message-id").style.display = "block";
    document.getElementById("reset-password-message-id").innerHTML = result["Success"];
    result = null;
    username_argument = null;
    password_argument = null;
    xhr = null;
    return false;
}
