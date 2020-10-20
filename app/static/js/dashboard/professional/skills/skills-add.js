var skills_selected_to_addition = [];

function removeElementFromArray(array, elem) {
    var index = array.indexOf(elem);
    if (index > -1) {
        array.splice(index, 1);
    }
}

async function add_skills(){
    if (skills_selected_to_addition.length > 0){
        for (var index = 0; index < skills_selected_to_addition.length; index++){
            add_skill(document.getElementById(skills_selected_to_addition[index]).innerHTML)
        }
        location.reload();
    }
}

function add_skill(value) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/dashboard/profile/skills", false);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            result = JSON.parse(xhr.responseText);
        }
    }
    xhr.send("add-skill" + "=" + encodeURIComponent(value));
    if (result["Error"] !== undefined){
        return false;
    }
    return true;
}

function search_skills(query){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/dashboard/profile/skills", false);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            result = JSON.parse(xhr.responseText);
        }
    }
    xhr.send("search-skills-query=" + encodeURIComponent(query));
    return result;
}


function load_skills_to_html(skills){
    document.getElementById("skills-container").innerHTML = "";
    for (var index = 0; index < skills.length; index++){
        document.getElementById("skills-container").innerHTML += "<div><button class=\"normal-skill-button\" id=\"skill_" + index + "\" onclick=\"change_button_state(id)\">" + skills[index] + "</button>"
    }
}

function change_button_state(id){
    var color = document.getElementById(id).className;
    if (color === "add-skill-button") {
        removeElementFromArray(skills_selected_to_addition, id)
        document.getElementById(id).className = "normal-skill-button";
    } else if (color === "normal-skill-button"){
        skills_selected_to_addition.push(id);
        document.getElementById(id).className = "add-skill-button";
    }
}

async function search_skills_by_query() {
    var query = document.getElementById("search-query").value;
    var skills = search_skills(query);
    load_skills_to_html(skills["Skills"]);

}

load_skills();