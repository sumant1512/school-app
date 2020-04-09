var express = require('express');
var app = express();
var bodyparser = require('body-parser');
app.use(bodyparser.json({ limit: '50mb' }));
app.use(bodyparser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyparser.json());
var cors = require('cors');
var mysql = require('mysql');

var fs = require('fs');
var multer = require('multer');
var path = require('path');
var base64ToImage = require('base64-to-image');
app.use('../FE/src/assets/', express.static(path.join(__dirname, '../FE/src/assets/')))

const DIR = '../FE/src/assets/';

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '.' + path.extname(file.originalname));
    }
});
let upload = multer({ storage: storage });

app.use(cors());
var port = 8080;

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: 'admin',
    database: "schoolManagement"
});

app.listen(port, () => console.log("server is running at port - " + port));

// Api to add class
app.post('/addClass', function(request, response) {
    const createdOn = new Date();
    const className = request.body.className;
    const selectedSections = request.body.selectedSections;
    con.query("INSERT INTO class (class_name, created_on) VALUES\
                ('" + className + "','" + createdOn + "')", (err, rows, fields) => {
        if (err) {
            console.log(err);
            response.status(200).send({ status: false, message: err.sqlMessage });
        } else {
            for (var sectionId of selectedSections) {
                con.query("INSERT INTO class_with_section\
                     (class_id,\
                        section_id,\
                     assinged_on)\
                     \
                 VALUES\
                 ('" + rows.insertId + "',\
                 '" + sectionId + "',\
                '" + createdOn + "'  )", (err, rows, fields) => {
                    if (err) {
                        console.log(err);
                        response.status(200).send({ status: false, message: err.sqlMessage });
                    } else {}
                });
            }
            response.status(200).send({ status: true, message: "Class added." });
        }
    })

})

// Api to get all class
app.get('/getClass', function(request, response) {
    con.query("select * from class", function(err, result, fields) {
        if (err) {
            console.log(err);
            response.status(200).send({ status: false, message: err.sqlMessage });
        } else {
            response.status(200).send({ status: true, data: result });
        }
    });
})

// Api to delete class
app.post('/deleteClass', function(request, response) {
    const classId = request.body.classId;
    con.query("DELETE FROM class WHERE class_id = ?", [classId], function(err, rows, result) {
        if (err) {
            console.log(err);
            response.status(200).send({ status: false, message: err.sqlMessage });
        } else {
            con.query("select * from class", function(err, result, fields) {
                if (err) {
                    console.log(err);
                    response.status(200).send({ status: false, message: err.sqlMessage });
                } else {
                    response.status(200).send({ status: true, data: result, message: "Class deleted" });
                }
            });
        }
    });
})

// Api to add exam
app.post('/addExam', function(request, response) {
    const createdOn = new Date();
    const examName = request.body.examName;
    const selectedClass = request.body.selectedClass;
    con.query("INSERT INTO exam (exam_name, created_on) VALUES\
                ('" + examName + "','" + createdOn + "')", (err, rows, fields) => {
        if (err) {
            console.log(err);
            response.status(200).send({ status: false, message: err.sqlMessage });
        } else {
            for (var classId of selectedClass) {
                con.query("INSERT INTO class_with_exam\
                     (class_id,\
                        exam_id,\
                     assinged_on)\
                     \
                 VALUES\
                 ('" + classId + "',\
                 '" + rows.insertId + "',\
                '" + createdOn + "'  )", (err, rows, fields) => {
                    if (err) {
                        console.log(err);
                        response.status(200).send({ status: false, message: err.sqlMessage });
                    } else {}
                });
            }
            con.query("select * from exam", function(err, result, fields) {
                if (err) {
                    console.log(err);
                    response.status(200).send({ status: false, message: err.sqlMessage });
                } else {
                    response.status(200).send({ status: true, message: "Exam Added", data: result });
                }
            });
        }
    })

})

// Api to update exam name
app.post('/updateExam', function(request, response) {
    const examId = request.body.examId;
    const examName = request.body.examName;
    const updatedOn = new Date();
    con.query("UPDATE exam SET exam_name = ?, last_updated_on = ? WHERE exam_id = ?;", [examName, updatedOn, examId, ], function(err, result, fields) {
        if (err) {
            console.log(err);
            response.status(200).send({ status: false, message: err.sqlMessage });
        } else {
            con.query("select * from exam", function(err, result, fields) {
                if (err) {
                    console.log(err);
                    response.status(200).send({ status: false, message: err.sqlMessage });
                } else {
                    response.status(200).send({ status: true, message: "Exam name updated", data: result });
                }
            });
        }
    });
})

