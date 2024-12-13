
  (function ($) {
  
  "use strict";

    // COUNTER NUMBERS
    jQuery('.counter-thumb').appear(function() {
      jQuery('.counter-number').countTo();
    });
    
    // CUSTOM LINK
    $('.smoothscroll').click(function(){
    var el = $(this).attr('href');
    var elWrapped = $(el);
    var header_height = $('.navbar').height();

    scrollToDiv(elWrapped,header_height);
    return false;

    function scrollToDiv(element,navheight){
      var offset = element.offset();
      var offsetTop = offset.top;
      var totalScroll = offsetTop-navheight;

      $('body,html').animate({
      scrollTop: totalScroll
      }, 300);
    }
});

// document.querySelectorAll('input[name="DonationPayment"]').forEach((input) => {
//   input.addEventListener('change', function() {
//       if (this.value === 'paypal') {
//           document.getElementById('paypal-button-container').style.display = 'block';
//           document.getElementById('paystack-button').style.display = 'none';
//       } else if (this.value === 'bank') {
//           document.getElementById('paypal-button-container').style.display = 'none';
//           document.getElementById('paystack-button').style.display = 'block';
//       }
//   });
// });

// // PayPal Integration
// paypal.Buttons({
//   createOrder: function(data, actions) {
//       return actions.order.create({
//           purchase_units: [{
//               amount: { value: '20' } // Replace with your donation amount
//           }]
//       });
//   },
//   onApprove: function(data, actions) {
//       return actions.order.capture().then(function(details) {
//           alert('Transaction completed by ' + details.payer.name.given_name);
//       });
//   },
//   onError: function(err) {
//       alert('Transaction failed. Please try again.');
//   }
// }).render('#paypal-button-container');

// // Paystack Integration
// document.getElementById('paystack-button').addEventListener('click', function() {
//   var handler = PaystackPop.setup({
//       key: 'pk_test_381d3f8bf19ebefa025dcc868bab0f28dbd95699', // Replace with your Paystack public key
//       email: 'customer-email@example.com', // Customer's email
//       amount: 20000, // Amount in kobo (e.g., 20000 kobo = 200 NGN)
//       currency: 'NGN', // Currency (typically NGN for Nigeria)
//       ref: 'unique-transaction-reference', // Replace with a unique transaction reference
//       callback: function(response) {
//           alert('Transaction successful. Reference: ' + response.reference);
//       },
//       onClose: function() {
//           alert('Transaction was not completed.');
//       }
//   });
//   handler.openIframe();
// });

 // Initialize PayPal Buttons
 paypal.Buttons({
  createOrder: function(data, actions) {
      return actions.order.create({
          purchase_units: [{
              amount: { value: '50' } // Donation amount
          }]
      });
  },
  onApprove: function(data, actions) {
      return actions.order.capture().then(function(details) {
          alert('Transaction successful! Paid by ' + details.payer.name.given_name);
      });
  },
  onError: function(err) {
      console.error('PayPal Error:', err);
      alert('An error occurred with PayPal: ' + err);
  }
}).render('#paypal-button-container'); // Ensure the PayPal button is rendered here

// Handle Paystack Payment
document.getElementById('paystack-button').addEventListener('click', function() {
var uniqueReference = 'ref-' + Math.floor((Math.random() * 1000000000) + 1); // Generate a unique reference

var handler = PaystackPop.setup({
key: 'pk_test_381d3f8bf19ebefa025dcc868bab0f28dbd95699', // Replace with your Paystack public key
email: 'customer-email@example.com', // Customer's email
amount: 20000, // Amount in kobo (e.g., 20000 kobo = 200 NGN)
currency: 'NGN', // Currency (typically NGN for Nigeria)
ref: uniqueReference, // Use the generated unique reference
callback: function(response) {
alert('Transaction successful. Reference: ' + response.reference);
},
onClose: function() {
alert('Transaction was not completed.');
}
});
handler.openIframe();
});


// Handle Payment Option Toggle (PayPal or Bank)
document.querySelectorAll('input[name="DonationPayment"]').forEach((input) => {
  input.addEventListener('change', function() {
      if (this.value === 'paypal') {
          document.getElementById('paypal-button-container').style.display = 'block';
          document.getElementById('paystack-button').style.display = 'none';
      } else if (this.value === 'bank') {
          document.getElementById('paypal-button-container').style.display = 'none';
          document.getElementById('paystack-button').style.display = 'block';
      }
  });
});
    
  })(window.jQuery);


