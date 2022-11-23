create database projectGym;

drop table gym if exists;
drop table manager if exists;
drop table trainer if exists;
drop table worksAt if exists;
drop table member if exists;
drop table trains if exists;
drop table membership if exists;
drop table equipment if exists;
drop table uses if exists;
drop table cafe if exists;
drop table food if exists;
drop table buys if exists;

create table gym
	(branchnum int,
	capacity int,
	city char(20),
	mid int,
	primary key (branchnum),
	foreign key (mid) references manager);
 
create table manager
	(mid int,
	mname char(20),
	gymnum int,
	primary key (mid),
	foreign key (gymnum) references gym);
 
create table trainer
	(tid int,
	tname char(20),
	primary key (tid));

create table worksat
	(branchnum int,
	tid int,
	employmenttype char(20),
	primary key (branchnum, tid),
	foreign key (branchnum) references gym,
	foreign key (tid) references trainer);

create table member
	(memid int,
	phonenum bigint,
	streetaddr char(20),
	memname char(20),
	membershipnum int,
	branchnum int,
	primary key (memid),
	foreign key (membershipnum) references membership,
	foreign key (branchnum) references gym);

create table trains
	(tid int,
	memid int,
	primary key (tid, memid),
	foreign key (tid) references trainer,
	foreign key (memid) references member);

create table membership
	(memnum int,
	expirydate char(20),
	memid, int
	amenityaccess boolean,
	hasmassage boolean,
	hasfitnessclass boolean,
	primary key (memnum),
	foreign key (memid) references member);
 
create table equipment
	(serialnum int,
	ename char(20),
	etype char(20),
	estatus char(20),
	primary key (serialnum));

create table uses
	(routine char(20),
	serialnum int,
	memid int,
	primary key (serialnum, memid),
	foreign key (serialnum) references equipment,
	foreign key (memid) references member);
 
create table cafe
	(storenum int,
	branchnum int,
	primary key (storenum, branchnum),
	foreign key (branchnum) references gym);
 
create table food
	(fid int,
	price float,
	storenum int,
	branchnum int,
	primary key (fid),
	foreign key (storenum, branchnum) references cafe);

create table buys
	(memid int,
	fid int,
	primary key (memid, fid),
	foreign key (memid) references member,
	foreign key (fid) references food);

insert into gym 
(branchnum, capacity, city, mid) 
values
(111, 150, 'Vancouver', 12345),
(222, 200, 'Victoria', 23456),
(333, 100, 'Vancouver', 34567),
(444, 120, 'Surrey', 45678),
(555, 50, 'Vancouver', 56789);

insert into manager
(mid, mname, gymnum)
values
(12345, 'Jon', 111),
(23456, 'Sara', 222),
(34567, 'Ash', 333),
(45678, 'Bill', 444),
(56789, 'Avery', 555);

insert into trainer
(tid, tname)
values
(123, 'Sara'),
(393, 'Grace'),
(321, 'Warren'),
(251, 'Gary'),
(920, 'Trish');

insert into member
(memid, phonenum, streetaddr, memname, membershipnum, branchnum)
values
(11, 8881234567, '123 Some Street', 'Jane Doe', 1000, 555),
(22, 8881112222, '223 Test Avenue', 'John Dee', 1001, 444),
(33, 8881231212, '990 Fake Street', 'Phil Frank', 1002, 333),
(44, 8881998823, '102 Random Boulevard', 'Sara Jones', 1003, 222),
(55, 8882222277, '98 Hello World', 'Meredith Grey', 1004, 111);

insert into membership
(memnum, expirydate, memid, amenityaccess, hasmassage, hasfitnessclass)
values
(1000, '12/02/2022', 11, true, true, true),
(1001, '12/12/2023', 22, false, false, true),
(1002, '02/01/2023', 33, false, false, false),
(1003, '01/01/2024', 44, true, false, true),
(1004, '05/12/2023', 55, false, true, true);

insert into equipment 
(serialnum, ename, etype, estatus)
values
(12345, 'Dumbbell', 'Weight', 'Available'), 
(13131, 'Kettlebell', 'Weight', 'Enroute'), 
(23232, 'Treadmill', 'Cardio', 'Available'), 
(45677, 'Stairmaster', 'Cardio', 'Available'), 
(23432, 'Rowing Machine', 'Cardio', 'Repair');

insert into cafe
(storenum, branchnum)
values
(329857, 111),
(398470, 222),
(329857, 333),
(398470, 444),
(273463, 555); 

insert into food
(fid, price, storenum, branchnum)
values
(3434, 12.99, 329857, 111),
(3997, 10.00, 398470, 222),
(3883, 8.98, 329857, 333),
(2412, 5.59, 398470, 444),
(1269, 14.49, 273463, 555); 

insert into worksat
(branchnum, tid, employmenttype)
values
(111, 123, 'Full-Time'),
(222, 251, 'Part-Time'),
(333, 321, 'Casual'),
(444, 393, 'Full-Time'),
(555, 920, 'Casual');

insert into trains
(tid, memid)
values
(123, 11),
(251, 22),
(321, 33),
(393, 44),
(920, 55);

insert into uses
(routine, serialnum, memid)
values
('Endurance training', 23232, 11),
('Strength training', 12345, 22),
('Burst training', 13131, 33),
('Rowing', 23432, 44),
('Booty building', 45677, 55);

insert into buys
(memid, fid)
values
(11, 1269),
(22, 2412),
(33, 3434),
(44, 3883),
(55, 3997);