// Api to get all exam
app.get('/getExam', function(request, response) {
    con.query("select * from exam", function(err, result, fields) {
        if (err) {
            console.log(err);
            response.status(200).send({ status: false, message: err.sqlMessage });
        } else {
            response.status(200).send({ status: true, data: result });
        }
    });
})

// Api to delete exam
app.post('/deleteExam', function(request, response) {
    const examId = request.body.examId;
    con.query("DELETE FROM exam WHERE exam_id = ?", [examId], function(err, rows, result) {
        if (err) {
            console.log(err);
            response.status(200).send({ status: false, message: err.sqlMessage });
        } else {
            con.query("select * from exam", function(err, result, fields) {
                if (err) {
                    console.log(err);
                    response.status(200).send({ status: false, message: err.sqlMessage });
                } else {
                    response.status(200).send({ status: true, data: result, message: "exam deleted" });
                }
            });
        }
    });
})

// Api to get class with exam
app.get('/getClassWithExam', function(request, response) {
    con.query("select class.class_id,\
    exam.exam_name,class_with_exam.* \
    from class,class_with_exam,exam where \
    class.class_id = class_with_exam.class_id AND \
    class_with_exam.exam_id = exam.exam_id", function(err, result, fields) {
        if (err) {
            console.log(err);
            response.status(200).send({ status: false, message: err.sqlMessage });
        } else {
            response.status(200).send({ status: true, data: result });
        }
    });
})

// Api to remove exam from class
app.post('/removeExam', function(request, response) {
    const classId = request.body.classId;
    const examId = request.body.examId;
    con.query("DELETE FROM class_with_exam where class_id=? AND exam_id = ?", [classId, examId], (err, rows, fields) => {
        if (err) {
            console.log(err);
            response.status(200).send({ status: false, message: err.sqlMessage });
        } else {
            response.status(200).send({ status: true, message: "Exam removed" });
        }
    })
});

// Api to get class with section
app.get('/getClassWithSection', function(request, response) {
    con.query("select class.class_id,\
    section.section_name,class_with_section.* \
    from class,class_with_section,section where \
    class.class_id = class_with_section.class_id AND \
    class_with_section.section_id = section.section_id", function(err, result, fields) {
        if (err) {
            console.log(err);
            response.status(200).send({ status: false, message: err.sqlMessage });
        } else {
            response.status(200).send({ status: true, data: result });
        }
    });
})

// Common Api for assigning to class
app.post('/assignToClass', function(request, response) {
    const assignedOn = new Date();
    const selectedClassList = request.body.selectedClass;
    const idToAssign = request.body.assignData.id_to_be_assinged;
    const tabelName = request.body.assignData.table_name;
    const rowName = request.body.assignData.row_name;
    for (var selectedClass of selectedClassList.selectedClass) {
        con.query("INSERT INTO " + tabelName + "\
              (class_id,\
              " + rowName + ",\
              assinged_on)\
              \
          VALUES\
          ('" + selectedClass + "',\
          '" + idToAssign + "',\
         '" + assignedOn + "'  )", (err, rows, fields) => {
            if (err) {
                console.log(err);
                response.status(200).send({ status: false, message: err.sqlMessage });
            } else {}
        });
    }
    response.status(200).send({ status: true });
})

// Api to remove section from class
app.post('/removeSection', function(request, response) {
    const classId = request.body.classId;
    const sectionId = request.body.sectionId;
    con.query("DELETE FROM class_with_section where class_id=? AND section_id = ?", [classId, sectionId], (err, rows, fields) => {
        if (err) {
            console.log(err);
            response.status(200).send({ status: false, message: err.sqlMessage });
        } else {
            response.status(200).send({ status: true, message: "Section removed" });
        }
    })
});

//Api to get section on the basis of selected class
app.post('/getSectionForClass', function(request, response) {
    const classId = request.body.classId;
    con.query("select section.section_name, class_with_section.section_id from \
    section, class_with_section where class_with_section.class_id = ? And\
     class_with_section.section_id = section.section_id;", [classId], function(err, rows, result) {
        if (err) {
            console.log(err);
            response.status(200).send({ status: false, message: err.sqlMessage });
        } else {
            response.status(200).send({ status: true, data: rows })
        }
    });
})

// Api for adding section
app.post('/addSection', function(request, response) {
    const createdOn = new Date();
    const sectionName = request.body.sectionName;
    con.query("INSERT INTO section (section_name,created_on) VALUES\
                ('" + sectionName + "','" + createdOn + "')", (err, rows, fields) => {
        if (err) {
            console.log(err);
            response.status(200).send({ status: false, message: err.sqlMessage });
        } else {
            con.query("SELECT * FROM section", function(err, rows, result) {
                if (err) {
                    response.status(200).send({ status: false, message: err.sqlMessage });
                } else {
                    response.status(200).send({ status: true, data: rows, message: "Section added" });
                }
            });
        }
    })
})

