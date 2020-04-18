// import { Actions, Effect, ofType } from "@ngrx/effects";
// import { ClassService } from "./api/class.service";
// import { Injectable } from "@angular/core";
// import {
//   ClassWithSectionActionsUnion,
//   ClassWithSectionActions,
//   FetchedClassWithSections,
// } from "./class.actions";
// import { mergeMap, share, filter } from "rxjs/operators";

// @Injectable()
// export class ClassWithSectionEffects {
//   constructor(
//     private action$: Actions<ClassWithSectionActionsUnion>,
//     private classService: ClassService
//   ) {}

//   fetchClassWithSection = this.action$.pipe(
//     ofType<ClassWithSectionActionsUnion>(
//       ClassWithSectionActions.FETCH_CLASS_WITH_SECTIONS
//     ),
//     mergeMap(() => {
//       return this.classService.getClassWithSection();
//     }),
//     share()
//   );
// }
