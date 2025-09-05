const form = document.getElementById("contact-form");
const formStatus = document.createElement("div");
formStatus.id = "form-popup";
formStatus.className = " glass glass-shadow";

function formPopup(message) {
    formStatus.innerHTML = `
    <div class="cross" id ="popup-cross"></div>
    <p class="title" id="form-message">${message}</p>
    `;
    form.parentElement.appendChild(formStatus);
}


form.addEventListener("submit", async (e) => {

    e.preventDefault();
    const data = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: data,
            headers: { Accept: "application/json" },
        });

        if (response.ok) {
            formPopup("Mensaje enviado con éxito");
            form.reset();
        } else {
            formPopup("Hubo un problema, intentá más tarde.");
        }
    } catch (error) {
        formPopup("Error de conexión.");
    } finally {
        const cross = document.getElementById("popup-cross");
        cross.addEventListener("click", () => {
            form.parentElement.removeChild(formStatus);
        })
    }
});