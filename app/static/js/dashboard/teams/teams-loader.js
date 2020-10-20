var selected_teams = [];
var loaded_nodes = {}

//

function removeElementFromArray(array, elem) {
    var index = array.indexOf(elem);
    if (index > -1) {
        array.splice(index, 1);
    }
}

function search_teams(value) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/dashboard/teams", false);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            result = JSON.parse(xhr.responseText);
        }
    }
    xhr.send("search-teams=" + encodeURIComponent(value));
    if (result["Error"] !== undefined){
        return [];
    }
    return result["Teams"];
}

function exit_from_team(value) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/dashboard/teams", false);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            result = JSON.parse(xhr.responseText);
        }
    }
    xhr.send("delete-team=" + encodeURIComponent(loaded_nodes[value].name) + "&contractor-id=" + loaded_nodes[value].ownerID);
    if (result["Error"] !== undefined){
        return false;
    }
    return true;
}

function request_professional_teams() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/dashboard/teams", false);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            result = JSON.parse(xhr.responseText);
        }
    }
    xhr.send("professional-teams" + "=" + "true");
    if (result["Error"] !== undefined){
        return [];
    }
    return result["Teams"];
}

function handle_teams_search(event){
    loaded_nodes = {};
    teams = search_teams(document.getElementById("team-search-bar").value)
    document.getElementById("teams-container").innerHTML = "";
    for (index = 0; index < teams.length; index++) {
        document.getElementById("teams-container").innerHTML += "<div class=\"button-container\"><button class=\"team-box\" id=\"" + teams[index]["id"] + "-" + teams[index]["ownerID"] + "\" onclick=\"update_team_virtual_status(id)\">" + teams[index]["sname"] + "</button><button id=\"v" + teams[index]["id"] + "-" + teams[index]["ownerID"] + "\" class=\"view-team\" onclick=\"view_professional_team_not_member(id)\">View</button>"
        loaded_nodes[teams[index]["id"] + "-" + teams[index]["ownerID"]] = teams[index];
    }
    return false;
}

function exit_from_teams(){
    if (selected_teams.length > 0){
        for (var index = 0; index < selected_teams.length; index++){
            exit_from_team(selected_teams[index])
        }
        location.reload();
    }
}

function update_team_virtual_status(id) {
    if (document.getElementById(id).className === "team-box") {
        document.getElementById(id).className = "deletion-team-box";
        selected_teams.push(id);
    } else if (document.getElementById(id).className === "deletion-team-box") {
        document.getElementById(id).className = "team-box";
        removeElementFromArray(selected_teams, id);
    }
}

function view_professional_team(id) {
    node = loaded_nodes[id.substring(1)];
    window.location.href = "/dashboard/teams/view?member=true&id=" + node.id + "&contractor-id=" + node.ownerID + "&team-name=" +  encodeURIComponent(node.name);
}

function view_professional_team_not_member(id) {
    node = loaded_nodes[id.substring(1)];
    window.location.href = "/dashboard/teams/view?not-member=true&id=" + node.id + "&contractor-id=" + node.ownerID + "&team-name=" +  encodeURIComponent(node.name);
}

// 

function create_team(value) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/dashboard/teams", false);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            result = JSON.parse(xhr.responseText);
        }
    }
    xhr.send("create-team=" + encodeURIComponent(value));
    if (result["Error"] !== undefined){
        return false;
    }
    return true;
}

function dissolve_team(value) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/dashboard/teams", false);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            result = JSON.parse(xhr.responseText);
        }
    }
    xhr.send("delete-team=" + encodeURIComponent(loaded_nodes[value].name));
    if (result["Error"] !== undefined){
        return false;
    }
    return true;
}

function request_owned_teams() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/dashboard/teams", false);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            result = JSON.parse(xhr.responseText);
        }
    }
    xhr.send("contractor-teams" + "=" + "true");
    if (result["Error"] !== undefined){
        return [];
    }
    return result["Teams"];
}

function handle_create_team(event){
    loaded_nodes = {};
    if (create_team(document.getElementById("team-search-bar").value)){
        window.location.href = "/dashboard/teams"
    }
    return false;
}

function dissolve_teams(){
    if (selected_teams.length > 0){
        for (var index = 0; index < selected_teams.length; index++){
            dissolve_team(selected_teams[index])
        }
        location.reload();
    }
}

function view_contractor_team(id) {
    node = loaded_nodes[id.substring(1)];
    window.location.href = "/dashboard/teams/view?team-name=" +  encodeURIComponent(node.name);
}

//

async function load_contractor_teams(){
    loaded_nodes = {};
    teams = request_owned_teams();
    document.getElementById("teams-container").innerHTML = "";
    for (index = 0; index < teams.length; index++) {
        document.getElementById("teams-container").innerHTML += "<div class=\"button-container\"><button class=\"team-box\" id=\"" + teams[index]["id"] + "-" + teams[index]["ownerID"] + "\" onclick=\"update_team_virtual_status(id)\">" + teams[index]["sname"] + "</button><button id=\"v" + teams[index]["id"] + "-" + teams[index]["ownerID"] + "\" class=\"view-team\" onclick=\"view_contractor_team(id)\">View</button>"
        loaded_nodes[teams[index]["id"] + "-" + teams[index]["ownerID"]] = teams[index];
    }
}

async function load_professional_teams(){
    loaded_nodes = {};
    teams = request_professional_teams();
    document.getElementById("teams-container").innerHTML = "";
    for (index = 0; index < teams.length; index++) {
        document.getElementById("teams-container").innerHTML += "<div class=\"button-container\"><button class=\"team-box\" id=\"" + teams[index]["id"] + "-" + teams[index]["ownerID"] + "\" onclick=\"update_team_virtual_status(id)\">" + teams[index]["sname"] + "</button><button id=\"v" + teams[index]["id"] + "-" + teams[index]["ownerID"] + "\" class=\"view-team\" onclick=\"view_professional_team(id)\">View</button>"
        loaded_nodes[teams[index]["id"] + "-" + teams[index]["ownerID"]] = teams[index];
    }
}
