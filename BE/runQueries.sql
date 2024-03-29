use schoolManagement;
SET
  SQL_SAFE_UPDATES = 0;
select
  *
from class_with_section;
select
  *
from class;
select
  *
from section;
select
  *
from category;
select
  *
from religion;
select
  *
from house;
select
  *
from bus;
select
  *
from subjects;
select
  *
from exam;
select
  *
from class_with_exam;
select
  *
from installment;
select
  *
from collected_fee;
select
  *
from class_with_installment;
select
  *
from class_with_subjects;
select
  *
from exam_schedule;
select
  *
from student_admission_details;
select
  *
from student_document;
select
  *
from student_result;
delete from class_with_section;
delete from section;
delete from category;
delete from religion;
delete from house;
delete from subjects;
delete from bus;
delete from exam;
delete from exam_schedule;
INSERT INTO class (class_name, created_on)
VALUES
  ("2", "15/12/1995");
UPDATE exam
SET
  exam_name = 'hhhh',
  last_updated_on = '15/12/1995'
WHERE
  exam_id = 2;
INSERT INTO class_with_section (class_id, section_id, assinged_on)
VALUES
  (10, 11, "15/12/1995");
SELECT
  *
FROM exam_schedule bus
WHERE
  class_id = 25
  AND exam_id = 27;
select
  class.class_id,
  class.class_name,
  section.section_id,
  section.section_name,
  class_with_section.*
from class,
  class_with_section,
  section
where
  class.class_id = class_with_section.class_id
  AND class_with_section.section_id = section.section_id;
select
  student_admission_details.*,
  class.class_name,
  section.section_name,
  category.category_name,
  religion.religion_name,
  house.house_name
from student_admission_details,
  class,
  section,
  category,
  religion,
  house
where
  class.class_id = student_admission_details.class_id
  AND section.section_id = student_admission_details.section_id
  AND category.category_id = student_admission_details.category_id
  AND religion.religion_id = student_admission_details.religion_id
  AND house.house_id = student_admission_details.house_id;