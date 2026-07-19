// frontend/create-account.js
console.log("🟢 create-account.js LOADED");

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("createAccountForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value.trim();
    const role = document.getElementById("role").value;

    if (!firstName || !lastName || !email || !phone || !password) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      const res = await fetch("https://flexago-backend.onrender.com/api/account/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          password,
          role,
          kycVerified: true
        })
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message || "Unable to create account.");
        return;
      }

      // Save user in localStorage
      localStorage.setItem("flexagoUser", JSON.stringify(data.user));

      // ⭐ Redirect based on role
      if (role === "traveler") {
        window.location.href = "traveler.html";
      } else {
        window.location.href = "Sender.html";
      }

    } catch (err) {
      console.error("❌ Create Account Error:", err);
      alert("Something went wrong. Please try again.");
    }
  });
});
