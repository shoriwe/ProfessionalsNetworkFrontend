function check_passwords(){
    if (document.getElementById("password-input-field").value === document.getElementById("confirm-password-input-field").value) {
        if (document.getElementById("password-input-field").value.length >= 8) {
            if (document.getElementById("password-input-field").value.match(/[A-Z]/g) !== null){
                if (document.getElementById("password-input-field").value.match(/[a-z]/g) !== null){
                    if (document.getElementById("password-input-field").value.match(/[0-9]/g) !== null){
                        if (document.getElementById("password-input-field").value.match(/[!@#$%^&\*()_+\-=[\]\{\}\|;\':\",.\\/<>?`~]/g) !== null){
                            return true;
                        } else {
                            document.getElementById("reset-password-message-id").innerHTML = "Password need at least one special character";
                        }
                    } else {
                        document.getElementById("reset-password-message-id").innerHTML = "Password need at least one number";
                    }
                } else {
                    document.getElementById("reset-password-message-id").innerHTML = "Password need to have at least one lower char";
                }
            } else {
                document.getElementById("reset-password-message-id").innerHTML = "Password need to have at least one upper char";
            }
        } else {
            document.getElementById("reset-password-message-id").innerHTML = "Password length need to be of at least eight characters";
        }
    } else {
        document.getElementById("reset-password-message-id").innerHTML = "Password confirmation doesn't match";
    }
    document.getElementById("reset-password-message-id").style.display = "block";
    return false;
}


function handle_reset(e){
    if (check_passwords()){
        var url = new URL(window.location.href );
    
        var username_hash = url.searchParams.get("username-hash");
        var reset_key = url.searchParams.get("reset-key");
    
        var result = {};
        var username_hash_argument = "username-hash=" + encodeURIComponent(username_hash);
        var reset_key_argument = "reset-key=" + encodeURIComponent(reset_key);
        var password_argument = "password=" + encodeURIComponent(document.getElementById("password-input-field").value);
        var password_confirmation_argument = "password-confirmation=" + encodeURIComponent(document.getElementById("confirm-password-input-field").value);
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/reset/password", false);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            result = JSON.parse(xhr.responseText);
        }}
        xhr.send(username_hash_argument + "&" + reset_key_argument + "&" + password_argument + "&" + password_confirmation_argument);
        if (result["Error"] === undefined) {
            window.location.href = "/login";
        } else {
            document.getElementById("reset-password-message-id").style.display = "block";
            document.getElementById("reset-password-message-id").innerHTML = result["Error"];
        }
        result = null;
        username_argument = null;
        password_argument = null;
        xhr = null;
        return false;
    }
    return false;
}
