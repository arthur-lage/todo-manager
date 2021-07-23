const themeToggler = document.querySelector("#theme-toggler");
const themeTogglerIcon = document.querySelector("#theme-toggler img");

themeToggler.addEventListener("click", () => {
  if (document.body.classList.contains("dark")) {
    document.body.style.transition = ".5s ease";
    themeTogglerIcon.src = "images/icon-moon.svg";
    document.querySelector(".header-background").style.transition = ".5s ease";
    localStorage.setItem("theme", "light");

    document.querySelectorAll(".task .task-complete img").forEach((task) => {
      task.src = "images/icon-check-black.svg";
    });
    document.querySelectorAll(".task .task-delete img").forEach((task) => {
      task.src = "images/icon-cross-black.svg";
    });

    document.body.classList.remove("dark");
  } else {
    document.body.style.transition = ".5s ease";
    document.querySelector(".header-background").style.transition = ".5s ease";
    themeTogglerIcon.src = "images/icon-sun.svg";
    localStorage.setItem("theme", "dark");

    document.querySelectorAll(".task .task-complete img").forEach((task) => {
      task.src = "images/icon-check.svg";
    });
    document.querySelectorAll(".task .task-delete img").forEach((task) => {
      task.src = "images/icon-cross.svg";
    });

    document.body.classList.add("dark");
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const theme = localStorage.getItem("theme");

  document.body.style.transition = "";

  if (theme == "") localStorage.setItem("theme", "light");
  if (theme == null) localStorage.setItem("theme", "light");

  if (theme == "dark") {
    document.body.classList.add("dark");
    themeTogglerIcon.src = "images/icon-sun.svg";

    document.querySelectorAll(".task .task-complete img").forEach((task) => {
      task.src = "images/icon-check.svg";
    });
    document.querySelectorAll(".task .task-delete img").forEach((task) => {
      task.src = "images/icon-cross.svg";
    });
  }

  if (theme == "light") {
    document.body.classList.remove("dark");
    themeTogglerIcon.src = "images/icon-moon.svg";

    document.querySelectorAll(".task .task-complete img").forEach((task) => {
      task.src = "images/icon-check-black.svg";
    });
    document.querySelectorAll(".task .task-delete img").forEach((task) => {
      task.src = "images/icon-cross-black.svg";
    });
  }
});
