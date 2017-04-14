CREATE TABLE USER(
	_id integer primary key auto_increment,
	username varchar(50) unique,
	password varchar(100),
	name varchar(50),
	phone char(10) 
);

CREATE TABLE BOOK(
	book_id integer primary key auto_increment,
	title varchar(50),
	author varchar(50),
	publisher varchar(50),
	edition integer,
	year integer
);

CREATE TABLE BOOK_SELL(
	_id integer primary key auto_increment,
	book_id integer,
	seller integer,
	selling_price integer,
	conditiono varchar(50),
	FOREIGN KEY(book_id) REFERENCES BOOK(book_id) ON DELETE CASCADE,
	FOREIGN KEY(seller) REFERENCES USER(_id)
);

CREATE TABLE BOOK_BUY(
	_id integer primary key auto_increment,
	book_id integer,
	buyer integer,
	buying_price integer,
	FOREIGN KEY(book_id) REFERENCES BOOK(book_id) ON DELETE CASCADE,
	FOREIGN KEY(buyer) REFERENCES USER(_id)
);

CREATE TABLE ITEM(
	item_id integer primary key auto_increment,
	name varchar(50),
	description varchar(500)
);

CREATE TABLE ITEM_SELL(
	_id integer primary key auto_increment,
	item_id integer,
	seller integer,
	selling_price integer,
	FOREIGN KEY(item_id) REFERENCES ITEM(item_id) ON DELETE CASCADE,
	FOREIGN KEY(seller) REFERENCES USER(_id)
);

CREATE TABLE ITEM_BUY(
	_id integer primary key auto_increment,
	item_id integer,
	buyer integer,
	buying_price integer,
	FOREIGN KEY(item_id) REFERENCES ITEM(item_id) ON DELETE CASCADE,
	FOREIGN KEY(buyer) REFERENCES USER(_id)
);