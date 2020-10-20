var country_codes = ["AF - +93", "AX - +358", "AL - +355", "DZ - +213", "AS - +1 684", "AD - +376", "AO - +244", "AI - +1 264", "AQ - +672", "AG - +1268", "AR - +54", "AM - +374", "AW - +297", "AU - +61", "AT - +43", "AZ - +994", "BS - +1 242", "BH - +973", "BD - +880", "BB - +1 246", "BY - +375", "BE - +32", "BZ - +501", "BJ - +229", "BM - +1 441", "BT - +975", "BO - +591", "BA - +387", "BW - +267", "BR - +55", "IO - +246", "BN - +673", "BG - +359", "BF - +226", "BI - +257", "KH - +855", "CM - +237", "CA - +1", "CV - +238", "KY - + 345", "CF - +236", "TD - +235", "CL - +56", "CN - +86", "CX - +61", "CC - +61", "CO - +57", "KM - +269", "CG - +242", "CD - +243", "CK - +682", "CR - +506", "CI - +225", "HR - +385", "CU - +53", "CY - +357", "CZ - +420", "DK - +45", "DJ - +253", "DM - +1 767", "DO - +1 849", "EC - +593", "EG - +20", "SV - +503", "GQ - +240", "ER - +291", "EE - +372", "ET - +251", "FK - +500", "FO - +298", "FJ - +679", "FI - +358", "FR - +33", "GF - +594", "PF - +689", "GA - +241", "GM - +220", "GE - +995", "DE - +49", "GH - +233", "GI - +350", "GR - +30", "GL - +299", "GD - +1 473", "GP - +590", "GU - +1 671", "GT - +502", "GG - +44", "GN - +224", "GW - +245", "GY - +595", "HT - +509", "VA - +379", "HN - +504", "HK - +852", "HU - +36", "IS - +354", "IN - +91", "ID - +62", "IR - +98", "IQ - +964", "IE - +353", "IM - +44", "IL - +972", "IT - +39", "JM - +1 876", "JP - +81", "JE - +44", "JO - +962", "KZ - +7 7", "KE - +254", "KI - +686", "KP - +850", "KR - +82", "KW - +965", "KG - +996", "LA - +856", "LV - +371", "LB - +961", "LS - +266", "LR - +231", "LY - +218", "LI - +423", "LT - +370", "LU - +352", "MO - +853", "MK - +389", "MG - +261", "MW - +265", "MY - +60", "MV - +960", "ML - +223", "MT - +356", "MH - +692", "MQ - +596", "MR - +222", "MU - +230", "YT - +262", "MX - +52", "FM - +691", "MD - +373", "MC - +377", "MN - +976", "ME - +382", "MS - +1664", "MA - +212", "MZ - +258", "MM - +95", "NA - +264", "NR - +674", "NP - +977", "NL - +31", "AN - +599", "NC - +687", "NZ - +64", "NI - +505", "NE - +227", "NG - +234", "NU - +683", "NF - +672", "MP - +1 670", "NO - +47", "OM - +968", "PK - +92", "PW - +680", "PS - +970", "PA - +507", "PG - +675", "PY - +595", "PE - +51", "PH - +63", "PN - +872", "PL - +48", "PT - +351", "PR - +1 939", "QA - +974", "RO - +40", "RU - +7", "RW - +250", "RE - +262", "BL - +590", "SH - +290", "KN - +1 869", "LC - +1 758", "MF - +590", "PM - +508", "VC - +1 784", "WS - +685", "SM - +378", "ST - +239", "SA - +966", "SN - +221", "RS - +381", "SC - +248", "SL - +232", "SG - +65", "SK - +421", "SI - +386", "SB - +677", "SO - +252", "ZA - +27", "GS - +500", "ES - +34", "LK - +94", "SD - +249", "SR - +597", "SJ - +47", "SZ - +268", "SE - +46", "CH - +41", "SY - +963", "TW - +886", "TJ - +992", "TZ - +255", "TH - +66", "TL - +670", "TG - +228", "TK - +690", "TO - +676", "TT - +1 868", "TN - +216", "TR - +90", "TM - +993", "TC - +1 649", "TV - +688", "UG - +256", "UA - +380", "AE - +971", "GB - +44", "US - +1", "UY - +598", "UZ - +998", "VU - +678", "VE - +58", "VN - +84", "VG - +1 284", "VI - +1 340", "WF - +681", "YE - +967", "ZM - +260", "ZW - +263"];
var country_codes_length = country_codes.length;


function email_correct(email){
    if (email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) === null){
        document.getElementById("update-fail-message-id").style.display = "block";
        document.getElementById("update-fail-message-id").innerHTML = "Invalid email!";
        return false;
    }
    return true;
}

function phone_number_correct(phone_number){
    /*
        Need a proper implementation
    */
    return true;
}

function update_new_email_phone_number(new_email, new_phone_number_country_code, new_phone_number){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/dashboard/account/email/phone/number", false);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            result = JSON.parse(xhr.responseText);
        }
    }
    xhr.send("new-email=" + encodeURIComponent(new_email) + "&new-phone-number-country-code=" + encodeURIComponent(new_phone_number_country_code)  + "&new-phone-number=" + encodeURIComponent(new_phone_number));
    if (result["Error"] === undefined) {
        window.location.href = "/email/phone/number/change/confirmation";
        return true;
    }
    document.getElementById("update-fail-message-id").innerHTML = result["Error"];
    document.getElementById("update-fail-message-id").style.display = "block";
    return false;
}

function update_contact(event) {
    document.getElementById("update-fail-message-id").className = "update-fail-message";
    var new_email = document.getElementById("email").value;
    var new_phone_number_country_code = document.getElementById("country-code").value.substring(5, document.getElementById("country-code").value.length);
    var new_phone_number = document.getElementById("phone-number").value;

    if (new_email === "") {
        new_email = document.getElementById("email").placeholder
    }
    if (new_phone_number === "") {
        new_phone_number = document.getElementById("phone-number").placeholder;
    }

    if (email_correct(new_email)){
        if (phone_number_correct(new_phone_number)){
            update_new_email_phone_number(new_email, new_phone_number_country_code, new_phone_number)
        };
    }
    document.getElementById("email").value = "";
    document.getElementById("phone-number").value = "";
    return false;
}

async function load_contact_info(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/dashboard/account/email/phone/number", false);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            result = JSON.parse(xhr.responseText);
        }
    }
    xhr.send();
    if (result["Error"] === undefined) {
        document.getElementById("email").placeholder = result["Email"];
        document.getElementById("phone-number").placeholder = result["PhoneNumber"].split(" ")[1];
        country_code = result["PhoneNumber"].split(" ")[0];
        for (index = 0; index < country_codes_length; index++) {
            if (country_codes[index].includes(country_code, 0)) {
                // Do Something to change the country code
                document.getElementById("country-code").value = country_codes[index];
            }
        }
        return;
    }
    document.getElementById("update-fail-message-id").innerHTML = result["Error"];
    document.getElementById("update-fail-message-id").style.display = "block";
}

load_contact_info()
