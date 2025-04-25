
async function connect(e) {
    e.preventDefault();
    const formData = new FormData(form);
    try {
        const response = await fetch("http://feau.univap:5123/login", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                login: formData.get("login"),
                senha: formData.get("senha")
            }),
        });
        const data = await response.json();
        if(data.status == false) {
            document.querySelector("#error").innerText = data.message;
        } else {

            sessionStorage.setItem("token", data.jwt);
            
            window.location.replace("/frontend/src/scan/index.html");
        }
    } catch(e) {
        console.error(e);
    }
} 

const form = document.querySelector("#mainform");
form.addEventListener("submit", connect);