// Api for getting all sections
app.get('/getSection', function(request, response) {
    con.query("SELECT * FROM section", function(err, rows, result) {
        if (err) {
            console.log(err);
            response.status(200).send({ status: false, message: err.sqlMessage });
        } else {
            response.status(200).send({ status: true, data: rows });
        }
    });
})

// Api for deleting section
app.post('/deleteSection', function(request, response) {
    const sectionId = request.body.sectionId;
    con.query("DELETE FROM section WHERE section_id=? ", [sectionId], function(err, rows, result) {
        if (err) {
            console.log(err);
            response.status(200).send({ status: false, message: err.sqlMessage });
        } else {
            con.query("SELECT * FROM section", function(err, rows, result) {
                if (err) {
                    response.status(200).send({ status: false, message: err.sqlMessage });
                } else {
                    response.status(200).send({ status: true, data: rows, message: "Section deleted" });
                }
            });
        }
    });
})

// Api for adding subject
app.post('/addSubject', function(request, response) {
    const createdOn = new Date();
    const subjectName = request.body.subjectName;
    const selectedClass = request.body.selectedClass;
    con.query("INSERT INTO subjects (subject_name,created_on) VALUES\
                ('" + subjectName + "','" + createdOn + "')", (err, rows, fields) => {
        if (err) {
            console.log(err);
            response.status(200).send({ status: false, message: err.sqlMessage });
        } else {
            for (var classId of selectedClass) {
                con.query("INSERT INTO class_with_subjects\
                     (class_id,\
                        subject_id,\
                     assinged_on)\
                     \
                 VALUES\
                 ('" + classId + "',\
                 '" + rows.insertId + "',\
                '" + createdOn + "'  )", (err, rows, fields) => {
                    if (err) {
                        console.log(err);
                        response.status(200).send({ status: false, message: err.sqlMessage });
                    } else {}
                });
            }
            con.query("select * from subjects", function(err, result, fields) {
                if (err) {
                    console.log(err);
                    response.status(200).send({ status: false, message: err.sqlMessage });
                } else {
                    response.status(200).send({ status: true, message: "Subject Added", data: result });
                }
            });
        }
    })

})

// Api to update subject name
app.post('/updateSubject', function(request, response) {
    const subjectId = request.body.subjectId;
    const subjectName = request.body.subjectName;
    const updatedOn = new Date();
    con.query("UPDATE subjects SET subject_name = ?, last_updated_on = ? WHERE subject_id = ?;", [subjectName, updatedOn, subjectId, ], function(err, result, fields) {
        if (err) {
            console.log(err);
            response.status(200).send({ status: false, message: err.sqlMessage });
        } else {
            con.query("select * from subjects", function(err, result, fields) {
                if (err) {
                    console.log(err);
                    response.status(200).send({ status: false, message: err.sqlMessage });
                } else {
                    response.status(200).send({ status: true, message: "Subject name updated", data: result });
                }
            });
        }
    });
})

// Api for getting all subjects
app.get('/getSubject', function(request, response) {
    con.query("SELECT * FROM subjects", function(err, rows, result) {
        if (err) {
            console.log(err);
            response.status(200).send({ status: false, message: err.sqlMessage });
        } else {
            response.status(200).send({ status: true, data: rows });
        }
    });
})

// Api for deleting subject
app.post('/deleteSubject', function(request, response) {
    const subjectId = request.body.subjectId;
    con.query("DELETE FROM subjects WHERE subject_id=? ", [subjectId], function(err, rows, result) {
        if (err) {
            console.log(err);
            response.status(200).send({ status: false, message: err.sqlMessage });
        } else {
            con.query("SELECT * FROM subjects", function(err, rows, result) {
                if (err) {
                    response.status(200).send({ status: false, message: err.sqlMessage });
                } else {
                    response.status(200).send({ status: true, data: rows, message: "subject deleted" });
                }
            });
        }
    });
})


// Api to get class with subject
app.get('/getClassWithSubject', function(request, response) {
    con.query("select class.class_id,\
    subjects.subject_name,class_with_subjects.* \
    from class,class_with_subjects,subjects where \
    class.class_id = class_with_subjects.class_id AND \
    class_with_subjects.subject_id = subjects.subject_id", function(err, result, fields) {
        if (err) {
            console.log(err);
            response.status(200).send({ status: false, message: err.sqlMessage });
        } else {
            response.status(200).send({ status: true, data: result });
        }
    });
})

