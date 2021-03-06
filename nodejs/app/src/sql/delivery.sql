create table `delivery` (
    `idx` int(12) NOT NULL,
    `delivery_type` varchar(255) NOT NULL,
    `delivery_init_time` varchar(255) NOT NULL,
    `delivery_start_time` varchar(255) NOT NULL,
    `delivery_end_time` varchar(255) NOT NULL,
    `delivery_status` varchar(255) NOT NULL,
    `delivery_address` varchar(255) NOT NULL,
    `order_id` int(12) NOT NULL,
    `user_id` int(12) NOT NULL,
    `shop_id` int(12) NOT NULL,
    `deny` tinyInt default null,
    `etc` text default NULL,
    `des` text default NULL,
    `delivery_log` text default NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
