$(document).ready(function() {
//Nav bar menu toggle
$('#menu-toggle').on('click', function() {
  $('.sub-nav').toggle(300)
  $('.fa-angle-up').toggle()
  $('.fa-angle-down').toggle()
});

//Course HTML to organize menu page
const createCourseHTML = function(course) {
  let $course = $(`
    <section class="menu-categories resume-section" ">
      <h2 class="mb-5">${course.courses}</h2>
      <div id="${course.courses}" class="menu-items">
      </div>
    </section>
  `);
  return $course;
};

//Sorts courses so they render inproper order
const createCourses = function(courses) {
  console.log('Creating courses:', courses); // Debugging line

  const courseOrder = [
    'specials',
    'salads',
    'appetizers',
    'soups',
    'mains',
    'desserts',
    'drinks',
    'sides',
    'gluten free',
    'vegetarian'
  ];

  courses.sort((a, b) => {
    return courseOrder.indexOf(a.courses) - courseOrder.indexOf(b.courses);
  });

  courses.forEach(course => {
    const $course = createCourseHTML(course);
    $('#menu-container').append($course);
  });
};

//HTML for each dish
const createDishHTML = function(dish) {
  let $dish = $(`
    <div class="menu-item-container">
      <div>
        <h3 class="mb-0">${dish.name}</h3>
        <div class="item-sub-container">
          <p>${dish.description}</p>
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Add to Cart
            </button>
        </div>
      </div>
      <div class="dish-image-container"><img class="dish-image" src="${dish.images}" alt=""></div>
    </div>
  `);
  return $dish;
};

//Appends dishes to the proper course
const createDishes = function(dishes) {
  dishes.forEach(dish => {
    const $dish = createDishHTML(dish);
    $(`#${dish.courses}`).append($dish);
  });
}


//AJAX request to create courses and then dishes on success
$.ajax({
  url: '/api/courses',
  method: 'GET',
  success: function(courses) {
    createCourses(courses);

    $.ajax({
      url: '/api/dishes',
      method: 'GET',
      success: function(dishes) {
        console.log('Dishes fetched:', dishes); // Debugging line
        createDishes(dishes);
      },
      error: function(err) {
        console.error('Error fetching dishes:', err);
      }
    })
  },
  error: function(err) {
    console.error('Error fetching dishes:', err);
  }

});

//Dish modal that appears when click 'add to cart' button

const createModal = function(dish) {
  let $modal = $(`
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
`);
    $('body').append($modal);
    };

createModal();

});

// $(document).on('click', '.btn-outline-primary', function() {
//   $modal.appendTo('body').modal('show');
// });

