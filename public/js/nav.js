fetch("nav.html")
  .then(response => response.text())
  .then(html => {
    document.getElementById("nav-container").innerHTML = html;
  })
  .catch(error => console.error("Error loading navigation:", error));