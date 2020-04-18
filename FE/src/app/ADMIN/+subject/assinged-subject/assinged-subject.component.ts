import { Component, OnInit } from "@angular/core";
import { AdminService } from "../../+services/admin.service";
import { ErrorDialogFunctionsService } from "src/app/COMMON/error-message-dialog/error-dialog-functions.service";
import { ClassService } from 'src/app/STORE/class/api/class.service';

@Component({
  selector: "app-assinged-subject",
  templateUrl: "./assinged-subject.component.html",
  styleUrls: ["./assinged-subject.component.css"]
})
export class AssingedSubjectComponent implements OnInit {
  classList: object[];
  spinner: boolean = false;
  classWithSubject: object[];
  message: string;
  subjectList: object[];
  constructor(
    private adminService: AdminService,
    private classService: ClassService,
    private errorService: ErrorDialogFunctionsService
  ) {}

  ngOnInit() {
    this.fetchClass();
    this.getClassWithSubject();
  }

  // function to get class list
  fetchClass() {
    this.classService.fetchClass().subscribe(response => {
      if (response["status"] === true) {
        this.classList = response["data"];
        this.spinner = true;
      } else {
        this.errorService.openErrorDialog(response["message"]);
      }
    });
  }

  // function to get all subjects
  getSubject() {
    this.adminService.getSubject().subscribe(response => {
      if (response["status"] === true) {
        this.subjectList = response["data"];
      } else {
        this.errorService.openErrorDialog(response["message"]);
      }
    });
  }

  // function to get class with subjets
  getClassWithSubject() {
    this.adminService.getClassWithSubject().subscribe(response => {
      if (response["status"] === true) {
        this.classWithSubject = response["data"];
      } else {
        this.errorService.openErrorDialog(response["message"]);
      }
    });
  }

  // function to remove subject from class
  removeSubject(classId, subjectId) {
    let subjectDetail = {
      classId: classId,
      subjectId: subjectId
    };
    this.adminService.removeSubject(subjectDetail).subscribe(response => {
      if (response["status"] === true) {
        this.fetchClass();
        this.getClassWithSubject();
        this.errorService.openErrorDialog(response["message"]);
      } else {
        this.errorService.openErrorDialog(response["message"]);
      }
    });
  }
}
