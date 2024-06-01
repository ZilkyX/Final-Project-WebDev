
function openNav() {
    document.getElementById("menu-overlay").style.width = "100%";
  }
  
  function closeNav() {
    document.getElementById("menu-overlay").style.width = "0%";
  }
  $(document).ready(function(){
    $('.navbar-nav .nav-link').on('click', function(){
      $('.navbar-nav .nav-item').removeClass('clicked');
      $(this).parent().addClass('clicked');
    });
  });
  
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