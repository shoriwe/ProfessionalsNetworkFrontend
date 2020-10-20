var current_filter = {}
var max_number_of_pages = 1
var selected_professionals = []


function next_page(id) {
    if (current_filter["Page"] < max_number_of_pages) {
        current_filter["Page"] += 1;
        results = find_professionals(current_filter)
        load_results(results)
    }
}

function back_page(id) {
    if (current_filter["Page"] > 1) {
        current_filter["Page"] -= 1;
        results = find_professionals(current_filter)
        load_results(results)
    }
}

function add_professional(team_name, professional_id) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/dashboard/teams/add/members", false);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            result = JSON.parse(xhr.responseText);
        }
    }
    xhr.send("team-name=" + encodeURIComponent(team_name) + "&professional-id=" + professional_id + "&add=true");
}


function add_members(){
    if (selected_professionals.length > 0){
        var url = new URL(window.location.href );
        var team_name = url.searchParams.get("team-name");
        for (index = 0; index < selected_professionals.length; index++) {
            add_professional(team_name, selected_professionals[index])
        }
        window.location.href = window.location.href
    }
}

function removeElementFromArray(array, elem) {
    var index = array.indexOf(elem);
    if (index > -1) {
        array.splice(index, 1);
    }
}

function change_status(id) {
    if (document.getElementById(id).className === "checked") {
        removeElementFromArray(selected_professionals, id);
        document.getElementById(id).className = "not-checked"
    } else {
        selected_professionals.push(id);
        document.getElementById(id).className = "checked"
    }
}

async function load_results(results){
    var url = new URL(window.location.href );
    var team_name = url.searchParams.get("team-name");
    document.getElementById("results-table").innerHTML = "<tr><th>Add</th><th>Name</th><th>Available</th><th>Remote</th><th>Gender</th><th>Description</th><th>Total skills</th></tr>"
    for (index = 0; index < results["Results"].length; index++) {
        line = ""
        if (selected_professionals.includes(results["Results"][index][0].id, 0)) {
            line += "<tr><th><button class=\"checked\" onclick=\"change_status(id)\" id=\"" + results["Results"][index][0].id + "\"></button></th>"
        } else {
            line += "<tr><th><button class=\"not-checked\" onclick=\"change_status(id)\" id=\"" + results["Results"][index][0].id + "\"></button></th>"
        }
        line += "<th><a class=\"view-professional-button\" href=\"/dashboard/teams/view/professional?professional-id=" + results["Results"][index][0].id + "&team-name=" + encodeURIComponent(team_name) + "&add=true" + "\">" + results["Results"][index][0].name + "</a></th>"
        if (results["Results"][index][0].available) {
            line += "<th>Yes</th>"
        } else {
            line += "<th>No</th>"
        }
        if (results["Results"][index][0].remote) {
            line += "<th>Yes</th>"
        } else {
            line += "<th>No</th>"
        }
        line += "<th>" + results["Results"][index][0].gender + "</th>"
        if (results["Results"][index][0].description.length > 0) {
            line += "<th>Yes</th>"
        } else {
            line += "<th>No</th>"
        }
        line += "<th>" + results["Results"][index][1] + "</th>"
        document.getElementById("results-table").innerHTML += line;
    }
}

function getSelectValues(select) {
    var result = [];
    var options = select && select.options;
    var opt;

    for (var i=0, iLen=options.length; i<iLen; i++) {
        opt = options[i];

        if (opt.selected) {
            result.push(opt.value || opt.text);
        }
    }
    return result;
}

function prepare_search_filter(){
    var search_filter = {
        "LikedOnly": document.getElementById("liked-skills-only").checked,
        "Available": document.getElementById("available").checked,
        "Remote": document.getElementById("remote").checked,
        "Gender": document.getElementById("gender").value,
        "Nationalities": getSelectValues(document.getElementById("nationality")),
        "Locations": getSelectValues(document.getElementById("location")),
        "Languages": getSelectValues(document.getElementById("languages")),
        "Skills": getSelectValues(document.getElementById("skills")),
        "Page": 1
    }
    return search_filter;
}

function find_professionals(search_filter) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/dashboard/teams/add/members", false);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            result = JSON.parse(xhr.responseText);
        }
    }
    xhr.send("search-filter=" + encodeURIComponent(btoa(JSON.stringify(search_filter))));
    return result
}

async function search_professionals() {
    var search_filter = prepare_search_filter();
    result = find_professionals(search_filter)
    current_filter = search_filter;
    max_number_of_pages = result["NumberOfResults"]
    load_results(result);
    return true;
}