CREATE TABLE category (
    idx tinyint NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL DEFAULT 'category',
    type tinyint NOT NULL DEFAULT '1',
    xcode tinyint NOT NULL DEFAULT '1',
    mcode tinyint NOT NULL DEFAULT '1',
    scode tinyint NOT NULL DEFAULT '1',
    des varchar(255) DEFAULT NULL,
    link text,
    PRIMARY KEY (idx)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;