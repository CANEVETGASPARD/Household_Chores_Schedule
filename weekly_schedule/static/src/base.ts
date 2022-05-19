let burgerMenu = document.getElementById("menu-list") as HTMLUListElement;
let burgerIcon = document.getElementById("burger-icon") as HTMLDivElement;

burgerIcon.addEventListener("click", () =>{
    burgerMenu.classList.toggle("active");
    burgerIcon.classList.toggle("active");
})