SELECT
    Orders.UniqueID AS order_id,
    Dishes.Name AS menu_item_name,
    Ordered_dishes.Quantity AS quantity,
    Dishes.Price AS price,
    (Ordered_dishes.Quantity * Dishes.Price) AS total_price
FROM
    Orders
JOIN
    Ordered_dishes ON Orders.UniqueID = Ordered_dishes.Order_id
JOIN
    Dishes ON Ordered_dishes.Dish_id = Dishes.UniqueID
ORDER BY
    Orders.Created_at DESC;

