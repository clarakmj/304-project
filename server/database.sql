create database gymDB;

drop table if exists gym cascade;
drop table if exists manager cascade;
drop table if exists trainer cascade;
drop table if exists worksat cascade;
drop table if exists member cascade;
drop table if exists trains cascade;
drop table if exists membership cascade;
drop table if exists equipment cascade;
drop table if exists uses cascade;
drop table if exists cafe cascade;
drop table if exists food cascade;
drop table if exists buys cascade;

begin;
create table gym
	(branchnum int,
	capacity int,
	city char(20),
	mid int,
	primary key (branchnum));
 
create table manager
	(mid int,
	mname char(20),
	gymnum int,
	primary key (mid));
 
alter table gym add constraint fk_mid foreign key (mid) references manager(mid) deferrable;
alter table manager add constraint fk_gymnum foreign key (gymnum) references gym(branchnum) deferrable;

set constraints fk_mid deferred;
set constraints fk_gymnum deferred;

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
	memid int,
	amenityaccess boolean,
	hasmassage boolean,
	hasfitnessclass boolean,
	primary key (memnum));

alter table member add constraint fk_membershipnum foreign key (membershipnum) references membership(memnum) deferrable;
alter table membership add constraint fk_memid foreign key (memid) references member(memid) deferrable;

set constraints fk_membershipnum deferred;
set constraints fk_memid deferred;
 
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
	primary key (storenum, branchnum));

alter table cafe add constraint fk_branchnum foreign key (branchnum) references gym(branchnum) deferrable;

set constraints fk_branchnum deferred;

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
	foreign key (fid) references food on delete cascade);

set constraints all deferred;

insert into gym 
(branchnum, capacity, city, mid) 
values
(111, 150, 'Vancouver', 12345),
(222, 200, 'Victoria', 23456),
(333, 100, 'Vancouver', 34567),
(444, 120, 'Surrey', 45678),
(555, 50, 'Vancouver', 56789),
(666, 20, 'Kamloops', 67890),
(777, 110, 'Vancouver', 11111),
(888, 250, 'Surrey', 22222),
(999, 180, 'Surrey', 33333),
(122, 90, 'Victoria', 44444),
(133, 80, 'Kamloops', 55555),
(144, 105, 'Victoria', 66666),
(155, 55, 'Surrey', 77777),
(166, 10, 'Kamloops', 88888);

insert into member
(memid, phonenum, streetaddr, memname, membershipnum, branchnum)
values
(11, 8881234567, '123 Some Street', 'Jane Doe', 1000, 555),
(22, 8881112222, '223 Test Avenue', 'John Dee', 1001, 444),
(33, 8881231212, '990 Fake Street', 'Phil Frank', 1002, 333),
(44, 8881998823, '102 Random Boulevard', 'Sara Jones', 1003, 222),
(55, 8882222277, '98 Hello World', 'Meredith Grey', 1004, 111),
(66, 2842349877, '99 Street Name', 'Blicker Jones', 1005, 555),
(77, 9999999999, '12 Hello Ave', 'Dove Boot', 1006, 555),
(88, 2222333333, '93 Fire Ave', 'Mr Grinch', 1007, 666),
(99, 1200394129, '94 Earth Ave', 'Harry Potter', 1008, 777),
(12, 2912435234, '95 Water Ave', 'Ginny Weasley', 1009, 888),
(13, 1232131233, '161 Air Ave', 'Lucy Hale', 1010, 999),
(14, 9458202340, '11 One Street', 'Oprah Winfrey', 1011, 122),
(15, 2340325252, '22 Two Street', 'Rilakkuma', 1012, 133),
(16, 1306948593, '33 Three Street', 'Tiger Balm', 1013, 144),
(17, 4852020344, '44 Four Street', 'Phil Knight', 1014, 155),
(18, 4838371013, '555 Five Street', 'Santa Ono', 1015, 166);

insert into manager
(mid, mname, gymnum)
values
(12345, 'Jon', 111),
(23456, 'Sara', 222),
(34567, 'Ash', 333),
(45678, 'Bill', 444),
(56789, 'Avery', 555),
(67890, 'Cait', 666),
(11111, 'Kayn', 777),
(22222, 'Bruno', 888),
(33333, 'Jack', 999),
(44444, 'Sam', 122),
(55555, 'Frank', 133),
(66666, 'Juno', 144),
(77777, 'Cass', 155),
(88888, 'Karma', 166);

