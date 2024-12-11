import { CanActivateFn } from '@angular/router';

export const formGuard: CanActivateFn = (route, state) => {
  return true;
};
