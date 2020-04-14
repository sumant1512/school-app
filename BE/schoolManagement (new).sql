CREATE DATABASE schoolManagement;
use schoolManagement;
CREATE TABLE student_admission_details (
  student_id INT UNIQUE PRIMARY KEY AUTO_INCREMENT,
  roll_number INT,
  class_id INT NOT NULL,
  FOREIGN KEY (class_id) REFERENCES class(class_id),
  section_id INT NOT NULL,
  FOREIGN KEY (section_id) REFERENCES section(section_id),
  first_name varchar(255),
  last_name varchar(255),
  gender varchar(255),
  date_of_birth varchar(255),
  category_id INT NOT NULL,
  FOREIGN KEY (category_id) REFERENCES category(category_id),
  religion_id INT NOT NULL,
  FOREIGN KEY (religion_id) REFERENCES religion(religion_id),
  caste varchar(255),
  mobile_number varchar(255),
  email varchar(255),
  admission_date varchar(255),
  blood_group varchar(255),
  house_id INT NOT NULL,
  FOREIGN KEY (house_id) REFERENCES house(house_id),
  height varchar(255),
  weight varchar(255),
  as_on_date varchar(255),
  student_image varchar(255),
  father_name varchar(255),
  father_phone varchar(255),
  father_occupation varchar(255),
  student_father_image varchar(255),
  mother_name varchar(255),
  mother_phone varchar(255),
  mother_occupation varchar(255),
  student_mother_image varchar(255),
  guardian_select varchar(255),
  guardian_name varchar(255),
  guardian_relation varchar(255),
  guardian_email varchar(255),
  guardian_phone varchar(255),
  guardian_occupation varchar(255),
  guardian_address varchar(255),
  guardian_image varchar(255),
  current_address varchar(255),
  permanent_address varchar(255),
  bus_route varchar(255),
  bank_name varchar(255),
  bank_account_number varchar(255),
  ifsc_code varchar(255),
  national_identification_number varchar(255),
  local_identification_number varchar(255),
  rte varchar(255),
  previous_school_detail varchar(255),
  note varchar(255),
  session_year varchar(255),
  student_password varchar(255)
);
create table student_document (
  student_id INT NOT NULL,
  document_name varchar(255) UNIQUE NOT NULL,
  document varchar(255) NOT NULL,
  FOREIGN KEY (student_id) REFERENCES student_admission_details(student_id)
);
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
create table student_result (
  student_id INT NOT NULL,
  FOREIGN KEY (student_id) REFERENCES student_admission_details(student_id),
  class_id INT NOT NULL,
  FOREIGN KEY (class_id) REFERENCES class(class_id),
  exam_id INT NOT NULL,
  FOREIGN KEY (exam_id) REFERENCES exam(exam_id),
  paper_id INT NOT NULL,
  FOREIGN KEY (paper_id) REFERENCES exam_schedule(paper_id),
  subject_id INT NOT NULL,
  FOREIGN KEY (subject_id) REFERENCES subjects(subject_id),
  marks_obtained INT NOT NULL,
  created_on varchar(255),
  last_updated_on varchar(255)
);
create table installment (
  installment_id INT UNIQUE PRIMARY KEY AUTO_INCREMENT,
  installment_name varchar(255) UNIQUE NOT NULL,
  created_on varchar(255) NOT NULL,
  fee_due_date varchar(255) NOT NULL,
  last_updated_on varchar(255)
);
create table class_with_installment(
  class_id INT NOT NULL,
  installment_id INT NOT NULL,
  assinged_on varchar(255),
  FOREIGN KEY (class_id) REFERENCES class(class_id),
  FOREIGN KEY (installment_id) REFERENCES installment(installment_id)
);
create table collected_fee (
  receipt_id INT UNIQUE PRIMARY KEY AUTO_INCREMENT,
  student_id INT NOT NULL,
  FOREIGN KEY (student_id) REFERENCES student_admission_details(student_id),
  class_id INT NOT NULL,
  FOREIGN KEY (class_id) REFERENCES class(class_id),
  installment_id INT NOT NULL,
  FOREIGN KEY (installment_id) REFERENCES installment(installment_id),
  fee_paid_amount INT NOT NULL,
  paid_on varchar(255) NOT NULL
);