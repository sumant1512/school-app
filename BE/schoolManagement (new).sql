CREATE DATABASE schoolManagement;
use schoolManagement;

create table class (
	class_id INT UNIQUE PRIMARY KEY AUTO_INCREMENT,
    class_name varchar(255) UNIQUE NOT NULL,
    created_on varchar(255) NOT NULL,
    last_updated_on varchar(255)
);

create table section (
	section_id INT UNIQUE PRIMARY KEY AUTO_INCREMENT,
    section_name varchar(255) UNIQUE NOT NULL,
    created_on varchar(255) NOT NULL,
    last_updated_on varchar(255)
);

create table exam (
	exam_id INT UNIQUE PRIMARY KEY AUTO_INCREMENT,
    exam_name varchar(255) UNIQUE NOT NULL,
    created_on varchar(255) NOT NULL,
    last_updated_on varchar(255)
);

create table subjects (
	subject_id INT UNIQUE PRIMARY KEY AUTO_INCREMENT,
    subject_name varchar(255) UNIQUE NOT NULL,
    created_on varchar(255) NOT NULL,
    last_updated_on varchar(255)
);

create table class_with_section(
	class_id INT NOT NULL,
	section_id INT NOT NULL,
    assinged_on varchar(255),
	FOREIGN KEY (class_id) REFERENCES class(class_id) ON DELETE CASCADE,
    FOREIGN KEY (section_id) REFERENCES section(section_id) ON DELETE CASCADE
);

create table class_with_exam(
	class_id INT NOT NULL,
	exam_id INT NOT NULL,
    assinged_on varchar(255),
	FOREIGN KEY (class_id) REFERENCES class(class_id),
    FOREIGN KEY (exam_id) REFERENCES exam(exam_id)
);


create table exam_schedule (
	paper_id INT UNIQUE PRIMARY KEY AUTO_INCREMENT,
    class_id INT NOT NULL,
	exam_id INT NOT NULL,
	subject_id INT NOT NULL,
    total_marks INT NOT NULL,
    passing_marks INT NOT NULL,
    paper_date varchar(255) NOT NULL,
    paper_start_time varchar(255) NOT NULL,
    paper_end_time varchar(255) NOT NULL,
    room_number varchar(255) NOT NULL,
    created_on varchar(255) NOT NULL,
    last_updated_on varchar(255),    
	FOREIGN KEY (class_id) REFERENCES class(class_id), 
    FOREIGN KEY (exam_id) REFERENCES exam(exam_id),  
    FOREIGN KEY (subject_id) REFERENCES subjects(subject_id)
);

create table class_with_subjects(
	class_id INT NOT NULL,
	subject_id INT NOT NULL,
    assinged_on varchar(255),
	FOREIGN KEY (class_id) REFERENCES class(class_id),
    FOREIGN KEY (subject_id) REFERENCES subjects(subject_id)
);

create table category (
	category_id INT UNIQUE PRIMARY KEY AUTO_INCREMENT,
    category_name varchar(255) UNIQUE NOT NULL,
    created_on varchar(255) NOT NULL,
    last_updated_on varchar(255)
);

create table religion (
	religion_id INT UNIQUE PRIMARY KEY AUTO_INCREMENT,
    religion_name varchar(255) UNIQUE NOT NULL,
    created_on varchar(255) NOT NULL,
    last_updated_on varchar(255)
);

create table house (
	house_id INT UNIQUE PRIMARY KEY AUTO_INCREMENT,
    house_name varchar(255) UNIQUE NOT NULL,
    created_on varchar(255) NOT NULL,
    last_updated_on varchar(255)
);

create table bus (
	bus_id INT UNIQUE PRIMARY KEY AUTO_INCREMENT,
    bus_number varchar(255) UNIQUE NOT NULL,
    bus_Route varchar(255) NOT NULL,
    created_on varchar(255) NOT NULL,
    last_updated_on varchar(255)
);


