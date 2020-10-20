var skills_selected_to_deletion = [];

function removeElementFromArray(array, elem) {
    var index = array.indexOf(elem);
    if (index > -1) {
        array.splice(index, 1);
    }
}

function delete_skills(){
    if (skills_selected_to_deletion.length > 0){
        for (var index = 0; index < skills_selected_to_deletion.length; index++){
            delete_skill(document.getElementById(skills_selected_to_deletion[index]).innerHTML)
        }
        location.reload();
    }
}

function delete_skill(value) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/dashboard/profile/skills", false);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            result = JSON.parse(xhr.responseText);
        }
    }
    xhr.send("delete-skill" + "=" + encodeURIComponent(value));
    if (result["Error"] !== undefined){
        return false;
    }
    return true;
}

function download_skills(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/dashboard/profile/skills", false);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            result = JSON.parse(xhr.responseText);
        }
    }
    xhr.send();
    return result;
}

async function change_like_status(id){
    var heart_button_element = document.getElementById(id);
    var current_state = heart_button_element.className;
    if (current_state === "heart-button-on") {
        var skill_id = id.replace(/heart-button_/g, '')
        heart_button_element.className = "heart-button-off"
        heart_button_element.innerHTML = "<i id=\"heart_" + skill_id + "\" class=\"fa fa-heart\" style=\"margin:0vw 0vw 0vw 0vw;padding:0.1vw 0vw 0.2vw 0vw;font-size:3.3vw;color:white\"></i>";
        dislike_skill(document.getElementById("skill_" + skill_id).innerHTML)
    } else if (current_state === "heart-button-off"){
        var skill_id = id.replace(/heart-button_/g, '')
        heart_button_element.className = "heart-button-on"
        heart_button_element.innerHTML = "<i id=\"heart_" + skill_id + "\" class=\"fa fa-heart\" style=\"margin:0vw 0vw 0vw 0vw;padding:0.1vw 0vw 0.2vw 0vw;font-size:3.3vw;color:red\"></i>";
        like_skill(document.getElementById("skill_" + skill_id).innerHTML)
    }
}

function like_skill(value){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/dashboard/profile/skills", false);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            result = JSON.parse(xhr.responseText);
        }
    }
    xhr.send("like-skill" + "=" + encodeURIComponent(value));
    if (result["Error"] !== undefined){
        return false;
    }
    return true;
}

function dislike_skill(value){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/dashboard/profile/skills", false);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            result = JSON.parse(xhr.responseText);
        }
    }
    xhr.send("dislike-skill" + "=" + encodeURIComponent(value));
    if (result["Error"] !== undefined){
        return false;
    }
    return true;
}

function load_skills_to_html(skills){
    for (var index = 0; index < skills.length; index++){
        if (skills[index].labels.indexOf("LIKE") >= 0){
            document.getElementById("skills-container").innerHTML += "<div><button class=\"normal-skill-button\" id=\"skill_" + index + "\" onclick=\"change_button_state(id)\">" + skills[index].name + "</button><button id=\"heart-button_" + index + "\" onclick=\"change_like_status(id)\" class=\"heart-button-on\"><i id=\"heart_" + index + "\" class=\"fa fa-heart\" style=\"margin:0vw 0vw 0vw 0vw;padding:0.1vw 0vw 0.2vw 0vw;font-size:3.3vw;color:red\"></i></button></div>"
        } else {
            document.getElementById("skills-container").innerHTML += "<div><button class=\"normal-skill-button\" id=\"skill_" + index + "\" onclick=\"change_button_state(id)\">" + skills[index].name + "</button><button id=\"heart-button_" + index + "\" onclick=\"change_like_status(id)\" class=\"heart-button-off\"><i id=\"heart_" + index + "\" class=\"fa fa-heart\" style=\"margin:0vw 0vw 0vw 0vw;padding:0.1vw 0vw 0.2vw 0vw;font-size:3.3vw;color:white\"></i></button></div>"
        }
    }
}

function change_button_state(id){
    var color = document.getElementById(id).className;
    if (color === "delete-skill-button") {
        removeElementFromArray(skills_selected_to_deletion, id)
        document.getElementById(id).className = "normal-skill-button";
    } else if (color === "normal-skill-button"){
        skills_selected_to_deletion.push(id);
        document.getElementById(id).className = "delete-skill-button";
    }
}

async function load_skills() {
    var skills = download_skills();
    load_skills_to_html(skills["Skills"]);

}

load_skills();