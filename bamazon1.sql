DROP DATABASE IF EXISTS bamazon;

CREATE database bamazon;

USE bamazon;

CREATE TABLE products(
	item_id INT(4) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(100) NOT NULL,
	department_name VARCHAR(100) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INT(20) NOT NULL,
	PRIMARY KEY (item_id)
);

Select * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("boots", "winter", 79.99, 20),
	   ("tshirt", "volleyball", 99.99, 10),
	   ("costume", "halloween", 29.99, 5),
	   ("sweater", "college", 129.99, 14),
	   ("pants", "football", 39.99, 15),
	   ("shorts", "soccer", 19.99, 19),
	   ("gloves", "christmas", 49.99, 11),
	   ("mugs", "coffee", 39.99, 10),
	   ("luggage", "travel", 9.99, 19),
	   ("snickers", "basketball", 89.99, 17)