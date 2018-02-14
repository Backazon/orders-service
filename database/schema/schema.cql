-- ========================================
--  ===VERSION 2 WITHOUT NESTED ITEMS===
-- ========================================
CREATE KEYSPACE IF NOT EXISTS backazon with replication = {'class': 'SimpleStrategy', 'replication_factor':3};

USE backazon;

CREATE TABLE orders (
  userid int,
  date timestamp,
  itemid int,
  orderid int,
  purchasemethod text,
  qty int,
  rating int,
  timestamp bigint,
  totalprice int,
  PRIMARY KEY (userId, date))
  WITH CLUSTERING ORDER BY (date DESC);

-- COPY backazon.orders (userid, date, itemid, orderid, purchasemethod, qty, rating, timestamp, totalprice) FROM '/Users/chasekaylee/apache-cassandra-3.11.1/historical-order-data/orders-historical-data1.csv' WITH DELIMITER='|';

-- query total price of each purchase method sorted by date
CREATE MATERIALIZED VIEW IF NOT EXISTS revenue_by_method
AS SELECT purchaseMethod, date, totalPrice FROM orders
WHERE purchaseMethod IS NOT NULL AND date IS NOT NULL AND totalPrice IS NOT NULL AND userId IS NOT NULL
PRIMARY KEY (purchaseMethod, userId, date)
WITH CLUSTERING ORDER BY (date DESC);

CREATE MATERIALIZED VIEW IF NOT EXISTS items_by_date
AS SELECT date, itemid, qty, rating, totalPrice FROM orders
WHERE date IS NOT NULL AND itemid IS NOT NULL AND qty IS NOT NULL AND rating IS NOT NULL AND totalPrice IS NOT NULL AND userId IS NOT NULL
PRIMARY KEY (date, userId);


-- ========================================
--  ===VERSION 1 WITH NESTED ITEMS===
-- ========================================
-- create type itemDetails (itemid int, qty int, rating int);
-- CREATE TABLE IF NOT EXISTS test (
--   userid int,
--   date timestamp,
--   items list<frozen<itemDetails>>,
--   orderid int,
--   purchasemethod text,
--   timestamp bigint,
--   totalprice int,
--   PRIMARY KEY (userId, date))
--   WITH CLUSTERING ORDER BY (date DESC);

-- -- able to query total price of each purchase method sorted by date
-- CREATE MATERIALIZED VIEW IF NOT EXISTS revenue_by_method
-- AS SELECT purchaseMethod, date, totalPrice FROM orders
-- WHERE purchaseMethod IS NOT NULL AND date IS NOT NULL AND totalPrice IS NOT NULL AND userId IS NOT NULL
-- PRIMARY KEY (purchaseMethod, userId, date)
-- WITH CLUSTERING ORDER BY (date DESC);

-- -- Query items by date
-- CREATE MATERIALIZED VIEW IF NOT EXISTS items_by_date
-- AS SELECT date, items ,totalPrice FROM orders
-- WHERE date IS NOT NULL AND items IS NOT NULL AND totalPrice IS NOT NULL AND userId IS NOT NULL
-- PRIMARY KEY (date, userId);
