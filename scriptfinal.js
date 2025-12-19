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

    // ⬇️ Formato CORRECTO para Google Apps Script (evita CORS)
    const params = new URLSearchParams({
      name: form.name.value,
      company: form.company.value,
      email: form.email.value,
      phone: form.number.value,
      service: form.service.value,
      message: form.message.value
    });

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycby_6HVbVFBmhga-pyNUjlTIXtfsZJGoyMxmFIANPCRvbLgbndNkBw54xQcSD1-1SqnYSQ/exec",
        {
          method: "POST",
          body: params
        }
      );

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




