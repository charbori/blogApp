create table post_recommend (
 idx int(10) primary key auto_increment,
 name varchar(255) not null default 'noname',
 des text,
 date datetime not null default '1000-01-01 00:00:00',
 post_like tinyint(4),
 post_dislike tinyint(4),
 post_reply int(10),
 post_follow int(10),
 post_tag int(10),
 post_report text,
 admin_memo text
 ) engine=Myisam charset=utf8;