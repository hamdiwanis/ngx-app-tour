import { coerceBooleanProperty } from '@angular/cdk/coercion';

export function toBoolean(value: boolean | string): boolean {
  return coerceBooleanProperty(value);
}
