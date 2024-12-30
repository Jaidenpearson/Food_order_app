INSERT INTO Dishes (Name, Price, Description, Courses, Time_to_cook, Images)
VALUES
-- Specials
('Dragon Roll', 14.99, 'Shrimp tempura, avocado, and eel sauce.', 'specials', 15, 'https://images.unsplash.com/photo-1712192674556-4a89f20240c1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHJhZ29uJTIwcm9sbHxlbnwwfHwwfHx8MA%3D%3D'),
('Rainbow Roll', 16.99, 'Tuna, salmon, avocado, and crab stick.', 'specials', 12, 'https://images.unsplash.com/photo-1636425730652-ffdbada1ed4d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFpbmJvdyUyMHJvbGx8ZW58MHx8MHx8fDA%3D'),
('Spicy Tuna Roll', 12.99, 'Tuna, spicy mayo, and cucumber.', 'specials', 10, 'https://plus.unsplash.com/premium_photo-1712949140529-203336f93d17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c3BpY3klMjB0dW5hJTIwcm9sbHxlbnwwfHwwfHx8MA%3D%3D'),
-- Salads
('Seaweed Salad', 6.99, 'Marinated seaweed with sesame dressing.', 'salads', 5, 'https://media.istockphoto.com/id/465140316/photo/seaweed-salad.webp?a=1&b=1&s=612x612&w=0&k=20&c=AInGQY4wDqvCORkHaUZOfhSJavhJQSccFVlfOCqFDOI='),
('Spicy Crab Salad', 8.99, 'Crab, cucumber, and spicy mayo.', 'salads', 6, 'https://plus.unsplash.com/premium_photo-1664360228159-437020f924c8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3BpY3klMjBjcmFiJTIwc2FsYWR8ZW58MHx8MHx8fDA%3D'),
('Avocado Salad', 7.99, 'Fresh avocado slices with sesame dressing.', 'salads', 7, 'https://plus.unsplash.com/premium_photo-1664648005432-035f0c45fc6e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXZvY2FkbyUyMHNhbGFkfGVufDB8fDB8fHww'),
-- Appetizers
('Gyoza', 7.50, 'Pan-fried dumplings with pork filling.', 'appetizers', 8, 'https://images.unsplash.com/photo-1664138218128-2dcf791a9d27?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGd5b3phfGVufDB8fDB8fHww'),
('Edamame', 5.99, 'Steamed soybeans with sea salt.', 'appetizers', 4, 'https://plus.unsplash.com/premium_photo-1666318300348-a4d0226d81ad?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZWRhbWFtZXxlbnwwfHwwfHx8MA%3D%3D'),
('Spring Rolls', 6.99, 'Crispy rolls with vegetables and sweet chili sauce.', 'appetizers', 6, 'https://images.unsplash.com/photo-1515022376298-7333f33e704b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3ByaW5nJTIwcm9sbHN8ZW58MHx8MHx8fDA%3D'),
-- Soups
('Miso Soup', 3.99, 'Traditional Japanese soup with tofu and seaweed.', 'soups', 5, 'https://images.unsplash.com/photo-1518646261099-bd070a676912?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWlzbyUyMHNvdXB8ZW58MHx8MHx8fDA%3D'),
('Seafood Soup', 8.99, 'Rich broth with shrimp and scallops.', 'soups', 15, 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2VhZm9vZCUyMHNvdXB8ZW58MHx8MHx8fDA%3D'),
('Spicy Ramen', 12.99, 'Noodles in a spicy broth with pork belly.', 'soups', 20, 'https://images.unsplash.com/photo-1637024698421-533d83c7b883?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BpY3klMjByYW1lbnxlbnwwfHwwfHx8MA%3D%3D'),
-- Mains (Rolls)
('California Roll', 8.99, 'Crab, avocado, and cucumber.', 'mains', 8, 'https://plus.unsplash.com/premium_photo-1667545168921-34f756495d7b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FsaWZvcm5pYSUyMHJvbGx8ZW58MHx8MHx8fDA%3D'),
('Tempura Roll', 10.99, 'Shrimp tempura and avocado.', 'mains', 12, 'https://plus.unsplash.com/premium_photo-1668143358351-b20146dbcc02?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c3VzaGl8ZW58MHx8MHx8fDA%3D'),
('Volcano Roll', 13.99, 'Baked roll with spicy crab on top.', 'mains', 15, 'https://images.unsplash.com/photo-1617196035154-1e7e6e28b0db?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fHN1c2hpfGVufDB8fDB8fHww'),
-- Desserts
('Mochi Ice Cream', 5.99, 'Soft rice dough filled with ice cream.', 'desserts', 5, 'https://plus.unsplash.com/premium_photo-1700590072629-c051ca7ce0f3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bW9jaGl8ZW58MHx8MHx8fDA%3D'),
('Green Tea Cheesecake', 6.99, 'Japanese-style cheesecake.', 'desserts', 10, 'https://images.unsplash.com/photo-1702920375096-5ae53044d11c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2hlZXNlY2FrZXxlbnwwfHwwfHx8MA%3D%3D'),
('Tempura Banana', 7.99, 'Deep-fried banana with vanilla ice cream.', 'desserts', 8, 'https://images.unsplash.com/photo-1623227774108-7ab4478f50cf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVlcCUyMGZyaWVkJTIwYmFuYW5hfGVufDB8fDB8fHww'),
-- Drinks
('Green Tea', 2.99, 'Traditional Japanese green tea.', 'drinks', 2, 'https://plus.unsplash.com/premium_photo-1694540110881-84add98c0a75?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3JlZW4lMjB0ZWF8ZW58MHx8MHx8fDA%3D'),
('Sake', 6.99, 'Hot or cold rice wine.', 'drinks', 3, 'https://plus.unsplash.com/premium_photo-1668988895616-95f0ed8adba8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2FrZXxlbnwwfHwwfHx8MA%3D%3D'),
('Ramune', 3.99, 'Japanese soda with unique flavors.', 'drinks', 2, 'https://images.unsplash.com/photo-1604259596747-2377448d916d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFtdW5lfGVufDB8fDB8fHww'),
-- Sides
('Steamed Rice', 2.99, 'Perfectly steamed white rice.', 'sides', 5, 'https://plus.unsplash.com/premium_photo-1675814316651-3ce3c6409922?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmljZXxlbnwwfHwwfHx8MA%3D%3D'),
('Pickled Ginger', 1.99, 'Pickled ginger slices.', 'sides', 2, 'https://media.istockphoto.com/id/465086274/photo/pickled-ginger.jpg?s=612x612&w=0&k=20&c=FMweXjDXAT6ofMoQfNXrrmh0D2wrTb93jY6EurRI2nY='),
('Soy Sauce', 0.99, 'A side of soy sauce.', 'sides', 1, 'https://media.istockphoto.com/id/942985058/photo/pouring-soy-sauce-into-a-white-bowl.jpg?s=612x612&w=0&k=20&c=gdDWIkTHZA7WHuKC-JbYQCY7yM_Zkz_bwIoyByqa0_A='),
-- Gluten Free
('Cucumber Roll', 7.99, 'Rice, seaweed, and cucumber.', 'gluten free', 5, 'https://media.istockphoto.com/id/514004750/photo/sushi-roll-cucumber-chives-mini-kappa-maki.jpg?s=612x612&w=0&k=20&c=ZkB_bEwiLjwM0Q73QuSuzj7wevBpJjZ8JnlMOgSQYNo='),
('Avocado Roll', 8.50, 'Rice, seaweed, and avocado.', 'gluten free', 5, 'https://media.istockphoto.com/id/1411173740/photo/vegetarian-vegan-sushi-to-go-takeout.jpg?s=612x612&w=0&k=20&c=YCke9Bmczs6sIBxXf7n8NRwU91IE5SApKhyzBkEJ-Vg='),
('Sashimi Plate', 18.99, 'Fresh cuts of raw fish.', 'gluten free', 12, 'https://media.istockphoto.com/id/645670842/photo/tuna-sashimi-raw-fish-in-traditional-japanese-style.jpg?s=612x612&w=0&k=20&c=Z2POmTcl0ehMwr3wBsCO8As5JJs2O06B5t7OTfiowPk='),
-- Vegetarian
('Veggie Roll', 9.99, 'Assorted vegetables in a roll.', 'vegetarian', 8, 'https://media.istockphoto.com/id/638521128/photo/vegerarian-nori-rolls.jpg?s=612x612&w=0&k=20&c=2njrPYVUGRyhO_1KKWXu-QcSUXlR_2oSwkZaTDuF-Ag='),
('Inari Sushi', 6.99, 'Sweet tofu pockets filled with rice.', 'vegetarian', 5, 'https://media.istockphoto.com/id/1529532126/photo/inari-sushi-rice-with-tofu-pocket.jpg?s=612x612&w=0&k=20&c=SzM5aCR2t7yi46WMI3P6XDt2uV-oIVJE2Z6hWfS5A5s='),
('Tofu Teriyaki', 10.99, 'Grilled tofu with teriyaki sauce.', 'vegetarian', 15, 'https://media.istockphoto.com/id/1255205526/photo/vegan-teryaki-tempeh-or-tempe-buddha-bowls-with-rice-steamed-broccoli-spinach-and-lime-on.jpg?s=612x612&w=0&k=20&c=_c5cp7hiWz7Jn4TnGcQAgFBYoN2c5YAdTXoonyEjP1Y=');
