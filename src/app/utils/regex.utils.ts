import { Validators } from "@angular/forms";

export const emailRegex = Validators.pattern(
    '^(?!.*\\.\\.)[a-zA-Z0-9][a-zA-Z0-9._%+-]*[a-zA-Z0-9]@([a-zA-Z0-9]+(-[a-zA-Z0-9]+)*\\.)+[a-zA-Z]{2,}$'
  );

export const passwordRegex = Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/);