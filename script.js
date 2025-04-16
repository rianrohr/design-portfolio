fetch("header.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("header-placeholder").innerHTML = data;

    const toggleBtn = document.querySelector(".theme-toggle");
    const body = document.body;
    if (localStorage.getItem("theme") === "light") {
      body.classList.add("light-mode");
    }
    toggleBtn.addEventListener("click", () => {
      body.classList.toggle("light-mode");
      const theme = body.classList.contains("light-mode") ? "light" : "dark";
      localStorage.setItem("theme", theme);
    });
  })
  .catch(error => console.error("Failed to load header.html:", error));
