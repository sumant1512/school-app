import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AngularMaterialModule } from "./COMMON/angular-material.module";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./COMMON/header/header.component";
import { ClassComponent } from "./ADMIN/class/class.component";
import { SectionComponent } from "./ADMIN/section/section.component";
import { ErrorMessageDialogComponent } from "./COMMON/error-message-dialog/error-message-dialog.component";
import { CategoryComponent } from "./ADMIN/category/category.component";
import { ReligionComponent } from "./ADMIN/religion/religion.component";
import { HouseComponent } from "./ADMIN/house/house.component";
import { BusComponent } from "./ADMIN/bus/bus.component";
import { StudentAdmissionComponent } from "./ADMIN/+student/student-admission/student-admission.component";
import { StudentsListComponent } from "./ADMIN/+student/students-list/students-list.component";
import { SubjectComponent } from "./ADMIN/+subject/subject/subject.component";
import { ExamComponent } from "./ADMIN/+exam/exam/exam.component";
import { AssingedSubjectComponent } from "./ADMIN/+subject/assinged-subject/assinged-subject.component";
import { ExamScheduleComponent } from "./ADMIN/+exam/exam-schedule/exam-schedule.component";
import { SharedFunctions } from "./COMMON/shared-functions.utils";
import { AssignDialogCommonComponent } from "./COMMON/assign-dialog-common/assign-dialog-common.component";
import { ClassSectionSubjectExamChartComponent } from "./ADMIN/class-section-subject-exam-chart/class-section-subject-exam-chart.component";
import { StudentProfileComponent } from "./ADMIN/+student/student-profile/student-profile.component";
import { ProfileViewResultComponent } from "./ADMIN/+student/student-profile/profile-view-result/profile-view-result.component";
import { ProfileAddResultComponent } from "./ADMIN/+student/student-profile/profile-add-result/profile-add-result.component";
import { FeesMasterComponent } from "./ADMIN/+fees/fees-master/fees-master.component";
import { FeesChartComponent } from "./ADMIN/+fees/fees-chart/fees-chart.component";
import { FeeDetailsComponent } from "./ADMIN/+student/student-profile/fee-details/fee-details.component";
import { FeeCollectDialogComponent } from "./ADMIN/+student/student-profile/fee-collect-dialog/fee-collect-dialog.component";
import { StudentCredentialsComponent } from "./ADMIN/+student/student-credentials/student-credentials.component";
import { SearchBarComponent } from "./COMMON/search-bar/search-bar.component";
import { StudentPromoteDialogComponent } from "./COMMON/student-promote-dialog/student-promote-dialog.component";
import { appReducers } from "./STORE/app.reducers";
import { EffectsModule } from "@ngrx/effects";
import { AppEffects } from "./STORE/app.effects";

@NgModule({
  declarations: [
    ErrorMessageDialogComponent,
    AssignDialogCommonComponent,
    StudentPromoteDialogComponent,
    FeeCollectDialogComponent,
    AppComponent,
    HeaderComponent,
    ClassComponent,
    SectionComponent,
    CategoryComponent,
    ReligionComponent,
    HouseComponent,
    BusComponent,
    StudentAdmissionComponent,
    StudentsListComponent,
    SubjectComponent,
    ExamComponent,
    AssingedSubjectComponent,
    ExamScheduleComponent,
    ClassSectionSubjectExamChartComponent,
    StudentProfileComponent,
    ProfileViewResultComponent,
    ProfileAddResultComponent,
    FeesMasterComponent,
    FeesChartComponent,
    FeeDetailsComponent,
    StudentCredentialsComponent,
    SearchBarComponent,
  ],
  entryComponents: [
    ErrorMessageDialogComponent,
    AssignDialogCommonComponent,
    FeeCollectDialogComponent,
    StudentPromoteDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([...AppEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 10,
    }),
  ],
  exports: [],
  providers: [SharedFunctions],
  bootstrap: [AppComponent],
})
export class AppModule {}
