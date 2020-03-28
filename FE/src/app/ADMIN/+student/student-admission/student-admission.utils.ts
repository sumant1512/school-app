import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";

export function studentAdmissionForm(): FormGroup {
  return new FormGroup({
    admissionNumber: new FormControl("", Validators.required),
    rollNumber: new FormControl("", Validators.required),
    class: new FormControl("", Validators.required),
    section: new FormControl("", Validators.required),
    firstName: new FormControl("", Validators.required),
    lastName: new FormControl("", Validators.required),
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

export function documentForm(): FormGroup {
  return new FormGroup({
    documentName: new FormControl(""),
    document: new FormControl("")
  });
}
