-- MySQL Script generated by MySQL Workbench
-- Mon Aug  2 19:40:13 2021
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema assets
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `assets` ;

-- -----------------------------------------------------
-- Schema assets
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `assets` DEFAULT CHARACTER SET utf8 ;
USE `assets` ;

-- -----------------------------------------------------
-- Table `assets`.`Location`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `assets`.`Location` ;

CREATE TABLE IF NOT EXISTS `assets`.`Location` (
  `location_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `address` VARCHAR(45) NULL,
  `city` VARCHAR(45) NULL,
  `country` VARCHAR(45) NULL,
  `last_update` DATETIME NULL,
  PRIMARY KEY (`location_id`))
ENGINE = InnoDB;


-- -- -----------------------------------------------------
-- -- Table `assets`.`Stowage`
-- -- -----------------------------------------------------
DROP TABLE IF EXISTS `assets`.`Stowage` ;

CREATE TABLE IF NOT EXISTS `assets`.`Stowage` (
  `stowage_id` INT NOT NULL AUTO_INCREMENT,
  `location_id` INT NOT NULL,
  `last_update` DATETIME NULL,
  PRIMARY KEY (`stowage_id`, `location_id`),
  CONSTRAINT `fk_Stowage_Location`
    FOREIGN KEY (`location_id`)
    REFERENCES `assets`.`Location` (`location_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_Stowage_Location_idx` ON `assets`.`Stowage` (`location_id` ASC) VISIBLE;


-- -- -----------------------------------------------------
-- -- Table `assets`.`Product`
-- -- -----------------------------------------------------
DROP TABLE IF EXISTS `assets`.`Product` ;

CREATE TABLE IF NOT EXISTS `assets`.`Product` (
  `product_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `total_quantity` INT NULL,
  `last_update` DATETIME NULL,
  PRIMARY KEY (`product_id`))
ENGINE = InnoDB;


-- -- -- -----------------------------------------------------
-- -- -- Table `assets`.`Batch`
-- -- -- -----------------------------------------------------
DROP TABLE IF EXISTS `assets`.`Batch` ;

CREATE TABLE IF NOT EXISTS `assets`.`Batch` (
  `batch_id` INT NOT NULL AUTO_INCREMENT,
  `product_id` INT NOT NULL,
  `total_quantity` INT NULL,
  `expiring_date` DATE NULL,
  `last_update` DATETIME NULL,
  PRIMARY KEY (`batch_id`, `product_id`),
  CONSTRAINT `fk_Batch_Product1`
    FOREIGN KEY (`product_id`)
    REFERENCES `assets`.`Product` (`product_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_Batch_Product1_idx` ON `assets`.`Batch` (`product_id` ASC) VISIBLE;


-- -- -- -----------------------------------------------------
-- -- -- Table `assets`.`Register`
-- -- -- -----------------------------------------------------
DROP TABLE IF EXISTS `assets`.`Register` ;

CREATE TABLE IF NOT EXISTS `assets`.`Register` (
  `register_id` INT NOT NULL AUTO_INCREMENT,
  `register_uuid` VARCHAR(50) NOT NULL,
  `stowage_id` INT NOT NULL,
  `batch_id` INT NOT NULL,
  `quantity` INT NULL,
  `last_update` DATETIME NULL,
  PRIMARY KEY (`register_id`, `stowage_id`, `batch_id`),
  CONSTRAINT `fk_Register_Stowage1`
    FOREIGN KEY (`stowage_id`)
    REFERENCES `assets`.`Stowage` (`stowage_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Register_Batch1`
    FOREIGN KEY (`batch_id`)
    REFERENCES `assets`.`Batch` (`batch_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_Register_Stowage1_idx` ON `assets`.`Register` (`stowage_id` ASC) VISIBLE;

CREATE INDEX `fk_Register_Batch1_idx` ON `assets`.`Register` (`batch_id` ASC) VISIBLE;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;