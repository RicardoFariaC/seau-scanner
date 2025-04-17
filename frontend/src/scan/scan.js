let html5QrcodeScanner = new Html5QrcodeScanner(
    "reader",
    { fps: 10, qrbox: {width: 250, height: 250}, facingMode: "environment" },
/* verbose= */ false);

html5QrcodeScanner.render(onScanSuccess.bind(this), onScanFailure.bind(this));
 
const btnConfirm = document.querySelector("#btn-confirm");
const btnCancel = document.querySelector("#btn-cancel");
const errorTag = document.querySelector("#errortag");
errorTag.innerText = "";

btnConfirm.addEventListener("click", confirmScan);
btnCancel.addEventListener("click", resetScan);

/* -- FUNCTIONS SECTION -- */


/**
 * Obligatory function for scanner success callback
 * 
 * @param {*} decodedText 
 */
function onScanSuccess(decodedText) {
    if(errorTag) {
        errorTag.innerText = "";
    }

    if(String(decodedText).includes("univap.br/ID/")) {
        document.querySelector("#btn-confirm").disabled = false;
        document.querySelector("#btn-cancel").disabled = false;
        fetch("https://cors-anywhere.herokuapp.com/"+decodedText) // TODO: Remove this CORS proxy
            .then(response => {
                return response.text();
            })
            .then(data => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(data, "text/html");
                
                const matricula = doc.getElementById("matricula").value;
                const img = doc.getElementsByTagName("img")[1].src;
                const nome = doc.getElementById("nome").value;
                const turma = doc.getElementById("turma").value;

                setAttribute("img", {type: "src", value: img});
                setAttribute("ra", {type: "text", value: matricula});
                setAttribute("nome", {type: "text", value: nome});
                setAttribute("turma", {type: "text", value: turma});
            });
            html5QrcodeScanner.pause();
    } else {
        onScanFailure("Invalid QR Code");
    }
}


/**
 * Obligatory function for scanner failure callback
 * @param {*} error 
 */
function onScanFailure(error) {
    document.querySelector("#error").innerText = error;
}


/**
 * Button to confirm the scan and reset data to next scan.
 * @param {*} event 
 */
function confirmScan(event) {
    resetScan();

    fetch("/")

}

/**
 * Button to reset the scan and clear data to next scan.s
 * @param {*} event 
 */
function resetScan(event) {
    event.preventDefault();
    btnConfirm.disabled = true;
    btnCancel.disabled = true;

    clearAttribute("img", {type: "src"});
    clearAttribute("ra", {type: "text"});
    clearAttribute("nome", {type: "text"});
    clearAttribute("turma", {type: "text"});
    html5QrcodeScanner.resume();
}


/**
 * use this function to set an attribute of an element. 
 * pass the elementId and the options object.
 * 
 * opts = {
 *  type: "src" | "text" | "class",
 *  value: "value"
 * };
*/
function setAttribute(elementId, opts) {
    const element = document.getElementById(elementId);
    if(element) {
        switch (opts.type) {
            case "text":
                element.innerText = opts.value;
                break;
            case "src":
                element.src = opts.value;
                break;
            case "class":
                element.classList.add(opts.value);
                break;
            default:
                console.error("Invalid type");
        }
    }
}

/**
 * use this to remove an attribute of an element.
 * pass the elementId and the options object.
 * 
 * opts = {
 *  type: "src" | "text" | "class",
 *  value: "value" ## Only in class type.
 * }
 * 
 * @param {string} elementId 
 * @param {object} opts
 */

function clearAttribute(elementId, opts) {
    setAttribute(elementId, {type: opts.type, value: ""});
}
