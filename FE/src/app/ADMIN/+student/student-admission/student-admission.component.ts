import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormGroupDirective,
  NgForm,
  FormArray
} from "@angular/forms";
import { StudentService } from "../../services/student.service";
import { Router, ActivatedRoute } from "@angular/router";
import { MatDialog } from "@angular/material";
import { AdminService } from "../../services/admin.service";
import { ErrorMessageDialogComponent } from "src/app/COMMON/error-message-dialog/error-message-dialog.component";

@Component({
  selector: "app-student-admission",
  templateUrl: "./student-admission.component.html",
  styleUrls: ["./student-admission.component.css"]
})
export class StudentAdmissionComponent implements OnInit {
  today = new Date();
  registerStudentForm: FormGroup;
  registrationFormSubmit = false;
  studentImageUrl = "../assets/userImage.png";
  studentFatherImageUrl = "../assets/userImage.png";
  studentMotherImageUrl = "../assets/userImage.png";
  guardianImageUrl = "../assets/userImage.png";
  classList;
  sectionForSelectedClass;
  weekendBlock = (d: Date): boolean => {
    const day = d.getDay();
    return day !== 0 && day !== 6;
  };
  allCategory: Object;
  allReligion: Object;
  allHouse: Object;
  allBusRoutes: Object;
  allBuses: Object;
  constructor(
    public asf: FormBuilder,
    public dialog: MatDialog,
    private studentService: StudentService,
    private adminService: AdminService,
    private router: Router,
    private activatedPath: ActivatedRoute
  ) {
    this.registerStudentForm = new FormGroup({
      admissionNumber: new FormControl("", Validators.required),
      rollNumber: new FormControl("", Validators.required),
      class: new FormControl("", Validators.required),
      section: new FormControl("", Validators.required),
      firstName: new FormControl("", Validators.required),
      lastName: new FormControl(""),
      gender: new FormControl(""),
      dob: new FormControl("", Validators.required),
      category: new FormControl(""),
      religion: new FormControl(""),
      caste: new FormControl(""),
      mobileNumber: new FormControl(""),
      email: new FormControl(""),
      admissionDate: new FormControl(new Date()),
      bloodGroup: new FormControl(""),
      studentHouse: new FormControl(""),
      height: new FormControl(""),
      weight: new FormControl(""),
      asOnDate: new FormControl(new Date()),
      studentImage: new FormControl(""),
      fatherName: new FormControl(""),
      fatherPhone: new FormControl(""),
      fatherOccupation: new FormControl(""),
      studentFatherImage: new FormControl(""),
      motherName: new FormControl(""),
      motherPhone: new FormControl(""),
      motherOccupation: new FormControl(""),
      studentMotherImage: new FormControl(""),
      guardianSelect: new FormControl(""),
      guardianName: new FormControl(""),
      guardianRelation: new FormControl(""),
      guardianEmail: new FormControl(""),
      guardianPhone: new FormControl(""),
      guardianOccupation: new FormControl(""),
      guardianAddress: new FormControl(""),
      guardianImage: new FormControl(""),
      currentAddress: new FormControl(""),
      permanentAddress: new FormControl(""),
      busRoute: new FormControl(""),
      bus: new FormControl(""),
      bankName: new FormControl(""),
      bankAccountNumber: new FormControl(""),
      ifscCode: new FormControl(""),
      nationalIdentificationNumber: new FormControl(""),
      localIdentificationNumber: new FormControl(""),
      rte: new FormControl(""),
      previousSchoolDetail: new FormControl(""),
      note: new FormControl(""),
      documents: new FormArray([])
    });
  }

  ngOnInit() {
    this.getClass();
    // this.getCategories();
    // this.getReligions();
    // this.getHouses();
    // this.getBusRoutes(); // to get all bus route
  }

  // function to get class list
  getClass() {
    this.adminService.getClass().subscribe(response => {
      if (response["status"] === true) {
        this.classList = response["data"];
      } else {
        this.openDialog(response["message"]);
      }
    });
  }

