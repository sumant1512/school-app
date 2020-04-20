import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/STORE/app.state";
import * as ReligionActions from "../../STORE/religion/religion.actions";
import { addReligionForm } from "./religion.utils";

@Component({
  selector: "app-religion",
  templateUrl: "./religion.component.html",
  styleUrls: ["./religion.component.css"],
})
export class ReligionComponent implements OnInit {
  addReligionForm: FormGroup;
  religionList: object[];
  spinner: boolean = false;
  update: boolean = false;
  updateReligionId: number;

  constructor(private store: Store<AppState>) {
    this.addReligionForm = addReligionForm();
  }

  ngOnInit() {
    this.fetchReligion(); // to fetch religion list on load page
  }

  // function to reset religion form
  resetForm() {
    this.addReligionForm.reset();
    this.addReligionForm.markAsUntouched();
  }

  // function to call add or update
  religion() {
    this.update ? this.updateReligion() : this.addReligion();
  }

  // function to add religion
  addReligion() {
    var religionDetail = this.addReligionForm.value;
    this.store.dispatch(new ReligionActions.AddReligion(religionDetail));
  }

  // function to update religion
  updateReligion() {
    const religionDetail = {
      religionId: this.updateReligionId,
      religionName: this.addReligionForm.value.religionName,
    };
    this.store.dispatch(new ReligionActions.UpdateReligion(religionDetail));
    this.resetForm();
  }

  // function to fetch religion list
  fetchReligion() {
    this.store.dispatch(new ReligionActions.FetchReligion());
    this.store.select("religionList").subscribe((response) => {
      this.religionList = response.religionList;
      this.spinner = true;
    });
  }

  // function to delete religion
  deleteReligion(religionId) {
    var religionDetail = { religionId: religionId };
    this.store.dispatch(new ReligionActions.DeleteReligion(religionDetail));
  }

  // function to activate add or update
  addReligionFormOpen() {
    this.update = false;
    this.resetForm();
  }

  // function to edit Religion name
  editReligion(religionId, religionName) {
    this.update = true;
    console.log(this.update);
    this.updateReligionId = religionId;
    this.addReligionForm.get("religionName").setValue(religionName);
  }
}
