export function classSectionTransform(classList, sectionWithClass) {
  let classWithSectionTransformed = [];
  classList.filter(classDta => {
    let classWithSectionFormat = {
      class: classDta,
      sections: []
    };
    sectionWithClass.filter(section => {
      if (section.class_id == classDta.class_id) {
        classWithSectionFormat.sections.push(section);
      }
    });
    classWithSectionTransformed.push(classWithSectionFormat);
  });
  return classWithSectionTransformed;
}
