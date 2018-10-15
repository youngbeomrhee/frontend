create schema nodejs;

use nodejs;

drop table nodejs.users;

create table nodejs.users (
	id int not null auto_increment,
    name varchar(20) not null,
    age int unsigned not null,
    married tinyint not null,
    comment text null,
    created_at datetime not null default now(),
    primary key (id),
    unique index user_unique (name asc)
)
comment = '사용자 정보',
default charset = utf8,
engine=InnoDB
;

-- database 구조 확인
desc users;

select *
from users
;

drop table nodejs.comments;

create table nodejs.comments (
	id int not null auto_increment,
    commenter int not null,
    comment varchar(100) not null,
    created_at datetime not null default now(),
    primary key (id),
    index commenter_idx (commenter asc),
    constraint commenter
		foreign key (commenter) references nodejs.users (id)
        on delete cascade
        on update cascade
) comment = '댓글',
default charset = utf8,
engine = InnoDB
;

desc nodejs.comments;

show tables;

insert into nodejs.users (name, age, married, comment) values ('zero', 24, 0, '자기소개1');
insert into nodejs.users (name, age, married, comment) values ('nero', 32, 1, '자기소개2');

insert into nodejs.comments (commenter, comment) values (1, '안녕하세요. zero의 댓글입니다.');

select * from nodejs.users;

select *
from nodejs.comments
;


select name, age
from nodejs.users
where married = 1
	and age > 30
;

select *
from nodejs.users
order by age desc
limit 1	-- 조회되는 row 의 숫자 제한
;

select *
from nodejs.users
order by age desc
limit 1	-- 조회되는 row 의 숫자 제한
offset 1	-- 건너 뛸 row
;