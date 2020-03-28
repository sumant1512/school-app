import { Component, OnInit, Input } from "@angular/core";
import { StudentService } from '../../services/student.service';
import { ErrorDialogFunctionsService } from 'src/app/COMMON/error-message-dialog/error-dialog-functions.service';

@Component({
  selector: "app-students-list",
  templateUrl: "./students-list.component.html",
  styleUrls: ["./students-list.component.css"]
})
export class StudentsListComponent implements OnInit {
  isExpanded: boolean = true;
  spinner = false;
  studentList = [
    {name: "Sumant Mishra",father_name: "Narendra Mishra", class: 1, section: "B", roll_number: 5, admsn_number: 2, student_image: "../../../../assets/sumantMishra.jpg"},
    {name: "Sumant Mishra",father_name: "Narendra Mishra", class: 1, section: "B", roll_number: 5, admsn_number: 2, student_image: "../../../../assets/sumantMishra.jpg"},
    {name: "Sumant Mishra",father_name: "Narendra Mishra", class: 1, section: "B", roll_number: 5, admsn_number: 2, student_image: "../../../../assets/sumantMishra.jpg"},
    {name: "Sumant Mishra",father_name: "Narendra Mishra", class: 1, section: "B", roll_number: 5, admsn_number: 2, student_image: "../../../../assets/sumantMishra.jpg"},
    {name: "Sumant Mishra",father_name: "Narendra Mishra", class: 1, section: "B", roll_number: 5, admsn_number: 2, student_image: "../../../../assets/sumantMishra.jpg"},
  ]
  constructor(private studentService: StudentService, private errorService: ErrorDialogFunctionsService) {}

  ngOnInit() {
    this.getStudentList();
  }

  getStudentList(){
    this.studentService.getStudentList().subscribe(response => {
      if (response["status"] === true) {
        this.studentList = response["data"];
        this.spinner = true;
      } else {
        this.errorService.openErrorDialog(response["message"]);
      }
    });
  }

  expansionPanel(status) {
    if (status == "false") {
      this.isExpanded = false;
    } else {
      this.isExpanded = true;
    }
  }
}
