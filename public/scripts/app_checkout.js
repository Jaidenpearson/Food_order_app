$(document).ready(function () {
// Fetch cart data and render it on the checkout page
  const fetchCartData = () => {
    $.ajax({
      url: '/api/cart',
      method: 'GET',
      success: function (cart) {
        console.log(cart)
        const { dishes, totalAmount } = cart;

        // Populate order summary table
        const $orderSummary = $('table.table-striped tbody');
        $orderSummary.empty();

        Object.entries(cart).forEach(dish => {
          const $row = $(`
            <tr>
              <td>${dish.dish-name}</td>
              <td>${dish.quantity}</td>
              <td>${dish.special-requests}</td>
              <td>$${(dish.dish-price * dish.quantity).toFixed(2)}</td>
            </tr>
          `);
          $orderSummary.append($row);
        });

        // Add total amount
        const $totalRow = $(`
          <tr>
            <td colspan="2"><strong>Total</strong></td>
            <td><strong>$${totalAmount.toFixed(2)}</strong></td>
          </tr>
        `);
        $orderSummary.append($totalRow);
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
