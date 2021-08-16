create table `task`(
    `idx` int(11) PRIMARY KEY NOT NULL auto_increment,
    `title` varchar(255) NOT NULL default 'no title',
    `content` text,
    `reg_date` datetime,
    `finish_date` datetime,
    `mod_date` datetime,
    `des` text,
    `request_id` varchar(255) NOT NULL,
    `response_id` varchar(255) NOT NULL,
    `type` char(1) NOT NULL default 'N'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
