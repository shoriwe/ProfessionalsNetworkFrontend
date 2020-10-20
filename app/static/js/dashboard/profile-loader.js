var nationalities = ["Afghan", "Albanian", "Algerian", "American", "Andorran", "Angolan", "Antiguans", "Argentinean",
                 "Armenian", "Australian", "Austrian", "Azerbaijani", "Bahamian", "Bahraini", "Bangladeshi",
                 "Barbadian", "Barbudans", "Batswana", "Belarusian", "Belgian", "Belizean", "Beninese", "Bhutanese",
                 "Bolivian", "Bosnian", "Brazilian", "British", "Bruneian", "Bulgarian", "Burkinabe", "Burmese",
                 "Burundian", "Cambodian", "Cameroonian", "Canadian", "Cape Verdean", "Central African", "Chadian",
                 "Chilean", "Chinese", "Colombian", "Comoran", "Congolese", "Costa Rican", "Croatian", "Cuban",
                 "Cypriot", "Czech", "Danish", "Djibouti", "Dominican", "Dutch", "East Timorese", "Ecuadorean",
                 "Egyptian", "Emirian", "Equatorial Guinean", "Eritrean", "Estonian", "Ethiopian", "Fijian", "Filipino",
                 "Finnish", "French", "Gabonese", "Gambian", "Georgian", "German", "Ghanaian", "Greek", "Grenadian",
                 "Guatemalan", "Guinea-Bissauan", "Guinean", "Guyanese", "Haitian", "Herzegovinian", "Honduran",
                 "Hungarian", "I-Kiribati", "Icelander", "Indian", "Indonesian", "Iranian", "Iraqi", "Irish", "Israeli",
                 "Italian", "Ivorian", "Jamaican", "Japanese", "Jordanian", "Kazakhstani", "Kenyan",
                 "Kittian and Nevisian", "Kuwaiti", "Kyrgyz", "Laotian", "Latvian", "Lebanese", "Liberian", "Libyan",
                 "Liechtensteiner", "Lithuanian", "Luxembourger", "Macedonian", "Malagasy", "Malawian", "Malaysian",
                 "Maldivian", "Malian", "Maltese", "Marshallese", "Mauritanian", "Mauritian", "Mexican", "Micronesian",
                 "Moldovan", "Monacan", "Mongolian", "Moroccan", "Mosotho", "Motswana", "Mozambican", "Namibian",
                 "Nauruan", "Nepalese", "New Zealander", "Ni-Vanuatu", "Nicaraguan", "Nigerian", "Nigerien",
                 "North Korean", "Northern Irish", "Norwegian", "Omani", "Pakistani", "Palauan", "Panamanian",
                 "Papua New Guinean", "Paraguayan", "Peruvian", "Polish", "Portuguese", "Qatari", "Romanian", "Russian",
                 "Rwandan", "Saint Lucian", "Salvadoran", "Samoan", "San Marinese", "Sao Tomean", "Saudi", "Scottish",
                 "Senegalese", "Serbian", "Seychellois", "Sierra Leonean", "Singaporean", "Slovakian", "Slovenian",
                 "Solomon Islander", "Somali", "South African", "South Korean", "Spanish", "Sri Lankan", "Sudanese",
                 "Surinamer", "Swazi", "Swedish", "Swiss", "Syrian", "Taiwanese", "Tajik", "Tanzanian", "Thai",
                 "Togolese", "Tongan", "Trinidadian or Tobagonian", "Tunisian", "Turkish", "Tuvaluan", "Ugandan",
                 "Ukrainian", "Uruguayan", "Uzbekistani", "Venezuelan", "Vietnamese", "Welsh", "Yemenite", "Zambian",
                 "Zimbabwean"]
var countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua & Deps", "Argentina", "Armenia",
             "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium",
             "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria",
             "Burkina", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Central African Rep", "Chad",
             "Chile", "China", "Colombia", "Comoros", "Congo", "Congo {Democratic Rep}", "Costa Rica", "Croatia",
             "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor",
             "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Fiji",
             "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala",
             "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia",
             "Iran", "Iraq", "Ireland {Republic}", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan",
             "Kazakhstan", "Kenya", "Kiribati", "Korea North", "Korea South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos",
             "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
             "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands",
             "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro",
             "Morocco", "Mozambique", "Myanmar, {Burma}", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand",
             "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea",
             "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russian Federation",
             "Rwanda", "St Kitts & Nevis", "St Lucia", "Saint Vincent & the Grenadines", "Samoa", "San Marino",
             "Sao Tome & Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore",
             "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka",
             "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania",
             "Thailand", "Togo", "Tonga", "Trinidad & Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda",
             "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu",
             "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"]
