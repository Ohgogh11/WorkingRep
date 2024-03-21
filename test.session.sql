-- @block 
CREATE TABLE Users(
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone_number VARCHAR(20) NOT NULL UNIQUE,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    permission ENUM('regular', 'admin') NOT NULL DEFAULT 'regular'
);
-- @block 
CREATE TABLE Products(
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(255) NOT NULL,
    product_description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT NOT NULL,
    product_image BLOB NOT NULL
);
-- @block 
CREATE TABLE userbanlist(
    user_id INT PRIMARY KEY,
    banned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_date TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
-- @block
CREATE TABLE Barbers (
    barber_id INT PRIMARY KEY,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
-- @block
CREATE TABLE AppointmentTypes (
    appointment_name VARCHAR(255) PRIMARY KEY,
    barber_id INT NOT NULL,
    cost DECIMAL(10, 2) NOT NULL,
    description TEXT,
    FOREIGN KEY (barber_id) REFERENCES Barbers(barber_id)
);
-- @block 
CREATE TABLE Appointments (
    user_id INT,
    barber_id INT,
    appointment_date DATE,
    appointment_time TIME,
    appointment_name VARCHAR(255),
    status ENUM('none', 'pending', 'confirmed') DEFAULT 'none',
    PRIMARY KEY (user_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (barber_id) REFERENCES Barbers(barber_id),
    FOREIGN KEY (appointment_name) REFERENCES AppointmentTypes(appointment_name)
);
-- @block 
CREATE TABLE Wishlist (
    wishlist_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    product_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);
-- @block
CREATE TABLE ShoppingCart (
    cart_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    product_id INT,
    quantity INT,
    added_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);
-- @block
CREATE TABLE DefaultWorkingHours(
    day_of_week INT NOT NULL PRIMARY KEY,
    barber_id INT NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    appointment_duration INT NOT NULL,
    FOREIGN KEY (barber_id) REFERENCES Barbers(barber_id)
);
-- @block
CREATE TABLE Breaks(
    day_of_week INT NOT NULL PRIMARY KEY,
    barber_id INT NOT NULL,
    break_start_time TIME NOT NULL,
    break_end_time TIME NOT NULL,
    FOREIGN KEY (barber_id) REFERENCES Barbers(barber_id)
);
-- @block
CREATE TABLE DefaultHolidayHours(
    holiday_date DATE NOT NULL PRIMARY KEY,
    barber_id INT NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    appointment_duration INT NOT NULL,
    FOREIGN KEY (barber_id) REFERENCES Barbers(barber_id)
);


-- @block
ALTER TABLE breaks
MODIFY COLUMN day_of_week ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');
