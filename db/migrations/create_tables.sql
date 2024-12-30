-- create_tables.sql
CREATE TABLE Restaurant (
    UniqueID SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Phone_Number VARCHAR(15) NOT NULL
);

CREATE TABLE Client (
    UniqueID SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Phone_Number VARCHAR(15) NOT NULL
);

CREATE TABLE Dishes (
    UniqueID SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Price DECIMAL(10, 2) NOT NULL,
    Description TEXT,
    Courses VARCHAR(255),
    Time_to_cook TINYINT
    Images IMAGE
);

CREATE TABLE Orders (
    UniqueID SERIAL PRIMARY KEY,
    Client_id INT NOT NULL,
    Status VARCHAR(50) NOT NULL,
    Pickup_time TIMESTAMP,
    Created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_client FOREIGN KEY (Client_id) REFERENCES Client(UniqueID)
);

CREATE TABLE Ordered_dishes (
    UniqueID SERIAL PRIMARY KEY,
    Order_id INT NOT NULL,
    Dish_id INT NOT NULL,
    Quantity INT NOT NULL CHECK (Quantity > 0),
    CONSTRAINT fk_order FOREIGN KEY (Order_id) REFERENCES Orders(UniqueID),
    CONSTRAINT fk_dish FOREIGN KEY (Dish_id) REFERENCES Dishes(UniqueID)
);

CREATE TABLE Combined_notifications (
    UniqueID SERIAL PRIMARY KEY,
    Order_id INT NOT NULL,
    Recipient VARCHAR(255) NOT NULL,
    Message TEXT NOT NULL,
    Sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Restaurant_Ticket VARCHAR(50),
    Status VARCHAR(50),
    CONSTRAINT fk_order_notification FOREIGN KEY (Order_id) REFERENCES Orders(UniqueID)
);
