-- migrations/insert_menu_items.sql
INSERT INTO Dishes (Name, Price, Description, Courses, Images) VALUES
-- Specials
('Chef\'s Special Sushi Platter', 29.99, 'A selection of premium sushi chosen by the chef.', 'Main Course', 'special_platter.jpg'),
('Premium Sashimi Combo', 35.99, 'An assortment of fresh sashimi.', 'Main Course', 'sashimi_combo.jpg'),

-- Salads
('Seaweed Salad', 5.99, 'Fresh seaweed with sesame dressing.', 'Appetizer', 'seaweed_salad.jpg'),
('Cucumber Salad', 4.99, 'Refreshing cucumber slices with vinegar dressing.', 'Appetizer', 'cucumber_salad.jpg'),

-- Appetizers
('Edamame', 4.99, 'Steamed soybeans lightly salted.', 'Appetizer', 'edamame.jpg'),
('Gyoza', 6.99, 'Pan-fried dumplings filled with pork and vegetables.', 'Appetizer', 'gyoza.jpg'),

-- Mains
('California Roll', 8.99, 'Crab, avocado, and cucumber rolled in seaweed and rice.', 'Main Course', 'california_roll.jpg'),
('Dragon Roll', 12.99, 'Shrimp tempura and avocado topped with eel and avocado.', 'Main Course', 'dragon_roll.jpg'),

-- Desserts
('Mochi Ice Cream', 3.99, 'Ice cream wrapped in sweet rice dough.', 'Dessert', 'mochi.jpg'),
('Matcha Cheesecake', 5.99, 'Creamy cheesecake with a green tea flavor.', 'Dessert', 'matcha_cheesecake.jpg'),

-- Drinks
('Green Tea', 2.99, 'Hot or iced Japanese green tea.', 'Drink', 'green_tea.jpg'),
('Sake', 8.99, 'Traditional Japanese rice wine.', 'Drink', 'sake.jpg'),

-- Sides
('Rice', 1.99, 'Steamed white rice.', 'Side', 'rice.jpg'),
('Miso Soup', 2.99, 'Traditional Japanese soup with tofu and seaweed.', 'Appetizer', 'miso_soup.jpg');
