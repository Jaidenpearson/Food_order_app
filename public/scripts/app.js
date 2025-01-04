$('#menu-toggle').on('click', function() {
  $('.sub-nav').toggle(300)
  $('.fa-angle-up').toggle()
  $('.fa-angle-down').toggle()
});

const createMenuItem = function(dish) {
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

const createCourseHTML = function(course) {
  let $course = $(`
    <section class="menu-categories resume-section" id="${course}">
      <h2 class="mb-5">${course}</h2>
    </section>
  `);
  return $course;
};

const createCourses = function(courses) {
  for (const course of courses) {
    const $course = createCourseHTML(course);
    $('#menu-container').append($course);
  }
}

$.ajax({
  url: '/api/dishes',
  method: 'GET',
  success: function(dishes) {
    console.log('Dishes fetched:', dishes); // Debugging line
    const $menu = createMenuData(dishes);
    $('#menu-container').append($menu);
  },
  error: function(err) {
    console.error('Error fetching dishes:', err);
  }
});