// Api to remove subject from class
app.post('/removeSubject', function(request, response) {
    const classId = request.body.classId;
    const subjectId = request.body.subjectId;
    con.query("DELETE FROM class_with_subjects where class_id=? AND subject_id = ?", [classId, subjectId], (err, rows, fields) => {
        if (err) {
            console.log(err);
            response.status(200).send({ status: false, message: err.sqlMessage });
        } else {
            response.status(200).send({ status: true, message: "Subject removed" });
        }
    })
});

// Api to get subject on selecting class and exam id
app.post('/getSubjectForClass', function(request, response) {
    con.query("select subjects.subject_name,class_with_subjects.subject_id \
    from class,class_with_subjects,subjects where \
    class.class_id = class_with_subjects.class_id AND \
    class_with_subjects.subject_id = subjects.subject_id AND \
    class_with_subjects.class_id =? ", [request.body.classId], function(err, result, fields) {
        if (err) {
            console.log(err);
            response.status(200).send({ status: false, message: err.sqlMessage });
        } else {
            response.status(200).send({ status: true, data: result });
        }
    });
})



// Api for adding category
app.post('/addCategory', function(request, response) {
    const createdOn = new Date();
    const categoryName = request.body.categoryName;
    con.query("INSERT INTO category (category_name,created_on) VALUES\
                ('" + categoryName + "','" + createdOn + "')", (err, rows, fields) => {
        if (err) {
            console.log(err);
            response.status(200).send({ status: false, message: err.sqlMessage });
        } else {
            con.query("SELECT * FROM category", function(err, rows, result) {
                if (err) {
                    response.status(200).send({ status: false, message: err.sqlMessage });
                } else {
                    response.status(200).send({ status: true, data: rows, message: "Category added" });
                }
            });
        }
    })
})

// Api for getting category list
app.get('/getCategory', function(request, response) {
    con.query("SELECT * FROM category", function(err, rows, result) {
        if (err) {
            console.log(err);
            response.status(200).send({ status: false, message: err.sqlMessage });
        } else {
            response.status(200).send({ status: true, data: rows });
        }
    });
})

// Api for deleting category
app.post('/deleteCategory', function(request, response) {
    const categoryId = request.body.categoryId;
    con.query("DELETE FROM category WHERE category_id=? ", [categoryId], function(err, rows, result) {
        if (err) {
            console.log(err);
            response.status(200).send({ status: false, message: err.sqlMessage });
        } else {
            con.query("SELECT * FROM category", function(err, rows, result) {
                if (err) {
                    response.status(200).send({ status: false, message: err.sqlMessage });
                } else {
                    response.status(200).send({ status: true, data: rows, message: "Category deleted" });
                }
            });
        }
    });
})

// Api for adding religion
app.post('/addReligion', function(request, response) {
    const createdOn = new Date();
    const religionName = request.body.religionName;
    con.query("INSERT INTO religion (religion_name,created_on) VALUES\
                ('" + religionName + "','" + createdOn + "')", (err, rows, fields) => {
        if (err) {
            console.log(err);
            response.status(200).send({ status: false, message: err.sqlMessage });
        } else {
            con.query("SELECT * FROM religion", function(err, rows, result) {
                if (err) {
                    response.status(200).send({ status: false, message: err.sqlMessage });
                } else {
                    response.status(200).send({ status: true, data: rows, message: "Religion added" });
                }
            });
        }
    })
})

// Api for getting religion list
app.get('/getReligion', function(request, response) {
    con.query("SELECT * FROM religion", function(err, rows, result) {
        if (err) {
            console.log(err);
            response.status(200).send({ status: false, message: err.sqlMessage });
        } else {
            response.status(200).send({ status: true, data: rows });
        }
    });
})

// Api for deleting religion
app.post('/deleteReligion', function(request, response) {
    const religionId = request.body.religionId;
    con.query("DELETE FROM religion WHERE religion_id=? ", [religionId], function(err, rows, result) {
        if (err) {
            console.log(err);
            response.status(200).send({ status: false, message: err.sqlMessage });
        } else {
            con.query("SELECT * FROM religion", function(err, rows, result) {
                if (err) {
                    response.status(200).send({ status: false, message: err.sqlMessage });
                } else {
                    response.status(200).send({ status: true, data: rows, message: "Religion deleted" });
                }
            });
        }
    });
})

