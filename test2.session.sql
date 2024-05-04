-- @block
-- Rename the column from "product image" to "image_url"
ALTER TABLE Products
RENAME COLUMN product_image TO image_url;

-- @block
-- Change the data type of the column to VARCHAR assuming the URL length
-- Adjust the length (1000 in this case) according to your needs
ALTER TABLE Products
MODIfy COLUMN image_url VARCHAR(255);

-- @block
INSERT INTO products (
    product_name,
    product_description,
    price,
    stock_quantity,
    image_url
  )
VALUES (
    'test',
    'test',
    100,
    100,
    'http://localhost:5000/api/images/image_1.jpg'
  );

  -- @block
  INSERT INTO products (
      product_id,
      product_name,
      product_description,
      price,
      stock_quantity,
      image_url
    )
  VALUES (
      product_id:int,
      'product_name:varchar',
      'product_description:text',
      'price:decimal',
      stock_quantity:int,
      'image_url:varchar'
    );

    -- @block
    INSERT INTO appointments (
        user_id,
        user_id,
        barber_id,
        appointment_date,
        appointment_time,
        appointment_name,
        status
      )
    VALUES (
        user_id:int,
        user_id:int,
        barber_id:int,
        'appointment_date:date',
        'appointment_time:time',
        'appointment_name:varchar',
        'status:enum'
      );



      INSERT INTO barber_schedule (
          day_of_week,
          barber_id,
          barber_id,
          start_time,
          end_time,
          appointment_duration
        )
      VALUES (
          'day_of_week:enum',
          barber_id:int,
          barber_id:int,
          'start_time:time',
          'end_time:time',
          appointment_duration:int
        );