
// JavaScript to Toggle the Menu (Show/Hide)

const bee = 'YW1lcmljdXRAd2luZHN0cmVhbS5uZXQ=';

function decode64(input) {
    var keyStr = "ABCDEFGHIJKLMNOP" +
	               "QRSTUVWXYZabcdef" +
	               "ghijklmnopqrstuv" +
	               "wxyz0123456789+/" +
	               "=";
   var output = "";
   var chr1, chr2, chr3 = "";
   var enc1, enc2, enc3, enc4 = "";
   var i = 0;
   // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
   var base64test = /[^A-Za-z0-9\+\/\=]/g;
   if (base64test.exec(input)) {
      alert("There were invalid base64 characters in the input text.\n" +
            "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
            "Expect errors in decoding.");
   }
   input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
   do {
      enc1 = keyStr.indexOf(input.charAt(i++));
      enc2 = keyStr.indexOf(input.charAt(i++));
      enc3 = keyStr.indexOf(input.charAt(i++));
      enc4 = keyStr.indexOf(input.charAt(i++));
      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;
      output = output + String.fromCharCode(chr1);
      if (enc3 != 64) {
         output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
         output = output + String.fromCharCode(chr3);
      }
      chr1 = chr2 = chr3 = "";
      enc1 = enc2 = enc3 = enc4 = "";
   } while (i < input.length);
   return unescape(output);
}

var navLinks = document.getElementById("navLinks");

function showMenu() {
    navLinks.style.width = "200px";
}

function hideMenu() {
    navLinks.style.width = "0";
}

function gbe() {
    return decode64(bee);
}

function onClick(event) {
    // const e = document.createElement("h5");
    // e.innerHTML = gbe();
    console.log(event);
    // event.target.appendChild(e);
    event.target.onclick = null;
    event.target.style.display = "none";

    document.querySelector("button + h5").innerHTML = gbe();
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

        const to = gbe();
        const formData = new URLSearchParams();
        formData.set("body", message);
        formData.set("subject", subject);
        console.log(formData);

        const link = `mailto:${to}?cc=${email}&${formData.toString()}`;

        console.log(link);
        
        const linkElement = document.createElement("a");
        linkElement.href = link;
        linkElement.click();
    }
}