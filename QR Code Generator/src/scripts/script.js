const type_containers = document.querySelectorAll(".type-container");
const forms = document.querySelectorAll(".form");
const btn_create = document.getElementById("btn-create");
const btn_close = document.getElementById("btn-close");
const qr_code_container = document.querySelector(".qr-code-container")
const qr_img = document.getElementById("qr-img")

// On Website Load
document.addEventListener("DOMContentLoaded", () => {
    type_containers[0].classList.add("active");
    forms[0].classList.add("show");
    selection();
})

// Button for Creating QR Code
btn_create.addEventListener("click", () => {
    let type = selection();
    let qr_value = get_data(type);
    if (qr_value) {
        qr_img.src = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${qr_value}`;
        const qr_for = document.querySelector(".qr-for");
        qr_for.innerText = `${type} QR Code`;
        show_QR();
    }
})

// Button for Closing QR Code Container
btn_close.addEventListener("click", () => {
    hide_QR();
})

// Show QR Code Container
function show_QR() {
    qr_code_container.classList.add("show");
    document.body.classList.add("overlay");
}

// Hide QR Code Container
function hide_QR() {
    qr_code_container.classList.remove("show");
    document.body.classList.remove("overlay");
}

// Form for
function selection() {
    type_containers.forEach((type, idx) => {
        type.addEventListener("click", () => {
            type_containers.forEach(type => type.classList.remove("active"));
            forms.forEach(form => form.classList.remove("show"));
            type.classList.add("active");
            forms[idx].classList.add("show");
        })
    })

    return Array.from(forms).filter(form => form.classList.contains("show"))[0].dataset.type;
}

// GET FORM 
function get_data(type) {
    let result;
    switch (type) {
        case "text": result = text(); break;
        case "email": result = email(); break;
        case "phone": result = phone(); break;
        case "wifi": result = wifi(); break;
        case "contact": result = contact(); break;
        case "facebook": result = facebook(); break;
        case "twitter": result = twitter(); break;
        case "whatsapp": result = whatsapp(); break;
        case "sms": result = sms(); break;
        case "instagram": result = instagram(); break;
        case "linkedin": result = linkedin(); break;
        case "website": result = website(); break;
        case "location": result = location_qr(); break;
        case "youtube": result = youtube(); break;
        default: console.log("Error Occurred");
    }
    return result;
}

// Text Data
function text() {
    let text_data = document.getElementById("text-input");
    if (text_data.value != '') {
        text_data.classList.remove("error");
        return text_data.value.split('').map(ch => ch === '\n' ? ch = '%0A' : ch).join('');
    }
    text_data.classList.add("error");
    return 0;
}

// Email Data
function email() {
    const email_input = document.getElementById("e-mail");
    const sub = document.getElementById("subject");
    const content = document.getElementById("content");

    if (email_input.value && sub.value && content.value) {
        email_input.classList.remove("error");
        sub.classList.remove("error");
        content.classList.remove("error");

        return `MATMSG:TO:${email_input.value};SUB:${sub.value};BODY:${content.value};;`;
    }
    email_input.classList.add("error");
    sub.classList.add("error");
    content.classList.add("error");
    return 0;
}

// Phone
function phone() {
    const phone_input = document.getElementById("phone");

    if (phone_input.value) {
        phone_input.classList.remove("error");
        return `tel:${phone_input.value}`
    }
    phone_input.classList.add("error");
    return 0;
}

function wifi() {
    const network_name = document.getElementById("network-name");
    const security = document.getElementById("security");
    const hidden = document.getElementById("hidden");
    const password = document.getElementById("network-password");

    if (network_name.value && password.value) {
        network_name.classList.remove("error");
        password.classList.remove("error");

        return `WIFI:S:${network_name.value};T:${security.value};P:${password.value};H:${hidden.checked}`;
    }
    network_name.classList.add("error");
    password.classList.add("error");
    return 0;
}

function contact() {
    let name = document.getElementById("name");
    let number = document.getElementById("phone-number");
    let address = document.getElementById("address");
    let email = document.getElementById("contact-email");
    let company = document.getElementById("company");
    let website = document.getElementById("website");

    if (name.value && number.value) {
        name.classList.remove("error");
        number.classList.remove("error");

        return `MECARD:N:${name.value};ADR:${address.value};TEL:${number.value};EMAIL:${email.value};ORG:${company.value};URL:${website.value};;`;
    }
    name.classList.add("error");
    number.classList.add("error");
    return 0;
}

function facebook() {
    const url = document.getElementById("facebook-link");

    if (url.value) {
        url.classList.remove("error");
        return url.value;
    }

    url.classList.add("error");
    return 0;
}

function twitter() {
    const id = document.getElementById("twitter-link");

    if (id.value) {
        id.classList.remove("error");
        id.value = id.value.split('').filter(ch => ch != '@').join('');
        return `https://twitter.com/${id.value}`;
    }

    id.classList.add("error");
    return 0;
}
whatsapp()
function whatsapp() {
    const flag = document.getElementById("flag");
    const ph_code = document.getElementById("ph-code");
    const countries = document.getElementById("countries");

    fetch("src/json/data.json")
        .then(res => res.json())
        .then(data => {
            data.forEach(d => {
                countries.innerHTML += `<option value="${d.alpha3Code}">${d.alpha3Code}</option>`;
            })
        })

    countries.addEventListener("change", () => {
        let idx = countries.selectedIndex;
        fetch("src/json/data.json")
            .then(res => res.json())
            .then(data => {
                flag.src = data.filter(c => c.alpha3Code === countries[idx].value)[0].flag;
                ph_code.innerText = `+${data.filter(c => c.alpha3Code === countries[idx].value)[0].callingCodes[0]}`;
            })
    })

    let code = ph_code.innerText;
    const wh_number = document.getElementById("whatsapp-number");

    if (code && wh_number.value) {
        wh_number.classList.remove("error");
        return `https://wa.me/${wh_number.value}`
    }
    wh_number.classList.add("error");
    return 0;
}

function sms() {
    const sms_number = document.getElementById("sms-number");
    const sms_message = document.getElementById("sms-message");

    if (sms_number.value && sms_message.value) {
        sms_number.classList.remove("error");
        sms_message.classList.remove("error");

        return `SMSTO:${sms_number.value}:${sms_message.value}`;
    }
    sms_number.classList.add("error");
    sms_message.classList.add("error");
    return 0;
}

function instagram() {
    const id = document.getElementById("instagram-id");

    if (id.value) {
        id.classList.remove("error");
        return `https://www.instagram.com/${id.value}/`;
    }
    id.classList.add("error");
    return 0;
}

function linkedin() {
    const profile = document.getElementById("linkedin-link");

    if (profile.value) {
        profile.classList.remove("error");
        return profile.value;
    }
    profile.classList.add("error");
    return 0;
}

function website() {
    const url = document.getElementById("website-link");

    if (url.value) {
        url.classList.remove("error");
        return url.value;
    }

    url.classList.add("error");
    return 0;
}

function location_qr() {
    const latitude = document.getElementById("latitude");
    const longitude = document.getElementById("longitude");

    if (latitude.value && longitude.value) {
        latitude.classList.remove("error");
        longitude.classList.remove("error");
        return `http://www.google.com/maps/place/${latitude.value},${longitude.value}`;
    }
    latitude.classList.add("error");
    longitude.classList.add("error");
    return 0;
}

function youtube() {
    const yt_link = document.getElementById("youtube-link");

    if (yt_link.value) {
        yt_link.classList.remove("error");
        return yt_link.value;
    }
    yt_link.classList.add("error");
    return 0;
}