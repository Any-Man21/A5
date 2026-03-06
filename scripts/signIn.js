const signInBtn = document.getElementById("signIn-btn");

signInBtn.addEventListener("click", () => {
    const username = document.getElementById("input-username").value;
    const password = document.getElementById("input-password").value;

    if (username === "admin" && password === "admin123") {
        window.location.href = "homepage.html";
    } else {
        alert("Invalid username or password");
    }
})