// Api for adding house
app.post('/addHouse', function(request, response) {
    const createdOn = new Date();
    const houseName = request.body.houseName;
    con.query("INSERT INTO house (house_name,created_on) VALUES\
                ('" + houseName + "','" + createdOn + "')", (err, rows, fields) => {
        if (err) {
            console.log(err);
            response.status(200).send({ status: false, message: err.sqlMessage });
        } else {
            con.query("SELECT * FROM house", function(err, rows, result) {
                if (err) {
                    response.status(200).send({ status: false, message: err.sqlMessage });
                } else {
                    response.status(200).send({ status: true, data: rows, message: "House added" });
                }
            });
        }
    })
})

// Api for getting House list
app.get('/getHouse', function(request, response) {
    con.query("SELECT * FROM house", function(err, rows, result) {
        if (err) {
            console.log(err);
            response.status(200).send({ status: false, message: err.sqlMessage });
        } else {
            response.status(200).send({ status: true, data: rows });
        }
    });
})

// Api for deleting house
app.post('/deleteHouse', function(request, response) {
    const houseId = request.body.houseId;
    con.query("DELETE FROM house WHERE house_id=? ", [houseId], function(err, rows, result) {
        if (err) {
            console.log(err);
            response.status(200).send({ status: false, message: err.sqlMessage });
        } else {
            con.query("SELECT * FROM house", function(err, rows, result) {
                if (err) {
                    response.status(200).send({ status: false, message: err.sqlMessage });
                } else {
                    response.status(200).send({ status: true, data: rows, message: "House deleted" });
                }
            });
        }
    });
})

// Api for adding bus
app.post('/addBus', function(request, response) {
    const createdOn = new Date();
    const busNumber = request.body.busNumber;
    const busRoute = request.body.busRoute;
    con.query("INSERT INTO bus (bus_number,bus_route,created_on) VALUES\
                ('" + busNumber + "','" + busRoute + "','" + createdOn + "')", (err, rows, fields) => {
        if (err) {
            console.log(err);
            response.status(200).send({ status: false, message: err.sqlMessage });
        } else {
            con.query("SELECT * FROM bus", function(err, rows, result) {
                if (err) {
                    response.status(200).send({ status: false, message: err.sqlMessage });
                } else {
                    response.status(200).send({ status: true, data: rows, message: "Bus added" });
                }
            });
        }
    })
})

// Api for getting Bus list
app.get('/getBus', function(request, response) {
    con.query("SELECT * FROM bus", function(err, rows, result) {
        if (err) {
            console.log(err);
            response.status(200).send({ status: false, message: err.sqlMessage });
        } else {
            response.status(200).send({ status: true, data: rows });
        }
    });
})

// Api for deleting Bus
app.post('/deleteBus', function(request, response) {
    const busId = request.body.busId;
    con.query("DELETE FROM bus WHERE bus_id=? ", [busId], function(err, rows, result) {
        if (err) {
            console.log(err);
            response.status(200).send({ status: false, message: err.sqlMessage });
        } else {
            con.query("SELECT * FROM bus", function(err, rows, result) {
                if (err) {
                    response.status(200).send({ status: false, message: err.sqlMessage });
                } else {
                    response.status(200).send({ status: true, data: rows, message: "Bus deleted" });
                }
            });
        }
    });
})

// Api to schedule exam
app.post('/scheduleExam', function(request, response) {
    const paper = request.body.paperName;
    const createdOn = new Date()
    for (var paperName of paper) {
        con.query("INSERT INTO exam_schedule\
             (class_id,\
                exam_id,\
                subject_id,\
                total_marks,\
                passing_marks,\
                paper_date,\
                paper_start_time,\
                paper_end_time,\
                room_number,\
                created_on)\
         VALUES\
         ('" + paperName.classId + "',\
         '" + paperName.examId + "',\
         '" + paperName.subjectId + "',\
         '" + paperName.totalMarks + "',\
         '" + paperName.passingMarks + "',\
         '" + paperName.paperDate + "',\
         '" + paperName.paperStartTime + "',\
         '" + paperName.paperEndTime + "',\
         '" + paperName.roomNumber + "',\
        '" + createdOn + "'  )", (err, rows, fields) => {
            if (err) {
                console.log(err);
                response.status(200).send({ status: false, message: err.sqlMessage });
            } else {}
        });
    }
    response.status(200).send({ status: true, message: "Exam Scheduled" });
})

// Api to check and get time table
app.post('/checkTimeTable', function(request, response) {
    const classId = request.body.classId;
    const examId = request.body.examId;
    con.query("SELECT exam_schedule.*, subjects.subject_name FROM exam_schedule, subjects WHERE class_id=? AND exam_id = ? AND exam_schedule.subject_id = subjects.subject_id", [classId, examId], function(err, rows, result) {
        if (err) {
            console.log(err);
            response.status(200).send({ status: false, message: err.sqlMessage });
        } else {
            if (rows.length) {
                response.status(200).send({ status: true, timeTableStatus: true, data: rows });
            } else {
                response.status(200).send({ status: true, timeTableStatus: false });
            }
        }
    });
})