var nationalities_length = nationalities.length;
var countries_length = countries.length;


function update_field(field, value) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/dashboard/profile", false);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            result = JSON.parse(xhr.responseText);
        }
    }
    xhr.send(field + "=" + encodeURIComponent(value));
    if (result["Error"] !== undefined){
        document.getElementById("update-message").innerHTML = result["Error"];
        document.getElementById("update-message").style.display = "block";
        document.getElementById("update-message").style.background = "#ff3f34";
        return false;
    }
    return true;
}

function update_contractor_information(){
    var fail = false
    var location = document.getElementById("location").value;
    var description = document.getElementById("description").value;
    update_field("location", location)
    if (!update_field("description", description)){
        fail = true;
    }
    if (!fail) {
        document.getElementById("update-message").innerHTML = "Update successful"
        document.getElementById("update-message").style.display = "block";
        document.getElementById("update-message").style.background = "#4cd137";
    }
}

function update_professional_information(){
    var fail = false
    var liked_skills_only = document.getElementById("liked-skills-only").checked;
    var available = document.getElementById("available").checked;
    var remote = document.getElementById("remote").checked;
    var location = document.getElementById("location").value;
    var nationality = document.getElementById("nationality").value;
    var gender = document.getElementById("gender").value;
    var description = document.getElementById("description").value;

    update_field("liked-skills", liked_skills_only)
    update_field("available", available)
    update_field("remote", remote)
    update_field("location", location)
    update_field("nationality", nationality)
    update_field("gender", gender)
    if (!update_field("description", description)){
        fail = true;
    }
    if (!fail) {
        document.getElementById("update-message").innerHTML = "Update successful"
        document.getElementById("update-message").style.display = "block";
        document.getElementById("update-message").style.background = "#4cd137";
    }
}

function getNationalityIndex(nationality) {
    for (var index = 0; index < nationalities_length; index++){
        if (nationalities[index] === nationality){
            return index;
        }
    }
    return -1;
}


function getCountryIndex(country) {
    for (var index = 0; index < countries_length; index++){
        if (countries[index] === country){
            return index;
        }
    }
    return -1;
}


function getGenderIndex(gender){
    for (var index = 0; index < 3; index++){
        if (["Male", "Female", "Other"][index] === gender){
            return index;
        }
    }
    return -1;
}

function load_contractor_profile_information(profile_data){
    var location_field = document.getElementById("location");
    var description_field = document.getElementById("description");

    if (profile_data["location"] !== undefined){
        var index = getCountryIndex(profile_data["location"]);
        if (index !== -1){
            location_field.selectedIndex = 0;
            location_field.value = countries[index];
        }
    }

    if (profile_data["description"] !== undefined){
        description_field.value = profile_data["description"];
    }
}

function load_professional_profile_information(profile_data){
    var liked_skills_field = document.getElementById("liked-skills-only");
    var available_field = document.getElementById("available");
    var location_field = document.getElementById("location");
    var remote_field = document.getElementById("remote");
    var nationality_field = document.getElementById("nationality");
    var gender_field = document.getElementById("gender");
    var description_field = document.getElementById("description");


    if (profile_data["liked_only"] !== undefined){
        liked_skills_field.checked = profile_data["liked_only"];
    }

    if (profile_data["available"] !== undefined){
        available_field.checked = profile_data["available"];
    }

    if (profile_data["remote"] !== undefined){
        remote_field.checked = profile_data["remote"];
    }

    if (profile_data["location"] !== undefined){
        var index = getCountryIndex(profile_data["location"]);
        if (index !== -1){
            location_field.selectedIndex = 0;
            location_field.value = countries[index];
        }
    }

    if (profile_data["nationality"] !== undefined){
        var index = getNationalityIndex(profile_data["nationality"]);
        if (index !== -1){
            nationality_field.selectedIndex = 0;
            nationality_field.value = nationalities[index];
        }
    }

    if (profile_data["gender"] !== undefined){
        var index = getGenderIndex(profile_data["gender"]);
        if (index !== -1){
            gender_field.selectedIndex = 0;
            gender_field.value = ["Male", "Female", "Other"][index];
        }
    }
    if (profile_data["description"] !== undefined){
        description_field.value = profile_data["description"];
    }
}

function request_profile_data(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/dashboard/profile", false);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            result = JSON.parse(xhr.responseText);
        }
    }
    xhr.send();
    return result;
}


function load_d3(profile_data){

}

function load_contractor_profile(){
    profile_data = request_profile_data();
    load_contractor_profile_information(profile_data["nodes"][0]);
    load_d3(profile_data);
}

function load_professional_profile(){
    profile_data = request_profile_data();
    load_professional_profile_information(profile_data["nodes"][0]);
    load_d3(profile_data);
}

