$(document).ready(function () {
  // Initialize Stripe with your public key
  const stripe = Stripe('pk_test_51QgBDKIdoKbS5vetlDORSLcQoMOl2In5LV82y0jJe77SDft60OXbEj6dgfBgwW3DztcZ61oVCeRi2gPIiPlime4100BXoHucEf'); // Replace with your actual Stripe public key
  const elements = stripe.elements(); // Create an instance of Stripe Elements
  const card = elements.create('card'); // Create a card element
  card.mount('#card-element'); // Mount it to the `#card-element` div in your HTML

  // Handle real-time validation errors from the card Element
  card.on('change', function (event) {
    const displayError = $('#card-errors');
    if (event.error) {
      displayError.text(event.error.message);
    } else {
      displayError.text('');
    }
  });

  // Populate order summary table
  function createOrderHTML(order) {
    const $row = $(`
      <tr>
        <td>${order["dish-name"]}</td>
        <td>${order.quantity}</td>
        <td>$${(order["dish-price"] * order.quantity).toFixed(2)}</td>
        <td><button class="btn btn-danger remove-item" data-id="${order["dish-id"]}">Remove</button></td>
      </tr>
    `);
    return $('#ordered-dish-container').append($row);
  }

  const createOrder = function (dishes) {
    dishes.forEach((dish) => {
      const $orderedDish = createOrderHTML(dish);
      $('#ordered-dish-container').append($orderedDish);
    });
  };

  const totalAmount = function (dishes) {
    const orderTotal = dishes.reduce((total, dish) => {
      return total + dish["dish-price"] * dish.quantity;
    }, 0);
    const $totalRow = $(`
      <tr>
        <td colspan="2"><strong>Total</strong></td>
        <td><strong>$${orderTotal.toFixed(2)}</strong></td>
      </tr>
    `);
    return $('#ordered-dish-container').append($totalRow);
  };

  // Fetch cart data and render it on the checkout page
  const fetchCartData = () => {
    $.ajax({
      url: '/api/cart',
      method: 'GET',
      success: function (cart) {
        createOrder(cart);
        totalAmount(cart);
      },
      error: function (err) {
        console.error('Error fetching cart data:', err);
      },
    });
  };

  // Fetch cart data on page load
  fetchCartData();

  // Handle Stripe Checkout
  $('#place-order-btn').on('click', function () {
    // Extract the total amount from the order summary
    const totalAmount = parseFloat($('#order-total').text().replace('$', ''));

    if (isNaN(totalAmount)) {
      alert('Invalid total amount. Please check your order.');
      return;
    }

    // Capture additional order details, including phone number
    const orderDetails = {
      amount: totalAmount,
      currency: 'usd',
      phone: $('#phone').val(), // Add phone number here
    };

    // Validate the phone number
    if (!orderDetails.phone || orderDetails.phone.trim() === '') {
      alert('Phone number is required.');
      return;
    }

    // Send payment intent request to the backend
    $.ajax({
      url: '/api/checkout/create-payment-intent',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(orderDetails), // Send phone number along with amount and currency
      success: function (response) {
        stripe
          .confirmCardPayment(response.clientSecret, {
            payment_method: {
              card: card, // Pass the card element here
            },
          })
          .then((result) => {
            if (result.error) {
              console.error('Payment error:', result.error);
              alert('Payment failed. Please try again.');
            } else {
              alert('Payment successful!');
              window.location.href = '/order-confirmation'; // Redirect to confirmation page
            }
          });
      },
      error: function (err) {
        console.error('Error creating payment intent:', err);
        alert('An error occurred while processing your payment. Please try again.');
      },
    });
  });

  $(document).on('click', '.remove-item', function () {
    const id = $(this).data('id');
    $.ajax({
      url: `/api/cart/${id}`,
      method: 'DELETE',
      success: function (response) {
        $('#ordered-dish-container').empty(); // Clear the order summary table
        fetchCartData(); // Refresh the cart data
      },
      error: function (err) {
        console.error('Error removing item:', err);
      }
    });
  });
});
