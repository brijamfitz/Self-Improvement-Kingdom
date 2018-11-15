DROP DATABASE IF EXISTS exampledb;
CREATE DATABASE exampledb;

DROP DATABASE IF EXISTS testdb;
CREATE DATABASE testdb;

-- ======================================================================================== --
-- DUMMY DATA FOR TESTING --
-- ======================================================================================== --
DROP DATABASE IF EXISTS project2db;
CREATE DATABASE project2db;

USE project2db;

INSERT INTO Users(username, password, title, gender, provinceCount, knightCount, mageCount, archerCount, googleId, groupId)
VALUES ('brian', 'password', 'god', 'male', 10, 8, 6, 4, 'google', 1);

SELECT * FROM Users;