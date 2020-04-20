import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/STORE/app.state";
import * as ReligionActions from "../../STORE/religion/religion.actions";

@Component({
  selector: "app-religion",
  templateUrl: "./religion.component.html",
  styleUrls: ["./religion.component.css"],
})
export class ReligionComponent implements OnInit {
  addReligionForm: FormGroup;
  religionList: object[];
  spinner: boolean = false;

  constructor(private store: Store<AppState>) {
    this.addReligionForm = new FormGroup({
      religionName: new FormControl("", Validators.required),
    });
  }

  ngOnInit() {
    this.fetchReligion(); // to fetch religion list on load page
  }

  // function to reset religion form
  resetForm() {
    this.addReligionForm.reset();
    this.addReligionForm.markAsUntouched();
  }

  // function to add religion
  addReligion() {
    var religionDetail = this.addReligionForm.value;
    this.store.dispatch(new ReligionActions.AddReligion(religionDetail));
  }

  // function to fetch religion list
  fetchReligion() {
    this.store.dispatch(new ReligionActions.FetchReligion());
    this.store.select("religionList").subscribe((response) => {
      this.religionList = response.religionList;
      this.spinner = true;
    });
  }

  // function to delete category
  deleteReligion(religionId) {
    var religionDetail = { religionId: religionId };
    this.store.dispatch(new ReligionActions.DeleteReligion(religionDetail));
  }
}
