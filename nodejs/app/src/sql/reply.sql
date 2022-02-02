CREATE TABLE `reply` (
  `reply_id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(20) DEFAULT NULL,
  `post_id` int DEFAULT NULL,
  `type` tinyint(1) DEFAULT NULL,
  `reply_contents` text,
  `reply_date` datetime DEFAULT NULL,
  `state` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`reply_id`)
) ENGINE=InnoDB