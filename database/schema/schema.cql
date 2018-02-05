create type itemDetails (itemid int, qty int, rating int);

CREATE TABLE orders (
  userid int,
  date timestamp,
  items text,
  orderid int,
  purchasemethod text,
  timestamp bigint,
  totalprice int,
  PRIMARY KEY (userId, date))
  WITH CLUSTERING ORDER BY (date DESC);

// able to query total price of each purchase method sorted by date
CREATE MATERIALIZED VIEW IF NOT EXISTS revenue_by_method
AS SELECT purchaseMethod, date, totalPrice FROM orders
WHERE purchaseMethod IS NOT NULL AND date IS NOT NULL AND totalPrice IS NOT NULL AND userId IS NOT NULL
PRIMARY KEY (purchaseMethod, userId, date)
WITH CLUSTERING ORDER BY (date DESC);

// Query items by date
CREATE MATERIALIZED VIEW IF NOT EXISTS items_by_date
AS SELECT date, items ,totalPrice FROM orders
WHERE date IS NOT NULL AND items IS NOT NULL AND totalPrice IS NOT NULL AND userId IS NOT NULL
PRIMARY KEY (date, userId);
