INSERT INTO CAKE (id, name, price, available) VALUES (1, 'Shrove Tuesday Buns', 2.00, true);
INSERT INTO CAKE (id, name, price, available) VALUES (2, 'Brita kook', 18.00, false);
INSERT INTO CAKE (id, name, price, available) VALUES (3, 'Cherry strudel', 11.00, true);

INSERT INTO ORDER (id, customer_name, price, status_code) VALUES (1, 'Jack Bauer', 52.00, 'SUBMITTED');
INSERT INTO ORDER (id, customer_name, price, status_code) VALUES (2, 'Homer Simpson', 19.00, 'READY');
INSERT INTO ORDER (id, customer_name, price, status_code) VALUES (3, 'Barbie', 442.00, 'CANCELLED');
INSERT INTO ORDER (id, customer_name, price, status_code) VALUES (4, 'Terminator', 1.00, 'DELIVERED');

INSERT INTO ORDER_CAKE (order_id, cake_id, amount) VALUES (1, 1, 1);
INSERT INTO ORDER_CAKE (order_id, cake_id, amount) VALUES (1, 2, 1);
INSERT INTO ORDER_CAKE (order_id, cake_id, amount) VALUES (2, 3, 1);
INSERT INTO ORDER_CAKE (order_id, cake_id, amount) VALUES (3, 1, 999);
INSERT INTO ORDER_CAKE (order_id, cake_id, amount) VALUES (4, 3, 1);