// Api to delete exam schedule
app.post('/deleteExamSchedule', function(request, response) {
    const classId = request.body.classId;
    const examId = request.body.examId;
    con.query("DELETE FROM exam_schedule WHERE class_id=? AND exam_id = ?", [classId, examId], function(err, rows, result) {
        if (err) {
            console.log(err);
            response.status(200).send({ status: false, message: err.sqlMessage });
        } else {
            response.status(200).send({ status: true, message: "Exam schedule deleted" });
        }
    });
})

// Api for student admission
app.post('/studentAdmission', function(request, response) {
    let length = 6;
    let studentPassword = parseInt(Math.random(length) * 1000000);
    let studentDetail = request.body;
    let documents = request.body.documents;

    let folderName = request.body.firstName + "_" + request.body.admissionNumber + "_" + request.body.fatherName;
    let dir = DIR + folderName;
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(DIR + folderName);
    }

    let studentImage = request.body.studentImage;
    let studentFatherImage = request.body.studentFatherImage;
    let studentMotherImage = request.body.studentMotherImage;
    let guardianImage = request.body.guardianImage;
    let path = DIR + folderName + '/';
    let studentImageObj = { 'fileName': "studentImage" + request.body.admissionNumber, 'type': 'png' };
    let studentFatherImageObj = { 'fileName': "studentFatherImage" + request.body.admissionNumber, 'type': 'png' };
    let studentMotherImageObj = { 'fileName': "studentMotherImage" + request.body.admissionNumber, 'type': 'png' };
    let guardianImageObj = { 'fileName': "guardianImage" + request.body.admissionNumber, 'type': 'png' };
    let studentImageInfo = base64ToImage(studentImage, path, studentImageObj);
    let studentFatherImageInfo = base64ToImage(studentFatherImage, path, studentFatherImageObj);
    let studentMotherImageInfo = base64ToImage(studentMotherImage, path, studentMotherImageObj);
    let guardianImageInfo = base64ToImage(guardianImage, path, guardianImageObj);
    let studentImagePath = path + studentImageInfo.fileName;
    let studentFatherImagePath = path + studentFatherImageInfo.fileName;
    let studentMotherImagePath = path + studentMotherImageInfo.fileName;
    let guardianImagePath = path + guardianImageInfo.fileName;

    con.query("INSERT INTO student_admission_details\
     (roll_number,\
        class_id, \
        section_id,\
        first_name,  \
        last_name,\
        gender, \
        date_of_birth,\
        category_id,\
        religion_id,\
        caste,\
        mobile_number,\
        email,\
        admission_date,\
        blood_group,\
        house_id,\
        height,\
        weight,\
        as_on_date,\
        student_image,\
        father_name,\
        father_phone,\
        father_occupation,\
        student_father_image,  \
        mother_name,\
        mother_phone,\
        mother_occupation,\
        student_mother_image,\
        guardian_select,\
        guardian_name,\
        guardian_relation,\
        guardian_email,\
        guardian_phone,\
        guardian_occupation,\
        guardian_address,\
        guardian_image,\
        current_address,\
        permanent_address,\
        bank_name,\
        bank_account_number,\
        ifsc_code,\
        national_identification_number,\
        local_identification_number,\
        rte,\
        previous_school_detail,\
        note,\
        session_year,\
        student_password)\
     VALUES\
     ('" + parseInt(request.body.rollNumber) + "',\
     '" + request.body.class + "',\
     '" + request.body.section + "',\
     '" + request.body.firstName + "',\
     '" + request.body.lastName + "',\
     '" + request.body.gender + "',\
     '" + request.body.dob + "',\
     '" + request.body.category + "',\
     '" + request.body.religion + "',\
     '" + request.body.caste + "',\
     '" + request.body.mobileNumber + "',\
     '" + request.body.email + "',\
     '" + request.body.admissionDate + "',\
     '" + request.body.bloodGroup + "',\
     '" + request.body.studentHouse + "',\
     '" + request.body.height + "',\
     '" + request.body.weight + "',\
     '" + request.body.asOnDate + "',\
     '" + studentImagePath + "',\
     '" + request.body.fatherName + "',\
     '" + request.body.fatherPhone + "',\
     '" + request.body.fatherOccupation + "',\
     '" + studentFatherImagePath + "',\
     '" + request.body.motherName + "',\
     '" + request.body.motherPhone + "',\
     '" + request.body.motherOccupation + "',\
     '" + studentMotherImagePath + "',\
     '" + request.body.guardianSelect + "',\
     '" + request.body.guardianName + "',\
     '" + request.body.guardianRelation + "',\
     '" + request.body.guardianEmail + "',\
     '" + request.body.guardianPhone + "',\
     '" + request.body.guardianOccupation + "',\
     '" + request.body.guardianAddress + "',\
     '" + guardianImagePath + "',\
     '" + request.body.currentAddress + "',\
     '" + request.body.permanentAddress + "',\
     '" + request.body.bankName + "',\
     '" + request.body.bankAccountNumber + "',\
     '" + request.body.ifscCode + "',\
     '" + request.body.nationalIdentificationNumber + "',\
     '" + request.body.localIdentificationNumber + "',\
     '" + request.body.rte + "',\
     '" + request.body.previousSchoolDetail + "',\
     '" + request.body.note + "',\
     '" + request.body.session + "',\
    '" + studentPassword + "'  )", (err, rows, fields) => {
        if (err) {
            console.log(err);
            response.status(200).send({ status: false, message: err.sqlMessage });
        } else {
            for (let doc of documents) {
                con.query("INSERT INTO student_document\
                         (student_id,\
                            document_name,\
                            document)\
                         \
                     VALUES\
                     ('" + rows.insertId + "',\
                     '" + doc.documentName + "',\
                    '" + doc.document + "'  )", (err, rows, fields) => {
                    if (err) {
                        console.log(err);
                        response.status(200).send({ status: false, message: err.sqlMessage });
                    } else {}
                });
            }
            response.status(200).send({ status: false, message: "Student admission successful" });
        }
    })
})

