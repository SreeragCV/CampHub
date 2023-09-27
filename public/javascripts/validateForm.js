
(function() {
    'use strict';
    window.addEventListener('load', function() {
      const forms = document.getElementsByClassName('validated-form');
      const btn = this.document.getElementById('savebtn');
      const validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
          if(form.checkValidity() === true){
            btn.disabled = true;
            btn.innerText = "loading...";
          } 
        }, false);
      });
    }, false);
  })();