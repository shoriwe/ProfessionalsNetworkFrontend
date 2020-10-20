function check_name(){
    if (document.getElementById("name-input-field").value.length === 0) {
        document.getElementById("register-failed-message-id").style.display = "block";
        document.getElementById("register-failed-message-id").innerHTML  = "Name can't be empty";
        return false;
    }
    return true;
}

function check_username(){
    if (document.getElementById("username-input-field").value.length < 4){
        document.getElementById("register-failed-message-id").style.display = "block";
        document.getElementById("register-failed-message-id").innerHTML = "Username need to be of at least four characters";
        return false;
    }
    return true;
}

function check_password(){
    if (document.getElementById("password-input-field").value === document.getElementById("password-confirmation-input-field").value) {
        if (document.getElementById("password-input-field").value.length >= 8) {
            if (document.getElementById("password-input-field").value.match(/[A-Z]/g) !== null){
                if (document.getElementById("password-input-field").value.match(/[a-z]/g) !== null){
                    if (document.getElementById("password-input-field").value.match(/[0-9]/g) !== null){
                        if (document.getElementById("password-input-field").value.match(/[!@#$%^&\*()_+\-=[\]\{\}\|;\':\",.\\/<>?`~]/g) !== null){
                            return true;
                        } else {
                            document.getElementById("register-failed-message-id").innerHTML = "Password need at least one special character";
                        }
                    } else {
                        document.getElementById("register-failed-message-id").innerHTML = "Password need at least one number";
                    }
                } else {
                    document.getElementById("register-failed-message-id").innerHTML = "Password need to have at least one lower char";
                }
            } else {
                document.getElementById("register-failed-message-id").innerHTML = "Password need to have at least one upper char";
            }
        } else {
            document.getElementById("register-failed-message-id").innerHTML = "Password length need to be of at least eight characters";
        }
    } else {
        document.getElementById("register-failed-message-id").innerHTML = "Password confirmation doesn't match";
    }
    document.getElementById("register-failed-message-id").style.display = "block";
    return false;
}

function check_email(){
    if (document.getElementById("email-input-field").value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) === null){
        document.getElementById("register-failed-message-id").style.display = "block";
        document.getElementById("register-failed-message-id").innerHTML = "Invalid email!";
        return false;
    }
    return true;
}

function check_account_type(){
    if (document.getElementById("professional-type-field").checked){
        return true;
    } else if (document.getElementById("contractor-type-field").checked){
        return true;
    } else {
        document.getElementById("register-failed-message-id").style.display = "block";
        document.getElementById("register-failed-message-id").innerHTML = "Please select one type of account (professional, contractor)";
    }
    return false;
}

function check_input_fields(){
    if (check_name()){
        if (check_username()){
            if (check_password()){
                if (check_email()){
                    return check_account_type();
                }
            }
        }
    }
    return false;
}

function handle_register(e){
    if (check_input_fields()){
        var result = {};
        var name_argument = "name=" + encodeURIComponent(document.getElementById("name-input-field").value);
        var username_argument = "username=" + encodeURIComponent(document.getElementById("username-input-field").value);
        var password_argument = "password=" + encodeURIComponent(document.getElementById("password-input-field").value);
        var password_confirmation_argument = "password-confirmation=" + encodeURIComponent(document.getElementById("password-confirmation-input-field").value);
        var email_argument = "email=" + encodeURIComponent(document.getElementById("email-input-field").value);
        var country_code = "country-code=" + encodeURIComponent(document.getElementById("country-code").value.substring(5, document.getElementById("country-code").value.length));
        var phone_number_argument = "phone-number=" + encodeURIComponent(document.getElementById("phone-number-input-field").value);
        var account_type_argument = null;
        if (document.getElementById("professional-type-field").checked) {
            account_type_argument = "account-type=Professional";
        } else {
            if (document.getElementById("contractor-type-field").checked) {
                account_type_argument = "account-type=Contractor";
            } else {
                return false;
            }
        }
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/register", false);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                result = JSON.parse(xhr.responseText);
            }
        }
        xhr.send(name_argument + "&" + username_argument + "&" + password_argument + "&" + password_confirmation_argument + "&" + email_argument + "&" + country_code + "&" + phone_number_argument + "&" + account_type_argument);
        if (result["Error"] === undefined) {
            window.location.href = "/register/confirmation";
        } else {
            document.getElementById("register-failed-message-id").style.display = "block";
            document.getElementById("register-failed-message-id").innerHTML = result["Error"];
        }
        result = null;
        name_argument = null;
        username_argument = null;
        password_argument = null;
        password_confirmation_argument = null;
        email_argument = null;
        phone_number_argument = null;
        account_type_argument = null;
        xhr = null;
    }
    return false;
}