  getSectionForClass(classId) {
    var selectedClass = {
      classId: classId
    };
    this.adminService.getSectionForClass(selectedClass).subscribe(response => {
      if (response["status"] === true) {
        if (response["data"] == "") {
          this.openDialog(
            "Sections for this class is not added.Please add Sections"
          );
          this.router.navigate(["add-section"]);
        } else {
          this.sectionForSelectedClass = response["data"];
        }
      } else {
        this.openDialog(response["message"]);
      }
    });
    // this.checkFeeStructureByClass(selectedClass);
  }

  addDocument() {
    const control = new FormGroup({
      name: new FormControl(""),
      doc: new FormControl("")
    });
    (<FormArray>this.registerStudentForm.get("documents")).push(control);
  }

  // Error message dialog
  openDialog(errorMessage: string) {
    const dialogRef = this.dialog.open(ErrorMessageDialogComponent, {
      width: "750px",
      data: { message: errorMessage }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Class Added");
    });
  }
  // checkFeeStructureByClass(selectedClass: object) {
  //   this.studentService.checkFeeStructure(selectedClass).subscribe(response => {
  //     if (response["data"] == "") {
  //       this.openDialog(
  //         "Fees structure for this class is not added.Please add Fees structure"
  //       );
  //       this.router.navigate(["../feesMaster"], {
  //         relativeTo: this.activatedPath
  //       });
  //     } else {
  //     }
  //   });
  // }

  // getCategories() {
  //   this.studentService.getCategory().subscribe(response => {
  //     if (response["status"] === true) {
  //       this.allCategory = response["data"];
  //     } else {
  //       this.openDialog(response["message"]);
  //     }
  //   });
  // }

  // getReligions() {
  //   this.studentService.getReligion().subscribe(response => {
  //     if (response["status"] === true) {
  //       this.allReligion = response["data"];
  //     } else {
  //       this.openDialog(response["message"]);
  //     }
  //   });
  // }

  // getHouses() {
  //   this.studentService.getHouse().subscribe(response => {
  //     if (response["status"] === true) {
  //       this.allHouse = response["data"];
  //     } else {
  //       this.openDialog(response["message"]);
  //     }
  //   });
  // }

  // getBusRoutes() {
  //   this.studentService.getBusRoute().subscribe(response => {
  //     if (response["status"] === true) {
  //       this.allBusRoutes = response["data"];
  //     } else {
  //       this.openDialog(response["message"]);
  //     }
  //   });
  // }

  // getBusesFormRoutes(busRoute: string) {
  //   var routeDetail = {
  //     busRoute: busRoute
  //   };
  //   this.studentService.getBusesFromRoute(routeDetail).subscribe(response => {
  //     if (response["data"] == "") {
  //       this.openDialog("Buses for this route is not available.Please add bus");
  //       this.router.navigate(["../add-House-BusRoute-Bus"], {
  //         relativeTo: this.activatedPath
  //       });
  //     } else {
  //       this.allBuses = response["data"];
  //     }
  //   });
  // }

  // openDialog(errorMessage: string) {
  //   const dialogRef = this.dialog.open(MessageDialogComponent, {
  //     width: "750px",
  //     data: { message: errorMessage }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log("Class Added");
  //   });
  // }

  get validation() {
    return this.registerStudentForm.controls;
  }

