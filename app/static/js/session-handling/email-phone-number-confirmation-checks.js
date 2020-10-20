function handle_confirmation(e){
    var url = new URL(window.location.href );
    var username_hash = url.searchParams.get("username-hash");
    var email_key = url.searchParams.get("email-key");
    var result = {};
    var username_hash_argument = "username-hash=" + encodeURIComponent(username_hash);
    var email_key_argument = "email-key=" + encodeURIComponent(email_key);
    var sms_key_argument = "sms-key=" + encodeURIComponent(document.getElementById("sms-key").value);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/email/phone/number/change/confirmation", false);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        result = JSON.parse(xhr.responseText);
    }}
    xhr.send(username_hash_argument + "&" + email_key_argument + "&" + sms_key_argument);
    if (result["Error"] === undefined) {
        document.cookie = "session=" + result["Cookie"];
        window.location.href = "/dashboard";
    } else {
        document.getElementById("confirmation-failed-message-id").style.display = "block";
    }
    result = null;
    username_argument = null;
    password_argument = null;
    xhr = null;
    return false;
}
