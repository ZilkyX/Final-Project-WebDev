function showSection(sectionId) {
  document.querySelectorAll('section').forEach(function(section) {
      section.style.display = 'none';
  });

  document.getElementById(sectionId).style.display = 'block';
}

showSection('home'); 