  onFileChanged(event: any) {
    console.log("student image");
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.studentImageUrl = event.target.result;
        console.log("base 64 of image", this.studentImageUrl);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  onFileChangedFather(event: any) {
    console.log("family image");
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.studentFatherImageUrl = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  onFileChangedMother(event: any) {
    console.log("family image");
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.studentMotherImageUrl = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  onFileChangedGuardian(event: any) {
    console.log("guardian image");
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.guardianImageUrl = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  guardianSelect(value) {
    console.log(value.value);
    var guardianName = "";
    var guardianPhone = "";
    var guardianOccupation = "";
    if (value.value === "Father") {
      guardianName = this.registerStudentForm.value.fatherName;
      guardianPhone = this.registerStudentForm.value.fatherPhone;
      guardianOccupation = this.registerStudentForm.value.fatherOccupation;
      this.registerStudentForm.controls["guardianName"].setValue(guardianName);
      this.registerStudentForm.controls["guardianRelation"].setValue(
        value.value
      );
      this.registerStudentForm.controls["guardianPhone"].setValue(
        guardianPhone
      );
      this.registerStudentForm.controls["guardianOccupation"].setValue(
        guardianOccupation
      );
    } else if (value.value === "Mother") {
      guardianName = this.registerStudentForm.value.motherName;
      guardianPhone = this.registerStudentForm.value.motherPhone;
      guardianOccupation = this.registerStudentForm.value.motherOccupation;
      this.registerStudentForm.controls["guardianName"].setValue(guardianName);
      this.registerStudentForm.controls["guardianRelation"].setValue(
        value.value
      );
      this.registerStudentForm.controls["guardianPhone"].setValue(
        guardianPhone
      );
      this.registerStudentForm.controls["guardianOccupation"].setValue(
        guardianOccupation
      );
    } else {
      guardianName = "";
      guardianPhone = "";
      guardianOccupation = "";
      this.registerStudentForm.controls["guardianName"].setValue(guardianName);
      this.registerStudentForm.controls["guardianRelation"].setValue("");
      this.registerStudentForm.controls["guardianPhone"].setValue(
        guardianPhone
      );
      this.registerStudentForm.controls["guardianOccupation"].setValue(
        guardianOccupation
      );
    }
  }

  currentAddressCheck(checked) {
    var currentAddress = "";
    if (checked.checked) {
      currentAddress = this.registerStudentForm.value.guardianAddress;
      this.registerStudentForm.controls["currentAddress"].setValue(
        currentAddress
      );
    } else {
      this.registerStudentForm.controls["currentAddress"].setValue(
        currentAddress
      );
    }
  }

  permanentAddressCheck(checked) {
    var permanentAddress = "";
    if (checked.checked) {
      permanentAddress = this.registerStudentForm.value.currentAddress;
      this.registerStudentForm.controls["permanentAddress"].setValue(
        permanentAddress
      );
    } else {
      this.registerStudentForm.controls["permanentAddress"].setValue(
        permanentAddress
      );
    }
  }

  studentAdmissionSubmit() {
    console.log(this.registerStudentForm.value)
  }
  //   this.registrationFormSubmit = true;
  //   if (this.registerStudentForm.invalid) {
  //     this.openDialog("Check mandatory fields");
  //     return;
  //   } else {
  //     var dateOfBirth = this.registerStudentForm.value.dob;
  //     this.registerStudentForm.value.dob =
  //       dateOfBirth.getDate() +
  //       "/" +
  //       (dateOfBirth.getMonth() + 1) +
  //       "/" +
  //       dateOfBirth.getFullYear();
  //     // var admissionDate =  this.registerStudentForm.value.admissionDate;
  //     // this.registerStudentForm.value.admissionDate = admissionDate.getDate()+"/" + (admissionDate.getMonth() + 1) +"/"+admissionDate.getFullYear();
  //     // var asOnDate =  this.registerStudentForm.value.asOnDate;
  //     // this.registerStudentForm.value.asOnDate = asOnDate.getDate()+"/"+(asOnDate.getMonth() + 1) +"/"+asOnDate.getFullYear();
  //     this.registerStudentForm.value.studentImage = this.studentImageUrl;
  //     this.registerStudentForm.value.studentFatherImage = this.studentFatherImageUrl;
  //     this.registerStudentForm.value.studentMotherImage = this.studentMotherImageUrl;
  //     this.registerStudentForm.value.guardianImage = this.guardianImageUrl;
  //     var studentDetail = this.registerStudentForm.value;
  //     var formFields = Object.keys(studentDetail).length;
  //     console.log("Form Field Count", formFields);
  //     var yearStart = this.registerStudentForm.value.admissionDate.getFullYear();
  //     var yearEnd = yearStart + 1;
  //     var session = yearStart + "-" + yearEnd;
  //     studentDetail["session"] = session;
  //     // studentDetail.studentImage = this.studentImageUrl;
  //     console.log(studentDetail);
  //     this.studentService
  //       .studentRegistration(studentDetail)
  //       .subscribe(response => {
  //         if (response["status"] === true) {
  //           this.openDialog(response["message"]);
  //         } else {
  //           this.openDialog(response["message"]);
  //         }
  //       });
  //   }
  // }
}
