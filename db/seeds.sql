USE burgers_db;

INSERT INTO burgers (burger_name, devoured, date)
VALUES  ("Mushroom Swiss", true, "2017-09-17 17:00:00");

INSERT INTO burgers (burger_name, date)
VALUES  ("Guacamole", "2017-09-22 12:30:54");

INSERT INTO burgers (burger_name, devoured, date)
VALUES  ("Sub Club", false, "2017-09-24 20:12:34");

select * from burgers;