function check_password(password){
    if (password.length >= 8) {
        if (password.match(/[A-Z]/g) !== null){
            if (password.match(/[a-z]/g) !== null){
                if (password.match(/[0-9]/g) !== null){
                    if (password.match(/[!@#$%^&\*()_+\-=[\]\{\}\|;\':\",.\\/<>?`~]/g) !== null){
                        return true;
                    } else {
                        document.getElementById("password-update-fail-message-id").innerHTML = "Password need at least one special character";
                    }
                } else {
                    document.getElementById("password-update-fail-message-id").innerHTML = "Password need at least one number";
                }
            } else {
                document.getElementById("password-update-fail-message-id").innerHTML = "Password need to have at least one lower char";
            }
        } else {
            document.getElementById("password-update-fail-message-id").innerHTML = "Password need to have at least one upper char";
        }
    } else {
        document.getElementById("password-update-fail-message-id").innerHTML = "Password length need to be of at least eight characters";
    }
    return false
}


function passwords_correct(old_password, new_password, new_password_confirmation) {
    if (old_password !== new_password){
        if (new_password === new_password_confirmation){
            return check_password(new_password)
        } else {
            document.getElementById("password-update-fail-message-id").innerHTML = "The new password confirmation doesn't match";
        }
    } else {
        document.getElementById("password-update-fail-message-id").innerHTML = "The old password is equal to the new one";
    }
    document.getElementById("password-update-fail-message-id").style.display = "block";
    return false
}

function send_credentials(old_password, new_password, new_password_confirmation){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/dashboard/account", false);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            result = JSON.parse(xhr.responseText);
        }
    }
    xhr.send("old-password=" + encodeURIComponent(old_password) + "&" + "new-password=" + encodeURIComponent(new_password) + "&" +  "new-password-confirmation=" + encodeURIComponent(new_password_confirmation));
    if (result["Error"] === undefined) {
        document.getElementById("password-update-fail-message-id").className = "password-update-success-message";
        document.getElementById("password-update-fail-message-id").innerHTML = "Password updated successfully";
        document.getElementById("password-update-fail-message-id").style.display = "block";
        return true;
    }
    document.getElementById("password-update-fail-message-id").innerHTML = result["Error"];
    document.getElementById("password-update-fail-message-id").style.display = "block";
    return false;
}

function update_password(event) {
    document.getElementById("password-update-fail-message-id").className = "password-update-fail-message";
    var old_password = document.getElementById("old-password").value;
    var new_password = document.getElementById("new-password").value;
    var new_password_confirmation = document.getElementById("new-password-confirmation").value;
    if (passwords_correct(old_password, new_password, new_password_confirmation)){
        send_credentials(old_password, new_password, new_password_confirmation);
    }
    document.getElementById("old-password").value = "";
    document.getElementById("new-password").value = "";
    document.getElementById("new-password-confirmation").value = "";
    return false;
}