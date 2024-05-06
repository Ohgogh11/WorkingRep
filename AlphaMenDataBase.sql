-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: alphaman
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `appointments`
--

DROP TABLE IF EXISTS `appointments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointments` (
  `user_id` int NOT NULL,
  `barber_id` int NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `status` enum('pending','confirmed') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'pending',
  `type_id` int NOT NULL,
  PRIMARY KEY (`user_id`),
  KEY `appointments_ibfk_2` (`barber_id`),
  KEY `appointments_service_type_FK` (`type_id`),
  CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `appointments_ibfk_2` FOREIGN KEY (`barber_id`) REFERENCES `barbers` (`barber_id`),
  CONSTRAINT `appointments_service_type_FK` FOREIGN KEY (`type_id`) REFERENCES `service_type` (`type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointments`
--

LOCK TABLES `appointments` WRITE;
/*!40000 ALTER TABLE `appointments` DISABLE KEYS */;
INSERT INTO `appointments` VALUES (1,1,'2024-05-07','11:30:00','pending',1),(2,1,'2024-04-30','09:30:00','pending',3),(3,1,'2024-04-30','12:00:00','pending',3);
/*!40000 ALTER TABLE `appointments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `barber_schedule`
--

DROP TABLE IF EXISTS `barber_schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `barber_schedule` (
  `day_of_week` enum('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday') NOT NULL,
  `barber_id` int NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `appointment_duration` int NOT NULL,
  `working` tinyint(1) NOT NULL,
  PRIMARY KEY (`day_of_week`,`barber_id`),
  KEY `barber_id` (`barber_id`),
  CONSTRAINT `barber_schedule_ibfk_1` FOREIGN KEY (`barber_id`) REFERENCES `barbers` (`barber_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `barber_schedule`
--

LOCK TABLES `barber_schedule` WRITE;
/*!40000 ALTER TABLE `barber_schedule` DISABLE KEYS */;
INSERT INTO `barber_schedule` VALUES ('Monday',1,'00:00:00','00:00:00',30,0),('Tuesday',1,'09:00:00','21:00:00',30,1),('Wednesday',1,'09:00:00','21:00:00',30,1),('Thursday',1,'09:00:00','21:00:00',30,1),('Friday',1,'09:00:00','17:00:00',30,1),('Saturday',1,'00:00:00','00:00:00',30,0),('Sunday',1,'09:00:00','21:00:00',30,1);
/*!40000 ALTER TABLE `barber_schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `barber_schedule_breaks`
--

DROP TABLE IF EXISTS `barber_schedule_breaks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `barber_schedule_breaks` (
  `day_of_week` enum('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday') NOT NULL,
  `barber_id` int NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  PRIMARY KEY (`day_of_week`,`barber_id`),
  KEY `barber_id` (`barber_id`),
  CONSTRAINT `barber_schedule_breaks_ibfk_1` FOREIGN KEY (`barber_id`) REFERENCES `barbers` (`barber_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `barber_schedule_breaks`
--

LOCK TABLES `barber_schedule_breaks` WRITE;
/*!40000 ALTER TABLE `barber_schedule_breaks` DISABLE KEYS */;
INSERT INTO `barber_schedule_breaks` VALUES ('Tuesday',1,'10:30:00','11:00:00'),('Wednesday',1,'10:30:00','11:00:00'),('Thursday',1,'10:30:00','11:00:00'),('Friday',1,'10:30:00','11:30:00'),('Sunday',1,'10:30:00','11:00:00');
/*!40000 ALTER TABLE `barber_schedule_breaks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `barbers`
--

DROP TABLE IF EXISTS `barbers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `barbers` (
  `barber_id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`barber_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `barbers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `barbers`
--

LOCK TABLES `barbers` WRITE;
/*!40000 ALTER TABLE `barbers` DISABLE KEYS */;
INSERT INTO `barbers` VALUES (1,3);
/*!40000 ALTER TABLE `barbers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `defaultholidayhours`
--

DROP TABLE IF EXISTS `defaultholidayhours`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `defaultholidayhours` (
  `holiday_date` date NOT NULL,
  `barber_id` int NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `appointment_duration` int NOT NULL,
  PRIMARY KEY (`holiday_date`),
  KEY `barber_id` (`barber_id`),
  CONSTRAINT `defaultholidayhours_ibfk_1` FOREIGN KEY (`barber_id`) REFERENCES `barbers` (`barber_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `defaultholidayhours`
--

LOCK TABLES `defaultholidayhours` WRITE;
/*!40000 ALTER TABLE `defaultholidayhours` DISABLE KEYS */;
/*!40000 ALTER TABLE `defaultholidayhours` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(255) NOT NULL,
  `product_description` text NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock_quantity` int NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'test','test',100.00,100,'http://localhost:5000/api/images/undefined'),(2,'test','test',100.00,100,'http://localhost:5000/api/images/undefined'),(3,'test','test',100.00,100,'http://localhost:5000/api/images/undefined'),(4,'test','test',100.00,100,'http://localhost:5000/api/images/undefined'),(5,'test','test',100.00,100,'http://localhost:5000/api/images/undefined'),(6,'test','test',100.00,100,'http://localhost:5000/api/images/undefined'),(7,'test','test',100.00,100,'http://localhost:5000/api/images/undefined'),(8,'test','test',100.00,100,'http://localhost:5000/api/images/undefined'),(9,'test','test',100.00,100,'http://localhost:5000/api/images/undefined'),(10,'test','test',100.00,100,'http://localhost:5000/api/images/undefined'),(11,'test','test',100.00,100,'http://localhost:5000/api/images/undefined'),(12,'test','test',100.00,100,'http://localhost:5000/api/images/undefined'),(13,'test','teste',100.00,100,'http://localhost:5000/api/images/[object Object]'),(14,'test','teste',100.00,100,'http://localhost:5000/api/images/undefined'),(15,'test','teste',100.00,100,'http://localhost:5000/api/images/undefined'),(16,'test','teste',100.00,100,'http://localhost:5000/api/images/[object Object]'),(17,'test','teste',100.00,100,'http://localhost:5000/api/images/imageFile'),(18,'test','teste',100.00,100,'http://localhost:5000/api/images/Koenigsegg.png'),(19,'test','teste',100.00,100,'http://localhost:5000/api/images/Koenigsegg.png'),(20,'test','teste',100.00,100,'http://localhost:5000/api/images/Koenigsegg.png'),(21,'test','teste',100.00,100,'http://localhost:5000/api/images/Koenigsegg.png'),(22,'test','teste',100.00,100,'http://localhost:5000/api/images/Koenigsegg.png'),(23,'test','teste',100.00,100,'http://localhost:5000/api/images/Koenigsegg.png'),(24,'test','teste',100.00,100,'http://localhost:5000/api/images/Koenigsegg.png'),(25,'test','teste',100.00,100,'http://localhost:5000/api/images/Koenigsegg.png'),(26,'test','teste',100.99,100,'http://localhost:5000/api/images/Koenigsegg.png'),(27,'test','teste',100.99,100,'http://localhost:5000/api/images/Koenigsegg.png'),(28,'test','teste',100.99,100,'http://localhost:5000/api/images/Koenigsegg.png'),(29,'test','teste',100.99,100,'http://localhost:5000/api/images/Koenigsegg.png'),(30,'test','asdf',1.00,100,'http://localhost:5000/api/images/Koenigsegg.png'),(31,'test','test',100.00,10,'http://localhost:5000/api/images/ReactLogo.png'),(32,'test','test',100.00,10,'http://localhost:5000/api/images/ReactLogo.png'),(33,'test','test',100.00,10,'http://localhost:5000/api/images/ReactLogo.png');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_type`
--

DROP TABLE IF EXISTS `service_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service_type` (
  `type_id` int NOT NULL AUTO_INCREMENT,
  `barber_id` int NOT NULL,
  `initial_cost` int NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`type_id`),
  KEY `barber_id` (`barber_id`),
  CONSTRAINT `service_type_ibfk_1` FOREIGN KEY (`barber_id`) REFERENCES `barbers` (`barber_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_type`
--

LOCK TABLES `service_type` WRITE;
/*!40000 ALTER TABLE `service_type` DISABLE KEYS */;
INSERT INTO `service_type` VALUES (1,1,70,'תספורת + זקן + שעווה (10 שח לאזור)','Alphamen Premium'),(2,1,60,'תספורת + זקן','Alphamen Classic'),(3,1,20,'סידור זקן + מסגרת','Beard Only');
/*!40000 ALTER TABLE `service_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shoppingcart`
--

DROP TABLE IF EXISTS `shoppingcart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shoppingcart` (
  `cart_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `added_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`cart_id`),
  KEY `user_id` (`user_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `shoppingcart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `shoppingcart_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shoppingcart`
--

LOCK TABLES `shoppingcart` WRITE;
/*!40000 ALTER TABLE `shoppingcart` DISABLE KEYS */;
/*!40000 ALTER TABLE `shoppingcart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userbanlist`
--

DROP TABLE IF EXISTS `userbanlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userbanlist` (
  `user_id` int NOT NULL,
  `banned_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `end_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `userbanlist_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userbanlist`
--

LOCK TABLES `userbanlist` WRITE;
/*!40000 ALTER TABLE `userbanlist` DISABLE KEYS */;
/*!40000 ALTER TABLE `userbanlist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `permission` enum('regular','admin','barber') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'regular',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phone_number` (`phone_number`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'itay.fridburg@gmail.com','0586964422','itay','fridburg','$2b$10$b48sfIDEMhSzWxmF1DI7zetg.2SX24TnIYInNSKoOvMvUpqF0vAim','admin'),(2,'Ohgogh@gmail.com','0507784393','Ohgogh','fridburg','$2b$10$RnsSl0.qZw77rqvn/Z11g.XKtafpaLbgivkhObxGkPks0SJJ43Mlu','regular'),(3,'rnd@gmail.com','0000000000','afik','ben','$2b$10$RnsSl0.qZw77rqvn/Z11g.XKtafpaLbgivkhObxGkPks0SJJ43Mlu','barber'),(4,'test@gmail.com','0529694422','איתי','פרידבורג','$2b$10$rPbfkAwPMQrC8xO8qVVsxuBeulDk//SLwQsttcUlp7Y6YUpX8Xwf6','regular'),(5,'asdf@gmail.com','0586964421','Ohgogh','asdfasdf','$2b$10$QgI7vUfxIr714HfljH4fseIODClDC1UcDgikcua8meqt4Cq784RgW','regular'),(6,'asd1f@gmail.com','0586964425','Ohgog1h','asdfasdf','$2b$10$qDYP2eopyeTH6irGyUcLjuCyoFRJi4DQrP13KmoSajfP0gjzB4KGW','regular');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishlist`
--

DROP TABLE IF EXISTS `wishlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wishlist` (
  `wishlist_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `product_id` int NOT NULL,
  PRIMARY KEY (`wishlist_id`),
  KEY `user_id` (`user_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `wishlist_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `wishlist_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishlist`
--

LOCK TABLES `wishlist` WRITE;
/*!40000 ALTER TABLE `wishlist` DISABLE KEYS */;
/*!40000 ALTER TABLE `wishlist` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-07  1:49:39
