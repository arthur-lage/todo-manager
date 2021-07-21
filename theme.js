const themeToggler = document.querySelector("#theme-toggler")
const themeTogglerIcon = document.querySelector("#theme-toggler img")

themeToggler.addEventListener("click", () => {
    if (document.body.classList.contains("dark")) {
        document.body.style.transition = ".5s ease"
        themeTogglerIcon.src = "images/icon-moon.svg"
        document.querySelector(".header-background").style.transition = ".5s ease"
        localStorage.setItem("theme", "light")
        document.body.classList.remove("dark")
    } else {
        document.body.style.transition = ".5s ease"
        document.querySelector(".header-background").style.transition = ".5s ease"
        themeTogglerIcon.src = "images/icon-sun.svg"
        localStorage.setItem("theme", "dark")
        document.body.classList.add("dark")
    }
})

window.addEventListener('DOMContentLoaded', () => {
    const theme = localStorage.getItem("theme")

    document.body.style.transition = ''

    if(theme == "") localStorage.setItem("theme", "light")

    if(theme == "dark") {
        document.body.classList.add("dark")
        themeTogglerIcon.src = "images/icon-sun.svg"
    }
    
    if(theme == "light") {
        document.body.classList.remove("dark")
        themeTogglerIcon.src = "images/icon-moon.svg"
        
    }
});