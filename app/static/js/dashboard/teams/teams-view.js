var selected_members_for_deletion = [];
var rendered_nodes = {}

//

function add_members() {
    var url = new URL(window.location.href );
    var team_name = url.searchParams.get("team-name");
    window.location.href = "/dashboard/teams/add/members?team-name=" + encodeURIComponent(team_name);

}

function remove_members() {
    for (index = 0; index < selected_members_for_deletion.length; index++) {
        remove_member(selected_members_for_deletion[index])
    }
    window.location.href = window.location.href
}

function removeElementFromArray(array, elem) {
    var index = array.indexOf(elem);
    if (index > -1) {
        array.splice(index, 1);
    }
}

function update_team_virtual_status(id) {
    if (document.getElementById(id).className === "team-box") {
        document.getElementById(id).className = "deletion-team-box";
        selected_members_for_deletion.push(id);
    } else if (document.getElementById(id).className === "deletion-team-box") {
        document.getElementById(id).className = "team-box";
        removeElementFromArray(selected_members_for_deletion, id);
    }
}

function view_profile_contractor(id) {
    var url = new URL(window.location.href );
    var team_name = url.searchParams.get("team-name");
    window.location.href = "/dashboard/teams/view/professional?professional-id=" + id + "&team-name=" + team_name
}

function remove_member(value) {
    var url = new URL(window.location.href );
    var team_name = url.searchParams.get("team-name");
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/dashboard/teams/view", false);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            result = JSON.parse(xhr.responseText);
        }
    }
    xhr.send("team-name=" + encodeURIComponent(team_name) + "&professional-id=" + encodeURIComponent(value) + "&remove=true");
    if (result["Error"] !== undefined){
        return false;
    }
    window.location.href = window.location.href
    return true;
}

function request_team_members_contractor(){
    var url = new URL(window.location.href );
    var team_name = url.searchParams.get("team-name");
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/dashboard/teams/view", false);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            result = JSON.parse(xhr.responseText);
        }
    }
    xhr.send("request-members=true&team-name=" + encodeURIComponent(team_name));
    if (result["Error"] !== undefined){
        return [];
    }
    return result;
}

function view_member(id) {
    var url = new URL(window.location.href );
    var team_name = url.searchParams.get("team-name");
    window.location.href = "/dashboard/teams/view/professional?edit=true&professional-id=" + id.substring(1, id.length).split("-")[0] + "&team-name=" + team_name
}

function dissolve_team(id) {
    var url = new URL(window.location.href );
    var value = url.searchParams.get("team-name");
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/dashboard/teams", false);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            result = JSON.parse(xhr.responseText);
        }
    }
    xhr.send("delete-team=" + encodeURIComponent(value));
    if (result["Error"] !== undefined){
        return false;
    }
    window.history.back();
    return true;
}

//

function view_profile_professional(id) {
    var url = new URL(window.location.href );
    var team_contractor_id = url.searchParams.get("contractor-id");
    var team_name = url.searchParams.get("team-name");
    window.location.href = "/dashboard/teams/view/professional?professional-id=" + id + "&contractor-id=" + team_contractor_id + "&team-name=" + team_name
}

function exit_from_team() {
    var url = new URL(window.location.href );
    var contractor_id = url.searchParams.get("contractor-id");
    var team_name = url.searchParams.get("team-name");
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/dashboard/teams/view", false);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            result = JSON.parse(xhr.responseText);
        }
    }
    xhr.send("delete-team=" + encodeURIComponent(team_name) + "&contractor-id=" + contractor_id);
    if (result["Error"] !== undefined){
        return false;
    }
    window.location.href = "/dashboard/teams"
    return true;
}

function request_team_members_professional(){
    var url = new URL(window.location.href );
    var team_id = url.searchParams.get("id");
    var contractor_id = url.searchParams.get("contractor-id");
    var team_name = url.searchParams.get("team-name");
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/dashboard/teams/view", false);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            result = JSON.parse(xhr.responseText);
        }
    }
    xhr.send("request-members=true&id=" + team_id + "&contractor-id=" + contractor_id + "&team-name=" + encodeURIComponent(team_name));
    if (result["Error"] !== undefined){
        return [];
    }
    return result;
}

function apply_to_team(id) {
    var url = new URL(window.location.href );
    var team_id = url.searchParams.get("id");
    var contractor_id = url.searchParams.get("contractor-id");
    var team_name = url.searchParams.get("team-name");
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/dashboard/teams/view", false);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            result = JSON.parse(xhr.responseText);
        }
    }
    xhr.send("apply=true&id=" + team_id + "&contractor-id=" + contractor_id + "&team-name=" + encodeURIComponent(team_name));
    if (result["Error"] !== undefined){
        alert(result["Error"])
        return false;
    }
    alert(result["Success"]);
    window.history.back();
    return true;
}

//

async function load_members_professional(){
    document.getElementById("team-members").innerHTML = "";
    members = request_team_members_professional();
    document.getElementById("team-name").innerHTML = members["nodes"][0]["sname"]
    for (index = 0; index < members["nodes"].slice(1, members["nodes"].length).length; index++) {
        document.getElementById("team-members").innerHTML += "<button class=\"team-member\" onclick=\"view_profile_professional(id)\" id=\"" + members["nodes"][index+1][0].id + "\">" + members["nodes"][index+1][0].sname +"</button><br>"
    }
}


async function load_members_contractor(){
    document.getElementById("team-members").innerHTML = "";
    members = request_team_members_contractor();
    document.getElementById("team-name").innerHTML = members["nodes"][0]["sname"]
    for (index = 0; index < members["nodes"].slice(1, members["nodes"].length).length; index++) {
        document.getElementById("team-members").innerHTML += "<div class=\"button-container\"><button class=\"team-box\" id=\"" + members["nodes"][index+1][0]["id"] + "\" onclick=\"update_team_virtual_status(id)\">" + members["nodes"][index+1][0]["sname"] + "</button><button id=\"v" + members["nodes"][index+1][0]["id"] + "-" + members["nodes"][index+1][0]["ownerID"] + "\" class=\"view-team\" onclick=\"view_member(id)\">View</button><br>"
    }
}