// Api to get student list
app.get('/getStudentList', function(request, response) {
    con.query("select\
    student_admission_details.*,\
    class.class_name,\
    section.section_name, \
    category.category_name, \
    religion.religion_name, \
    house.house_name \
  from student_admission_details, \
    class, \
    section, \
    category, \
    religion, \
    house \
  where \
    class.class_id = student_admission_details.class_id AND \
    section.section_id = student_admission_details.section_id AND \
    category.category_id = student_admission_details.category_id AND \
    religion.religion_id = student_admission_details.religion_id AND \
    house.house_id = student_admission_details.house_id;", function(err, result, fields) {
        if (err) {
            console.log(err);
            response.status(200).send({ status: false, message: err.sqlMessage });
        } else {
            result.forEach(element => {
                element.student_image = fs.readFileSync(element.student_image, { encoding: 'base64' });
            });
            response.status(200).send({ status: true, data: result });
        }
    });
})

// Api to get student profile
app.post('/getStudentProfile', function(request, response) {
    con.query("select\
    student_admission_details.*,\
    class.class_name,\
    section.section_name, \
    category.category_name, \
    religion.religion_name, \
    house.house_name \
  from student_admission_details, \
    class, \
    section, \
    category, \
    religion, \
    house \
  where \
    class.class_id = student_admission_details.class_id AND \
    section.section_id = student_admission_details.section_id AND \
    category.category_id = student_admission_details.category_id AND \
    religion.religion_id = student_admission_details.religion_id AND \
    house.house_id = student_admission_details.house_id AND \
    student_id = ? ;", [request.body.studentId], function(err, result, fields) {
        if (err) {
            console.log(err);
            response.status(200).send({ status: false, message: err.sqlMessage });
        } else {
            result[0].student_image = fs.readFileSync(result[0].student_image, { encoding: 'base64' });
            result[0].student_father_image = fs.readFileSync(result[0].student_father_image, { encoding: 'base64' });
            result[0].student_mother_image = fs.readFileSync(result[0].student_mother_image, { encoding: 'base64' });
            result[0].guardian_image = fs.readFileSync(result[0].guardian_image, { encoding: 'base64' });
            response.status(200).send({ status: true, data: result });
        }
    });
})

// Api to get subject on selecting class
app.post('/getSubjectForSelectedExamResultCreate', function(request, response) {
    con.query("select exam_schedule.paper_id,exam_schedule.subject_id,\
    exam_schedule.total_marks,exam_schedule.passing_marks,subjects.subject_name \
    from exam_schedule,subjects where \
    exam_schedule.subject_id = subjects.subject_id AND \
    exam_schedule.class_id =? AND exam_schedule.exam_id = ?", [request.body.classId, request.body.examId], function(err, result, fields) {
        if (err) {
            console.log(err);
            response.status(200).send({ status: false, message: err.sqlMessage });
        } else {
            response.status(200).send({ status: true, data: result });
        }
    });
})

