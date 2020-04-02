import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-profile-view-result',
  templateUrl: './profile-view-result.component.html',
  styleUrls: ['./profile-view-result.component.css']
})
export class ProfileViewResultComponent implements OnInit {
  @Input() selectedClass: string;

  constructor() { }

  ngOnInit() {
  }

}
