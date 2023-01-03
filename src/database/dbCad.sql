CREATE USER 'jf.mysql'@'%' IDENTIFIED BY '#@jj2802';
GRANT ALL ON *.* TO 'jf.mysql'@'%' IDENTIFIED BY '#@jj2802' WITH GRANT OPTION;
FLUSH PRIVILEGES;

CREATE DATABASE IF NOT EXISTS dbCad;

USE dbCad;

CREATE TABLE IF NOT EXISTS cadusu(
  id_usu INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  image MEDIUMBLOB,
  usuario VARCHAR(15) NOT NULL,
  senha VARCHAR(64) NOT NULL,
  nomusu VARCHAR(30)NOT NULL,
  sobusu VARCHAR(30),
  adm BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE IF NOT EXISTS cadcli(
  id_cli INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  usu_id INT NOT NULL,
  nomfan VARCHAR(50) NOT NULL,
  razcli VARCHAR(50) NOT NULL,
  cnpj BIGINT UNIQUE NOT NULL,
  obscli VARCHAR(150),
  stacli TINYINT
);

CREATE TABLE IF NOT EXISTS cadvis(
  id_vis INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  cli_id INT NOT NULL,
  datvis DATE NOT NULL,
  desvis VARCHAR(50),
  obsvis VARCHAR(150)
);

CREATE table IF NOT EXISTS cadlog(
  id_log INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  tiplog VARCHAR(20) NOT NULL,
  usulog VARCHAR(100),
  datlog DATETIME
);

ALTER TABLE cadcli ADD CONSTRAINT cadcli_usu_id_cadusu_id 
FOREIGN KEY(usu_id) REFERENCES cadusu(id_usu);

ALTER TABLE cadvis ADD CONSTRAINT cadvis_cli_id_cadcli_id 
FOREIGN KEY(cli_id) REFERENCES cadcli(id_cli);

INSERT INTO cadusu VALUES(NULL,NULL,'ADMIN','$2b$12$sOeNc3hbJZEqAOdfQFFDyebdgnrHh0J6s9plXe8QJ3OBHbX9EDk2W','ADMIN','ADMIN',1);