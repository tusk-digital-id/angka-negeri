import { viewAbout, viewHome, viewIndicator, viewIndicators, viewProvinces, paintProvinces } from "./views.js";

const app = document.getElementById("app");

function setNav(name) {
  document.querySelectorAll("[data-nav]").forEach((a) => a.classList.toggle("active", a.dataset.nav === name));
}

function route() {
  const hash = location.hash || "#/";
  const parts = hash.replace(/^#\//, "").split("/");
  window.scrollTo(0, 0);
  if (parts[0] === "" || parts[0] === undefined) { setNav("home"); app.innerHTML = viewHome(); }
  else if (parts[0] === "indicators") { setNav("indicators"); app.innerHTML = viewIndicators(); }
  else if (parts[0] === "indicator" && parts[1]) { setNav("indicators"); app.innerHTML = viewIndicator(parts[1]); }
  else if (parts[0] === "provinces") { setNav("provinces"); app.innerHTML = viewProvinces(); paintProvinces(); }
  else if (parts[0] === "about") { setNav("about"); app.innerHTML = viewAbout(); }
  else { setNav("home"); app.innerHTML = viewHome(); }
}

window.addEventListener("hashchange", route);
route();
