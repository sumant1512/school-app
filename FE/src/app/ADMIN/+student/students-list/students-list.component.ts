import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-students-list",
  templateUrl: "./students-list.component.html",
  styleUrls: ["./students-list.component.css"]
})
export class StudentsListComponent implements OnInit {
  isExpanded: boolean = true;
  studentList = [
    {name: "Sumant Mishra",father_name: "Narendra Mishra", class: 1, section: "B", roll_number: 5, admsn_number: 2, student_image: "../../../../assets/sumantMishra.jpg"},
    {name: "Sumant Mishra",father_name: "Narendra Mishra", class: 1, section: "B", roll_number: 5, admsn_number: 2, student_image: "../../../../assets/sumantMishra.jpg"},
    {name: "Sumant Mishra",father_name: "Narendra Mishra", class: 1, section: "B", roll_number: 5, admsn_number: 2, student_image: "../../../../assets/sumantMishra.jpg"},
    {name: "Sumant Mishra",father_name: "Narendra Mishra", class: 1, section: "B", roll_number: 5, admsn_number: 2, student_image: "../../../../assets/sumantMishra.jpg"},
    {name: "Sumant Mishra",father_name: "Narendra Mishra", class: 1, section: "B", roll_number: 5, admsn_number: 2, student_image: "../../../../assets/sumantMishra.jpg"},
  ]
  constructor() {}

  ngOnInit() {}

  expansionPanel(status) {
    if (status == "false") {
      this.isExpanded = false;
    } else {
      this.isExpanded = true;
    }
  }
}
