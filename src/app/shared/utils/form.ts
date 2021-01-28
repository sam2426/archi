export const markFormGroupTouched = (formGroup) => {
  (Object as any).values(formGroup.controls).forEach(control => {
    control.markAsTouched();

    if (control.controls){ // if formControl has nested formControl, call recursively.
      markFormGroupTouched(control);
    }
  });
};
