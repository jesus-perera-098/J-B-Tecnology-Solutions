document.addEventListener("DOMContentLoaded", () => {
  // Año automático
  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  console.log("JS cargado correctamente");

  const form = document.getElementById("contactForm");
  const messageBox = document.getElementById("formMessage");

  if (!form) {
    console.error("No se encontró el formulario");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Submit interceptado");

    const data = {
      name: form.name.value,
      company: form.company.value,
      email: form.email.value,
      phone: form.number.value,
      service: form.service.value,
      message: form.message.value
    };

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbwWoAf3KcVxhNRl29JAlDuc7D11qVzEmukLfKK4U0HzZwmCJXD3q9NW4TI_Ofss0kXr2g/exec",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        }
      );

      if (!response.ok) throw new Error("Error HTTP");

      messageBox.textContent =
        "Mensaje enviado correctamente. Te contactaremos pronto.";
      messageBox.className = "form-message success";
      form.reset();

    } catch (error) {
      console.error(error);
      messageBox.textContent =
        "Hubo un error al enviar el mensaje. Intenta más tarde.";
      messageBox.className = "form-message error";
    }
  });
});
