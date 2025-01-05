$('#menu-toggle').on('click', function() {
  $('.sub-nav').toggle(300)
  $('.fa-angle-up').toggle()
  $('.fa-angle-down').toggle()
});


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

const createCourses = function(courses) {
  console.log('Creating courses:', courses); // Debugging line
  courses.forEach(course => {
    const $course = createCourseHTML(course);
    $('#menu-container').append($course);
  });
};

const createDishHTML = function(dish) {
  let $dish = $(`
    <div class="menu-item-container">
      <div>
        <h3 class="mb-0">${dish.name}</h3>
        <div class="item-sub-container">
          <p>${dish.description}</p>
          <button class="btn btn-outline-primary text-nowrap">Add to order</button>
        </div>
      </div>
      <div class="dish-image-container"><img class="dish-image" src="${dish.images}" alt=""></div>
    </div>
  `);
  return $dish;
};

const createDishes = function(dishes) {
  dishes.forEach(dish => {
    const $dish = createDishHTML(dish);
    $(`#${dish.courses}`).append($dish);
  });
}

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



