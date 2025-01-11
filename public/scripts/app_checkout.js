$(document).ready(function () {

  $('#ordered-dish-container').empty();
// Populate order summary table
  function createOrderHTML(order) {
    const $row = $(`
      <tr>
        <td>${order["dish-name"]}</td>
        <td>${order.quantity}</td>
        <td>$${(order["dish-price"] * order.quantity).toFixed(2)}</td>
        <td>${order["special-requests"]}</td>
      </tr>
    `);
    return $('#ordered-dish-container').append($row);
  };

  const createOrder = function(dishes) {
    dishes.forEach(dish => {
      const $orderedDish = createOrderHTML(dish);
      $('#ordered-dish-container').append($orderedDish);
    });
  }

  const totalAmount = function(dishes) {
    orderTotal = dishes.reduce((total, dish) => {
      return total + (dish["dish-price"] * dish.quantity);
    }, 0);
    const $totalRow = $(`
      <tr>
        <td colspan="2"><strong>Total</strong></td>
        <td><strong>$${orderTotal}</strong></td>
      </tr>
    `);
    return $('#ordered-dish-container').append($totalRow);
  }

// Fetch cart data and render it on the checkout page
  const fetchCartData = () => {
    $.ajax({
      url: '/api/cart',
      method: 'GET',
      success: function (cart) {
        console.log(cart)
        createOrder(cart);
        totalAmount(cart);
      },
        error: function (err) {
        console.error('Error fetching cart data:', err);
      }
    });
  };

  // Fetch cart data on page load
  fetchCartData();

  // Handle order submission
  $('form').on('submit', function (event) {
    event.preventDefault();

    const orderDetails = {
      fullName: $('#fullName').val(),
      email: $('#email').val(),
      phone: $('#phone').val(),
      paymentMethod: $('#payment').val(),
    };

    // Send order data to the server
    $.ajax({
      url: '/api/checkout',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(orderDetails),
      success: function (response) {
        alert('Order placed successfully!');
        // Redirect to a confirmation page or clear the cart
        window.location.href = '/order-confirmation';
      },
      error: function (err) {
        console.error('Error placing order:', err);
        alert('An error occurred while placing your order. Please try again.');
      }
    });
  });
});
