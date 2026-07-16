async function login(email, password) {
  try {
    const res = await fetch("https://flexago-backend.onrender.com/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const result = await res.json();

    // Backend may not return "success", so check HTTP status instead
    if (!res.ok) {
      alert(result.error || "Login failed");
      return;
    }

    const user = result.data || result.user;

    if (!user) {
      alert("Login failed: no user returned from server");
      return;
    }

    // Save user object
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("userId", user._id);

    // Traveler-specific ID
    if (user.role === "traveler") {
      window.travelerId = user._id;
    }

    // Redirect based on role
    if (user.role === "sender") {
      window.location.href = "Sender.html";
    } else if (user.role === "traveler") {
      window.location.href = "Traveler.html";
    } else {
      alert("Unknown role");
    }

  } catch (err) {
    console.error("Login error:", err);
    alert("Unable to connect to server. Please try again.");
  }
}

// ⭐ ADD THIS — without it, clicking Login does NOTHING
document.getElementById("login-btn").addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  login(email, password);
});
