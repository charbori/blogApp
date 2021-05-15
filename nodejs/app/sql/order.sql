create table `order` (
    `idx` int(12) NOT NULL,
    `order_id` varchar(255) NOT NULL,
    `order_name` varchar(255) NOT NULL,
    `user_id` int(12) NOT NULL,
    `shop_id` int(12) NOT NULL,
    `order_address` varchar(255) NOT NULL,
    `order_type` tinyInt NOT NULL,
    `delivery_id` int(12) NOT NULL,
    `order_init_time` datetime NOT NULL,
    `order_time` datetime NOT NULL,
    `deny` tinyInt default null,
    `etc` text default NULL,
    `des` text default NULL,
    `order_log` text default NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
