// 🌐 Handle language selection
const languageSelector = document.getElementById("languageSelector");
if (languageSelector) {
  languageSelector.addEventListener("change", (e) => {
    const selectedLang = e.target.value;
    localStorage.setItem("preferredLanguage", selectedLang);
  });
}

// 🚀 Handle Next button click
const nextBtn = document.getElementById("nextBtn");
if (nextBtn) {
  nextBtn.addEventListener("click", signup);
}

async function signup() {
  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const role = document.getElementById("role").value;

  // 🧩 Basic validation
  if (!firstName || !lastName || !role) {
    alert("Please fill out all fields.");
    return;
  }

  // 💾 Store temporary user info before verification
  localStorage.setItem("tempFirstName", firstName);
  localStorage.setItem("tempLastName", lastName);
  localStorage.setItem("tempRole", role);

  // 🔄 Redirect to email verification page
  window.location.href = "verify-email.html";
}
