async function remove_professional(id) {
    var url = new URL(window.location.href );
    var professional_id = url.searchParams.get("professional-id");
    var team_name = url.searchParams.get("team-name");
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/dashboard/teams/view", false);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            result = JSON.parse(xhr.responseText);
        }
    }
    xhr.send("remove=true&professional-id=" + professional_id + "&team-name=" + encodeURIComponent(team_name));
    if (result["Error"] !== undefined){
        return [];
    }
    window.location.href = "/dashboard/teams/view?team-name=" + encodeURIComponent(team_name)
    return result;
}

function invite_professional(id) {
    var url = new URL(window.location.href );
    var professional_id = url.searchParams.get("professional-id");
    var team_name = url.searchParams.get("team-name");
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/dashboard/teams/view", false);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            result = JSON.parse(xhr.responseText);
        }
    }
    xhr.send("add=true&professional-id=" + professional_id + "&team-name=" + encodeURIComponent(team_name));
    if (result["Error"] !== undefined){
        return [];
    }
    alert("Professional was invited")
    window.history.back();
    return result;
}
function go_back_add() {
    window.history.back();
}