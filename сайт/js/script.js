
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
 
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

  
  icon

//   $(document).on("click", ".goods a", function(e) {
//     e.preventDefault();
//     const value = $(this).text() || $(this).data("text");
//     $('.of_input').val( value );
// });


