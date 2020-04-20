import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormGroupDirective,
  NgForm,
  FormArray,
} from "@angular/forms";
import { StudentService } from "../../+services/student.service";
import { Router, ActivatedRoute } from "@angular/router";
import { AdminService } from "../../+services/admin.service";
import { studentAdmissionForm, documentForm } from "./student-admission.utils";
import { ErrorDialogFunctionsService } from "src/app/COMMON/error-message-dialog/error-dialog-functions.service";
import { CONSTANTS } from "src/app/COMMON/constant";
import { DomSanitizer } from "@angular/platform-browser";
import { ClassService } from "src/app/STORE/class/api/class.service";
import { AppState } from "src/app/STORE/app.state";
import { Store } from "@ngrx/store";
import * as HouseActions from "../../../STORE/house/house.actions";
import * as ClassActions from "../../../STORE/class/class.actions";

@Component({
  selector: "app-student-admission",
  templateUrl: "./student-admission.component.html",
  styleUrls: ["./student-admission.component.css"],
})
export class StudentAdmissionComponent implements OnInit {
  today = new Date();
  studentAdmissionForm: FormGroup;
  registrationFormSubmit = false;
  studentImageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    CONSTANTS.USER_IMAGE
  );
  studentFatherImageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    CONSTANTS.USER_IMAGE
  );
  studentMotherImageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    CONSTANTS.USER_IMAGE
  );
  guardianImageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    CONSTANTS.USER_IMAGE
  );
  classList;
  sectionForSelectedClass;
  weekendBlock = (d: Date): boolean => {
    const day = d.getDay();
    return day !== 0 && day !== 6;
  };
  categoryList: Object;
  religionList: Object;
  houseList: Object;
  allBusRoutes: Object;
  allBuses: Object;
  constructor(
    private studentService: StudentService,
    private adminService: AdminService,
    private classService: ClassService,
    private router: Router,
    private activatedPath: ActivatedRoute,
    private errorService: ErrorDialogFunctionsService,
    private sanitizer: DomSanitizer,
    private store: Store<AppState>
  ) {
    this.studentAdmissionForm = studentAdmissionForm();
  }

  ngOnInit() {
    this.fetchClass();
    this.getCategory();
    this.getReligion();
    this.fetchHouse();
    // this.getBusRoutes(); // to get all bus route
  }

  // function to get class list
  fetchClass() {
    this.store.dispatch(new ClassActions.FetchClass());
    this.store.select("classList").subscribe((response) => {
      this.classList = response.classList;
    });
  }

  getSectionForClass(classId) {
    var selectedClass = {
      classId: classId,
    };
    this.adminService
      .getSectionForClass(selectedClass)
      .subscribe((response) => {
        if (response["status"] === true) {
          if (response["data"] == "") {
            this.errorService.openErrorDialog(
              "Sections for this class is not added.Please add Sections"
            );
            this.router.navigate(["section"]);
          } else {
            this.sectionForSelectedClass = response["data"];
          }
        } else {
          this.errorService.openErrorDialog(response["message"]);
        }
      });
    // this.checkFeeStructureByClass(selectedClass);
  }

  addDocument() {
    let control = documentForm();
    (<FormArray>this.studentAdmissionForm.get("documents")).push(control);
  }

  // checkFeeStructureByClass(selectedClass: object) {
  //   this.studentService.checkFeeStructure(selectedClass).subscribe(response => {
  //     if (response["data"] == "") {
  //       this.errorService.openErrorDialog(
  //         "Fees structure for this class is not added.Please add Fees structure"
  //       );
  //       this.router.navigate(["../feesMaster"], {
  //         relativeTo: this.activatedPath
  //       });
  //     } else {
  //     }
  //   });
  // }

  // function to get category list
  getCategory() {
    this.adminService.getCategory().subscribe((response) => {
      if (response["status"] === true) {
        this.categoryList = response["data"];
      } else {
        this.errorService.openErrorDialog(response["message"]);
      }
    });
  }

  // function to get religion list
  getReligion() {
    this.adminService.getReligion().subscribe((response) => {
      if (response["status"] === true) {
        this.religionList = response["data"];
      } else {
        this.errorService.openErrorDialog(response["message"]);
      }
    });
  }

  // function to fetch house list
  fetchHouse() {
    this.store.dispatch(new HouseActions.FetchHouse());
    this.store.select("houseList").subscribe((response) => {
      this.houseList = response.houseList;
    });
  }

  // getBusRoutes() {
  //   this.studentService.getBusRoute().subscribe(response => {
  //     if (response["status"] === true) {
  //       this.allBusRoutes = response["data"];
  //     } else {
  //       this.errorService.openErrorDialog(response["message"]);
  //     }
  //   });
  // }

  // getBusesFormRoutes(busRoute: string) {
  //   var routeDetail = {
  //     busRoute: busRoute
  //   };
  //   this.studentService.getBusesFromRoute(routeDetail).subscribe(response => {
  //     if (response["data"] == "") {
  //       this.errorService.openErrorDialog("Buses for this route is not available.Please add bus");
  //       this.router.navigate(["../add-House-BusRoute-Bus"], {
  //         relativeTo: this.activatedPath
  //       });
  //     } else {
  //       this.allBuses = response["data"];
  //     }
  //   });
  // }

  onFileChange(event: any, name) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        switch (name) {
          case "student":
            this.studentImageUrl = event.target.result;
            break;
          case "father":
            this.studentFatherImageUrl = event.target.result;
            break;
          case "mother":
            this.studentMotherImageUrl = event.target.result;
            break;
          case "guardian":
            this.guardianImageUrl = event.target.result;
            break;
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  guardianSelect(value) {
    var guardianName = "";
    var guardianPhone = "";
    var guardianOccupation = "";
    if (value.value === "Father") {
      guardianName = this.studentAdmissionForm.value.fatherName;
      guardianPhone = this.studentAdmissionForm.value.fatherPhone;
      guardianOccupation = this.studentAdmissionForm.value.fatherOccupation;
      this.studentAdmissionForm.controls["guardianName"].patchValue(
        guardianName
      );
      this.studentAdmissionForm.controls["guardianRelation"].patchValue(
        value.value
      );
      this.studentAdmissionForm.controls["guardianPhone"].patchValue(
        guardianPhone
      );
      this.studentAdmissionForm.controls["guardianOccupation"].patchValue(
        guardianOccupation
      );
    } else if (value.value === "Mother") {
      guardianName = this.studentAdmissionForm.value.motherName;
      guardianPhone = this.studentAdmissionForm.value.motherPhone;
      guardianOccupation = this.studentAdmissionForm.value.motherOccupation;
      this.studentAdmissionForm.controls["guardianName"].patchValue(
        guardianName
      );
      this.studentAdmissionForm.controls["guardianRelation"].patchValue(
        value.value
      );
      this.studentAdmissionForm.controls["guardianPhone"].patchValue(
        guardianPhone
      );
      this.studentAdmissionForm.controls["guardianOccupation"].patchValue(
        guardianOccupation
      );
    } else {
      guardianName = "";
      guardianPhone = "";
      guardianOccupation = "";
      this.studentAdmissionForm.controls["guardianName"].patchValue(
        guardianName
      );
      this.studentAdmissionForm.controls["guardianRelation"].patchValue("");
      this.studentAdmissionForm.controls["guardianPhone"].patchValue(
        guardianPhone
      );
      this.studentAdmissionForm.controls["guardianOccupation"].patchValue(
        guardianOccupation
      );
    }
  }

  sameAsGuardianAddress(checked, addressType) {
    let address = "";
    if (checked.checked) {
      address = this.studentAdmissionForm.value.guardianAddress;
      this.studentAdmissionForm.controls[addressType].setValue(address);
    } else {
      this.studentAdmissionForm.controls[addressType].setValue(address);
    }
  }

  studentAdmissionSubmit() {
    const studentDetail = this.studentAdmissionForm.value;
    this.studentAdmissionForm.value.studentImage = this.studentImageUrl;
    this.studentAdmissionForm.value.studentFatherImage = this.studentFatherImageUrl;
    this.studentAdmissionForm.value.studentMotherImage = this.studentMotherImageUrl;
    this.studentAdmissionForm.value.guardianImage = this.guardianImageUrl;
    this.studentService
      .studentAdmission(studentDetail)
      .subscribe((response) => {
        if (response["status"] === true) {
          this.errorService.openErrorDialog(response["message"]);
        } else {
          this.errorService.openErrorDialog(response["message"]);
        }
      });
  }
}
