-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema App_Food_Delivery_Diagram
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema App_Food_Delivery_Diagram
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `App_Food_Delivery_Diagram` DEFAULT CHARACTER SET utf8 ;
USE `App_Food_Delivery_Diagram` ;

-- -----------------------------------------------------
-- Table `App_Food_Delivery_Diagram`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `App_Food_Delivery_Diagram`.`User` (
  `idUser` INT NOT NULL,
  `Username` VARCHAR(45) NOT NULL,
  `Email` VARCHAR(45) NOT NULL,
  `Password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idUser`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `App_Food_Delivery_Diagram`.`Order`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `App_Food_Delivery_Diagram`.`Order` (
  `idOrder` INT NOT NULL,
  `idUser` INT NOT NULL,
  `Status` VARCHAR(45) NOT NULL,
  `Order_date` VARCHAR(45) NOT NULL,
  `Total_price` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idOrder`, `idUser`),
  INDEX `idUser_idx` (`idUser` ASC) VISIBLE,
  CONSTRAINT `idUser`
    FOREIGN KEY (`idUser`)
    REFERENCES `App_Food_Delivery_Diagram`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `App_Food_Delivery_Diagram`.`Product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `App_Food_Delivery_Diagram`.`Product` (
  `idProduct` INT NOT NULL,
  `idOrder` INT NOT NULL,
  `Name` VARCHAR(45) NOT NULL,
  `Price` FLOAT NOT NULL,
  `Description` VARCHAR(45) NOT NULL,
  `Image` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idProduct`),
  INDEX `idOrder_idx` (`idOrder` ASC) VISIBLE,
  CONSTRAINT `idOrder`
    FOREIGN KEY (`idOrder`)
    REFERENCES `App_Food_Delivery_Diagram`.`Order` (`idOrder`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
