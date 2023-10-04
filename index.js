
// JavaScript to Toggle the Menu (Show/Hide)

var navLinks = document.getElementById("navLinks");

function showMenu() {
    navLinks.style.width = "200px";
}

function hideMenu() {
    navLinks.style.width = "0";
}

function isFormDataValid({name, email, subject, message}) {
    if (name.length == 0)
        return false;
    if (email.length == 0)
        return false;
    if (subject.length == 0)
        return false;
    if (message.length == 0)
        return false;

    return true;

    /*
    alternatively:
    return !(name.length == 0
        || email.length == 0
        || subject.length == 0
        || message.length == 0);
        */
}

// Proof of concept (max)
const submitBtn = document.getElementById("submit-btn");
if (submitBtn !== null) {
    submitBtn.onclick = () => {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const subject = document.getElementById("subject").value;
        const message = document.getElementById("message").value;

        // TODO: form validation
        if (!isFormDataValid({name: name, email:email, subject: subject, message: message})) {
            return;
        }

        // const emailToSendTo = "americut@windstream.net";
        const emailToSendTo = "americut@windstream.net";
        const formData = new URLSearchParams();
        formData.set("body", message);
        formData.set("subject", subject);
        console.log(formData);

        const link = `mailto:${emailToSendTo}?cc=${email}&${formData.toString()}`;

        console.log(link);
        
        const linkElement = document.createElement("a");
        linkElement.href = link;
        linkElement.click();
    }
}