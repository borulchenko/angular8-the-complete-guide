import { Actions, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';

export class AuthEffects {
  private authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START)
  );

  // add dollar sign to the Observables
  constructor(private actions$: Actions) {
  }
}
