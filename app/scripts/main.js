(function() {
  var $ = require('jquery');
  var validate = require('jquery-validation');

  window.$ = window.jQuery = $;

  var bootstrap = require('bootstrap-sass');

  var formHelpers = {
    sendButtonResponse: function(btnEl, success) {
      var delay = btnEl.hasClass('send-clicked') ? 1500 : 0
        , noSendDelay = 2000;

      setTimeout(function() {
        btnEl.removeClass('send-clicked' );
        btnEl.addClass(success ? 'send-success' : 'send-fail');
      }, delay);


      setTimeout(function() {
        btnEl.removeClass('send-fail');
      }, delay + noSendDelay);
    }
  };

  $('#contact-form').submit(function(e) {
    e.preventDefault();
  });

  $('[data-scrollto]').click(function(e) {
    $('html, body').animate({
      scrollTop: $($(e.target).data('scrollto')).offset().top
    }, 300);
  });

  $(document).ready(function() {
    $('#contact-form').validate({
      rules: {
        name: 'required',
        email: {
          required: true,
          email: true
        },
        companyName: 'required'
      },
      messages: {
        name: 'Please enter your name',
        email: 'Please enter a valid email address',
        companyName: 'Enter your Company Name'
      },
      submitHandler: function(form) {
        var contactForm = $(form)
          , baseUrl = 'https://script.google.com/macros/s/AKfycbzORIb3bDCNvwOy9VmgN04EQ6JxCgOcxSuY7ycGQgAV-_On690/exec'
          , name = contactForm.find('#name')
          , email = contactForm.find('#email')
          , phone = contactForm.find('#phone')
          , companySize = contactForm.find('#companySize')
          , companyName = contactForm.find('#companyName')
          , message = contactForm.find('#message')
          , sendBtn = contactForm.find(':submit');

        if(sendBtn.hasClass('send-success' || sendBtn.hasClass('send-clicked'))) {
          return true;
        }

        sendBtn.addClass('send-clicked');

        $.ajax({
          url: baseUrl,
          data: {
            'name': name.val(),
            'email': email.val(),
            'phone': phone.val(),
            'company-name': companyName.val(),
            'company-size': companySize.val(),
            'message': message.val()
          },
          type: 'POST',
          dataType: 'xml',
          success: function() {
            name.val('');
            email.val('');
            phone.val('');
            companySize.val('');
            companyName.val('');
            message.val('');

            formHelpers.sendButtonResponse(sendBtn, true);
          },
          error: function(xhr, textStatus, errorThrown){
            formHelpers.sendButtonResponse(sendBtn, true);
          }
        });
      },
      invalidHandler: function(form, validator) {
        formHelpers.sendButtonResponse($(form.target).find(':submit'), false);
      },
      errorElement: "span",
      errorClass: "help-block",
      highlight: function(element, errorClass, validClass) {
        $(element).closest('.form-group').addClass('has-error');
      },
      unhighlight: function(element, errorClass, validClass) {
        $(element).closest('.form-group').removeClass('has-error');
      },
      errorPlacement: function(error, element) {
        if (element.parent('.input-group').length || element.prop('type') === 'checkbox' || element.prop('type') === 'radio') {
          error.insertAfter(element.parent());
        } else {
          error.insertAfter(element);
        }
      }
    });
  })
})();
