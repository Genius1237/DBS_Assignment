CREATE TABLE USER(
	_id integer primary key auto_increment,
	username varchar(50) unique,
	password varchar(256),
	name varchar(50),
	phone char(10) 
);

CREATE TABLE BOOK(
	_id integer primary key auto_increment,
	title varchar(50),
	author varchar(50),
	publisher varchar(50),
	edition integer,
	year integer
);

CREATE TABLE BOOK_SELL(
	_id integer primary key auto_increment,
	link_id integer,
	user integer,
	price integer,
	conditiono varchar(50),
	FOREIGN KEY(link_id) REFERENCES BOOK(_id) ON DELETE CASCADE,
	FOREIGN KEY(user) REFERENCES USER(_id)
);

CREATE TABLE BOOK_BUY(
	_id integer primary key auto_increment,
	link_id integer,
	user integer,
	price integer,
	FOREIGN KEY(link_id) REFERENCES BOOK(_id) ON DELETE CASCADE,
	FOREIGN KEY(user) REFERENCES USER(_id)
);

CREATE TABLE ITEM(
	_id integer primary key auto_increment,
	name varchar(50),
	description varchar(500)
);

CREATE TABLE ITEM_SELL(
	_id integer primary key auto_increment,
	link_id integer,
	user integer,
	price integer,
	FOREIGN KEY(link_id) REFERENCES ITEM(_id) ON DELETE CASCADE,
	FOREIGN KEY(user) REFERENCES USER(_id)
);

CREATE TABLE ITEM_BUY(
	_id integer primary key auto_increment,
	link_id integer,
	user integer,
	price integer,
	FOREIGN KEY(link_id) REFERENCES ITEM(_id) ON DELETE CASCADE,
	FOREIGN KEY(user) REFERENCES USER(_id)
);