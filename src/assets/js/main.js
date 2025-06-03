const burger = document.querySelector(".header__burger")
let header = document.querySelector(".header")
if(burger && header){
		burger.addEventListener("click", ()=>{
		header.classList.toggle("active")
	})
}