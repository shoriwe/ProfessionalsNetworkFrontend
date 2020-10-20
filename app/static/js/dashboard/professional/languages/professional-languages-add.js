var languages_selected_to_addition = [];

function removeElementFromArray(array, elem) {
    var index = array.indexOf(elem);
    if (index > -1) {
        array.splice(index, 1);
    }
}

async function add_languages(){
    if (languages_selected_to_addition.length > 0){
        for (var index = 0; index < languages_selected_to_addition.length; index++){
            add_language(document.getElementById(languages_selected_to_addition[index]).innerHTML)
        }
        location.reload();
    }
}

function add_language(value) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/dashboard/profile/languages", false);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            result = JSON.parse(xhr.responseText);
        }
    }
    xhr.send("add-language" + "=" + encodeURIComponent(value));
    if (result["Error"] !== undefined){
        return false;
    }
    return true;
}

function search_languages(query){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/dashboard/profile/languages", false);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            result = JSON.parse(xhr.responseText);
        }
    }
    xhr.send("search-languages-query=" + encodeURIComponent(query));
    return result;
}


function load_languages_to_html(languages){
    document.getElementById("languages-container").innerHTML = "";
    for (var index = 0; index < languages.length; index++){
        document.getElementById("languages-container").innerHTML += "<div><button class=\"normal-language-button\" id=\"language_" + index + "\" onclick=\"change_button_state(id)\">" + languages[index] + "</button>"
    }
}

function change_button_state(id){
    var color = document.getElementById(id).className;
    if (color === "add-language-button") {
        removeElementFromArray(languages_selected_to_addition, id)
        document.getElementById(id).className = "normal-language-button";
    } else if (color === "normal-language-button"){
        languages_selected_to_addition.push(id);
        document.getElementById(id).className = "add-language-button";
    }
}

async function search_languages_by_query() {
    var query = document.getElementById("search-query").value;
    var languages = search_languages(query);
    load_languages_to_html(languages["Languages"]);

}

load_languages();