insert into trainer
(tid, tname)
values
(123, 'Sara'),
(393, 'Grace'),
(321, 'Warren'),
(251, 'Gary'),
(920, 'Trish'),
(295, 'Bella'),
(314, 'Yan'),
(934, 'Yan');

insert into membership
(memnum, expirydate, memid, amenityaccess, hasmassage, hasfitnessclass)
values
(1000, '12/02/2022', 11, true, true, true),
(1001, '12/12/2023', 22, false, false, true),
(1002, '02/01/2023', 33, false, false, false),
(1003, '01/01/2024', 44, true, false, true),
(1004, '05/12/2023', 55, false, true, true),
(1005, '01/01/2025', 66, true, true, true),
(1006, '10/10/2023', 77, false, false, false),
(1007, '11/11/2022', 88, false, false, false),
(1008, '11/11/2022', 99, false, false, false),
(1009, '10/10/2024', 12, true, false, false),
(1010, '02/02/2023', 13, true, true, true),
(1011, '03/03/2022', 14, false, true, true),
(1012, '04/04/2024', 15, false, true, true),
(1013, '05/05/2025', 16, true, false, true),
(1014, '06/06/2026', 17, false, true, false),
(1015, '07/07/2027', 18, true, false, false);

insert into equipment 
(serialnum, ename, etype, estatus)
values
(12345, 'Dumbbell', 'Weight', 'Available'), 
(13131, 'Kettlebell', 'Weight', 'Enroute'), 
(23232, 'Treadmill', 'Cardio', 'Available'), 
(45677, 'Stairmaster', 'Cardio', 'Available'), 
(23432, 'Rowing Machine', 'Cardio', 'Repair'),
(92882, 'Bench', 'Strength', 'Enroute'),
(19201, 'Barbell', 'Strength', 'Available');

insert into cafe
(storenum, branchnum)
values
(329857, 111),
(398470, 222),
(122143, 333),
(519281, 444),
(273463, 555), 
(192931, 666);

insert into food
(fid, price, storenum, branchnum)
values
(3434, 12.99, 329857, 111),
(3997, 10.00, 398470, 222),
(3883, 8.98, 122143, 333),
(2412, 5.59, 519281, 444),
(1269, 14.49, 273463, 555),
(1092, 25.99, 192931, 666),
(1882, 3.99, 192931, 666),
(1094, 12.92, 519281, 444),
(1902, 20.45, 273463, 555),
(5991, 29.99, 122143, 333),
(6931, 6.69, 192931, 666),
(9041, 59.95, 329857, 111),
(9402, 31.31, 398470, 222),
(5810, 8.90, 273463, 555),
(8120, 3.99, 329857, 111),
(8281, 129.99, 329857, 111),
(2345, 45.42, 398470, 222),
(6211, 7.00, 122143, 333),
(1966, 15.59, 519281, 444),
(6010, 9.10, 192931, 666);

insert into worksat
(branchnum, tid, employmenttype)
values
(111, 123, 'Full-Time'),
(222, 251, 'Part-Time'),
(333, 321, 'Casual'),
(444, 393, 'Full-Time'),
(555, 920, 'Casual'),
(666, 314, 'Part-Time'),
(333, 295, 'Full-Time'),
(111, 934, 'Full-Time');

insert into trains
(tid, memid)
values
(123, 11),
(251, 22),
(321, 33),
(393, 44),
(920, 55),
(314, 66),
(314, 11),
(314, 18),
(123, 44),
(251, 99),
(251, 55),
(393, 15),
(920, 33),
(920, 18),
(251, 11),
(295, 11),
(321, 11),
(393, 11),
(920, 11),
(934, 11);

insert into uses
(routine, serialnum, memid)
values
('Endurance', 23232, 11),
('Strength', 12345, 22),
('Burst', 13131, 33),
('Rowing', 23432, 44),
('Bodybuilding', 45677, 55),
('Strength', 19201, 66);

insert into buys
(memid, fid)
values
(11, 1269),
(22, 2412),
(33, 3434),
(44, 3883),
(55, 3997),
(66, 1092);

set constraints fk_mid immediate;
set constraints fk_gymnum immediate;
set constraints fk_membershipnum immediate;
set constraints fk_memid immediate;
set constraints fk_branchnum immediate;

commit;

create view temp(city, cap) as select g.city, avg(g.capacity) as cap from gym g group by g.city;