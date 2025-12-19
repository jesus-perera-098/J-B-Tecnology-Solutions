document.addEventListener("DOMContentLoaded", () => {
  // Año automático
  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  console.log("JS cargado correctamente");

  const form = document.getElementById("contactForm");
  const toast = document.getElementById("toast");

  if (!form) {
    console.error("No se encontró el formulario");
    return;
  }

  // 👉 Función para mostrar toast
  function showToast(message, type = "success") {
    toast.textContent = message;
    toast.className = `toast show ${type}`;

    setTimeout(() => {
      toast.className = "toast";
    }, 4000);
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Submit interceptado");

    // Formato compatible con Google Apps Script
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

      showToast(
        "Mensaje enviado correctamente. Te contactaremos pronto ✅",
        "success"
      );

      form.reset();

    } catch (error) {
      console.error(error);

      showToast(
        "Error al enviar el mensaje ❌ Intenta más tarde",
        "error"
      );
    }
  });
});






