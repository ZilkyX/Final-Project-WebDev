let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");

closeBtn.addEventListener("click", ()=>{
sidebar.classList.toggle("open");
menuBtnChange();
});


function menuBtnChange() {
if(sidebar.classList.contains("open")){
closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
}else {
closeBtn.classList.replace("bx-menu-alt-right","bx-menu");
}
}

function showSection(sectionId) {
    document.querySelectorAll('section').forEach(function(section) {
        section.style.display = 'none';
    });

    document.getElementById(sectionId).style.display = 'block';
}

showSection('dashboard'); 