// Api to get subject on selecting class
app.post('/getExamsForClass', function(request, response) {
    con.query("select exam.exam_name,class_with_exam.exam_id \
    from class,class_with_exam,exam where \
    class.class_id = class_with_exam.class_id AND \
    class_with_exam.exam_id = exam.exam_id AND \
    class_with_exam.class_id =? ", [request.body.classId], function(err, result, fields) {
        if (err) {
            console.log(err);
            response.status(200).send({ status: false, message: err.sqlMessage });
        } else {
            response.status(200).send({ status: true, data: result });
        }
    });
})

// Api to save student exam result
app.post('/saveStudentResult', function(request, response) {
    const subjectList = request.body.subjects;
    const createdOn = new Date();
    for (let subject of subjectList) {
        con.query("INSERT INTO student_result\
                 (student_id,\
                    class_id,\
                    exam_id,\
                    paper_id,\
                    subject_id,\
                    marks_obtained,\
                    created_on)\
                 \
             VALUES\
             ('" + request.body.studentId + "',\
             '" + request.body.classId + "',\
             '" + request.body.examId + "',\
             '" + subject.paperId + "',\
             '" + subject.subjectId + "',\
             '" + subject.marksObtained + "',\
             '" + createdOn + "'  )", (err, rows, fields) => {
            if (err) {
                console.log(err);
                response.status(200).send({ status: false, message: err.sqlMessage });
            } else {}
        });
    }
    response.status(200).send({ status: false, message: "Result created" });
})

// Api to get student academic record
app.post('/getAcademicRecord', function(request, response) {
    console.log(request.body);
    con.query("select student_result.*,class.class_name,exam.exam_name, \
    subjects.subject_name,exam_schedule.total_marks,exam_schedule.passing_marks\
    from student_result,class,exam,subjects,exam_schedule where \
    student_result.class_id = class.class_id AND \
    student_result.exam_id = exam.exam_id AND \
    student_result.subject_id = subjects.subject_id AND \
    student_result.paper_id = exam_schedule.paper_id AND \
    student_result.student_id =? ", [request.body.studentId], function(err, result, fields) {
        if (err) {
            console.log(err);
            response.status(200).send({ status: false, message: err.sqlMessage });
        } else {
            console.log(result)
            response.status(200).send({ status: true, data: result });
        }
    });
})

// Api to add installment 
app.post('/addInstallment', function(request, response) {
    const createdOn = new Date();
    const installmentName = request.body.installmentName;
    const installmentAmount = request.body.installmentAmount;
    const selectedClass = request.body.selectedClass;
    con.query("INSERT INTO installment (installment_name,installment_amount, created_on) VALUES\
                ('" + installmentName + "','" + parseInt(installmentAmount) + "','" + createdOn + "')", (err, rows, fields) => {
        if (err) {
            console.log(err);
            response.status(200).send({ status: false, message: err.sqlMessage });
        } else {
            for (var classId of selectedClass) {
                con.query("INSERT INTO class_with_installment\
                     (class_id,\
                        installment_id,\
                     assinged_on)\
                     \
                 VALUES\
                 ('" + classId + "',\
                 '" + rows.insertId + "',\
                '" + createdOn + "'  )", (err, rows, fields) => {
                    if (err) {
                        console.log(err);
                        response.status(200).send({ status: false, message: err.sqlMessage });
                    } else {}
                });
            }
            con.query("select * from installment", function(err, result, fields) {
                if (err) {
                    console.log(err);
                    response.status(200).send({ status: false, message: err.sqlMessage });
                } else {
                    response.status(200).send({ status: true, message: "Installment Added", data: result });
                }
            });
        }
    })
})

// Api to get all installment
app.get('/getInstallment', function(request, response) {
    con.query("select * from installment", function(err, result, fields) {
        if (err) {
            console.log(err);
            response.status(200).send({ status: false, message: err.sqlMessage });
        } else {
            response.status(200).send({ status: true, data: result });
        }
    });
})

// Api to update installment name
app.post('/updateInstallment', function(request, response) {
    const installmentId = request.body.installmentId;
    const installmentName = request.body.installmentName;
    const installmentAmount = request.body.installmentAmount;
    const updatedOn = new Date();
    con.query("UPDATE installment SET installment_name = ?,installment_amount = ?, last_updated_on = ? WHERE installment_id = ?;", [installmentName, installmentAmount, updatedOn, installmentId], function(err, result, fields) {
        if (err) {
            console.log(err);
            response.status(200).send({ status: false, message: err.sqlMessage });
        } else {
            con.query("select * from installment", function(err, result, fields) {
                if (err) {
                    console.log(err);
                    response.status(200).send({ status: false, message: err.sqlMessage });
                } else {
                    response.status(200).send({ status: true, message: "Installment updated", data: result });
                }
            });
        }
    });
})