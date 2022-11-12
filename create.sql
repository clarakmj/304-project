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
	phonenum int,
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
	primary key (sternum, branchnum)
	foreign key (branchnum) references gym);
 
create table food
	(fid int,
	price float,
	storenum int,
	branchnum int,
	primary key (fid),
	foreign key (storenum) references cafe,
	foreign key (branchnum) references cafe);

create table buys
	(memid int,
	fid int,
	primary key (memid, fid),
	foreign key (memid) references member,
	foreign key (fid) references food);