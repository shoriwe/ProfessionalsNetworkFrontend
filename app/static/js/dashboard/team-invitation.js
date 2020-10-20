function accept_invitation(id) {
    var url = new URL(window.location.href );
    var invitation_key = url.searchParams.get("invitation-key");
    var field = "invitation-key";
    var success_message = "You successfully accepted the invitation"
    if (invitation_key == null) {
        invitation_key = url.searchParams.get("application-key");
        field = "application-key";
        success_message = "You successfully accepted the applicant"
    }
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/dashboard/teams/invitation", false);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            result = JSON.parse(xhr.responseText);
        }
    }
    xhr.send("accept=true&" + field + "=" + encodeURIComponent(invitation_key));
    if (result["Error"] !== undefined){
        document.getElementById("confirmation-failed-message").innerHTML = result["Error"];
        document.getElementById("confirmation-failed-message").style.display = "block";
        document.getElementById("confirmation-failed-message").style.background = "#ff3f34";
        return false;
    }
    alert(success_message);
    window.location.href = "/dashboard/teams";
    return true;
}

function decline_invitation(id) {
    var url = new URL(window.location.href );
    var invitation_key = url.searchParams.get("invitation-key");
    var field = "invitation-key";
    var success_message = "You successfully declined the invitation";
    if (invitation_key == null) {
        invitation_key = url.searchParams.get("application-key");
        field = "application-key";
        success_message = "You successfully declined the applicant";
    }
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/dashboard/teams/invitation", false);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            result = JSON.parse(xhr.responseText);
        }
    }
    xhr.send("decline=true&" + field + "=" + encodeURIComponent(invitation_key));
    if (result["Error"] !== undefined){
        document.getElementById("confirmation-failed-message").innerHTML = result["Error"];
        document.getElementById("confirmation-failed-message").style.display = "block";
        document.getElementById("confirmation-failed-message").style.background = "#ff3f34";
        return false;
    }
    alert(success_message);
    window.location.href = "/dashboard/teams";
    return true;
}
