$(document).ready(function () {
  // Initialize Stripe with your public key
  const stripe = Stripe('pk_test_51QgBDKIdoKbS5vetlDORSLcQoMOl2In5LV82y0jJe77SDft60OXbEj6dgfBgwW3DztcZ61oVCeRi2gPIiPlime4100BXoHucEf'); // Replace with your actual Stripe public key
  const elements = stripe.elements();
  const card = elements.create('card');
  card.mount('#card-element');

  // Handle real-time validation errors from the card element
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
    return $(`
      <tr>
        <td>${order["dish-name"]}</td>
        <td>${order.quantity}</td>
        <td>$${(order["dish-price"] * order.quantity).toFixed(2)}</td>
        <td><button class="btn btn-danger remove-item" data-id="${order["dish-id"]}">Remove</button></td>
      </tr>
    `);
  }

  function createOrder(dishes) {
    dishes.forEach((dish) => {
      const $orderedDish = createOrderHTML(dish);
      $('#ordered-dish-container').append($orderedDish);
    });
  }

  function totalAmount(dishes) {
    const orderTotal = dishes.reduce((total, dish) => total + dish["dish-price"] * dish.quantity, 0);
    $('#ordered-dish-container').append(`
      <tr>
        <td colspan="2"><strong>Total</strong></td>
        <td id="order-total"><strong>$${orderTotal.toFixed(2)}</strong></td>
      </tr>
    `);
  }

  // Fetch cart data and render it on the checkout page
  const fetchCartData = () => {
    $.ajax({
      url: '/api/cart',
      method: 'GET',
      success: function (cart) {
        $('#ordered-dish-container').empty(); // Clear previous data
        if (cart.length === 0) {
          $('#ordered-dish-container').html('<tr><td colspan="4">Your cart is empty.</td></tr>');
          return;
        }
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
    const totalAmountText = $('#order-total').text().replace('$', '');
    const totalAmount = parseFloat(totalAmountText);

    if (isNaN(totalAmount) || totalAmount <= 0) {
      console.error('Invalid total amount:', totalAmountText);
      alert('Invalid total amount. Please check your order.');
      return;
    }

    const orderDetails = {
      amount: totalAmount,
      currency: 'usd',
      phone: $('#phone').val(),
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
      data: JSON.stringify(orderDetails),
      success: function (response) {
        stripe
          .confirmCardPayment(response.clientSecret, {
            payment_method: {
              card: card,
            },
          })
          .then((result) => {
            if (result.error) {
              console.error('Payment error:', result.error);
              alert('Payment failed. Please try again.');
            } else {
              alert('Payment successful!');
              window.location.href = '/order-confirmation';
            }
          });
      },
      error: function (err) {
        console.error('Error creating payment intent:', err);
        alert('An error occurred while processing your payment. Please try again.');
      },
    });
  });

  // Handle item removal from the cart
  $(document).on('click', '.remove-item', function () {
    const id = $(this).data('id');
    $.ajax({
      url: `/api/cart/${id}`,
      method: 'DELETE',
      success: function () {
        fetchCartData(); // Refresh the cart data
      },
      error: function (err) {
        console.error('Error removing item:', err);
      },
    });
  });
});
