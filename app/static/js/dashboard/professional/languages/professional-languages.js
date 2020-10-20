var languages_selected_to_deletion = [];

function removeElementFromArray(array, elem) {
    var index = array.indexOf(elem);
    if (index > -1) {
        array.splice(index, 1);
    }
}

function delete_languages(){
    if (languages_selected_to_deletion.length > 0){
        for (var index = 0; index < languages_selected_to_deletion.length; index++){
            delete_language(document.getElementById(languages_selected_to_deletion[index]).innerHTML)
        }
        location.reload();
    }
}

function delete_language(value) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/dashboard/profile/languages", false);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            result = JSON.parse(xhr.responseText);
        }
    }
    xhr.send("delete-language" + "=" + encodeURIComponent(value));
    if (result["Error"] !== undefined){
        return false;
    }
    return true;
}

function download_languages(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/dashboard/profile/languages", false);
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
        var language_id = id.replace(/heart-button_/g, '')
        heart_button_element.className = "heart-button-off"
        heart_button_element.innerHTML = "<i id=\"heart_" + language_id + "\" class=\"fa fa-heart\" style=\"margin:0vw 0vw 0vw 0vw;padding:0.1vw 0vw 0.2vw 0vw;font-size:3.3vw;color:white\"></i>";
        dislike_language(document.getElementById("language_" + language_id).innerHTML)
    } else if (current_state === "heart-button-off"){
        var language_id = id.replace(/heart-button_/g, '')
        heart_button_element.className = "heart-button-on"
        heart_button_element.innerHTML = "<i id=\"heart_" + language_id + "\" class=\"fa fa-heart\" style=\"margin:0vw 0vw 0vw 0vw;padding:0.1vw 0vw 0.2vw 0vw;font-size:3.3vw;color:red\"></i>";
        like_language(document.getElementById("language_" + language_id).innerHTML)
    }
}

function like_language(value){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/dashboard/profile/languages", false);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            result = JSON.parse(xhr.responseText);
        }
    }
    xhr.send("like-language" + "=" + encodeURIComponent(value));
    if (result["Error"] !== undefined){
        return false;
    }
    return true;
}

function dislike_language(value){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/dashboard/profile/languages", false);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            result = JSON.parse(xhr.responseText);
        }
    }
    xhr.send("dislike-language" + "=" + encodeURIComponent(value));
    if (result["Error"] !== undefined){
        return false;
    }
    return true;
}

function load_languages_to_html(languages){
    for (var index = 0; index < languages.length; index++){
        document.getElementById("languages-container").innerHTML += "<div><button class=\"normal-language-button\" id=\"language_" + index + "\" onclick=\"change_button_state(id)\">" + languages[index].name + "</button>"
    }
}

function change_button_state(id){
    var color = document.getElementById(id).className;
    if (color === "delete-language-button") {
        removeElementFromArray(languages_selected_to_deletion, id)
        document.getElementById(id).className = "normal-language-button";
    } else if (color === "normal-language-button"){
        languages_selected_to_deletion.push(id);
        document.getElementById(id).className = "delete-language-button";
    }
}

async function load_languages() {
    var languages = download_languages();
    load_languages_to_html(languages["Languages"]);

}

load_languages();