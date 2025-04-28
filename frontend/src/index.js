
async function connect(e) {
    e.preventDefault();
    const formData = new FormData(form);
    try {
        const url = import.meta.env.VITE_URL ?? "http://localhost:5123";
        const response = await fetch(url + "/login" , {
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
            
            window.location.replace("scan");
        }
    } catch(e) {
        console.error(e);
    }
} 

const form = document.querySelector("#mainform");
form.addEventListener("submit", connect);