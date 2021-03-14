CREATE DATABASE symphony_db;

use symphony_db;



/*Admins*/
CREATE TABLE `symphony_db`.`admins` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);
  
/*INSERT HERE- Predefined admins */
INSERT INTO admins(email) values ('rahic.cazim@gmail.com');
INSERT INTO admins(email) values ('crahic1@etf.unsa.ba');



/*Candidates*/
CREATE TABLE `symphony_db`.`candidates` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(50) NOT NULL,
  `last_name` VARCHAR(50) NOT NULL,
  `code` VARCHAR(45) NOT NULL,
  `gender` VARCHAR(20) NOT NULL,
  `birth_date` DATE NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));
  
  
/*Surveys*/
CREATE TABLE `symphony_db`.`surveys` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `url` VARCHAR(500) NOT NULL,
  `pin` VARCHAR(100) NOT NULL,
  `candidate` INT NOT NULL,
  `results` INT NULL,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `candidate_UNIQUE` (`candidate` ASC) VISIBLE,
  PRIMARY KEY (`id`),
  INDEX `candidate_fk_idx` (`candidate` ASC) VISIBLE,
  
  CONSTRAINT `candidate_fk`
    FOREIGN KEY (`candidate`)
    REFERENCES `symphony_db`.`candidates` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);




