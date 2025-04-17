
async function connect(e) {
    e.preventDefault();
    const formData = new FormData(form);
    try {
        const response = await fetch("http://localhost:5123/login", {
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
            document.cookie = `${document.cookie};max-age=0;`;
            document.cookie = `token=${data.jwt};max-age=3600;path=/;SameSite=Lax;`;
    
            window.location.replace("/frontend/src/scan/index.html");
        }
    } catch(e) {
        console.error(e);
    }
} 

const form = document.querySelector("#mainform");
form.addEventListener("submit", connect);