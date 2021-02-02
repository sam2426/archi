import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';

import { Observable, from, of } from 'rxjs';
import { map, switchMap, catchError, take, tap, withLatestFrom } from 'rxjs/operators';

import { environment } from '@src/environments/environment';

import { User } from './user.models';

import * as fromActions from './user.actions';

import { NotificationService } from '@app/services';

type Action = fromActions.All;

@Injectable()
export class UserEffects {
  constructor(
    private actions: Actions,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private notification: NotificationService
  ) {}

  @Effect()
  signInEmail: Observable<Action> = this.actions.pipe(
    ofType(fromActions.Types.SIGN_IN_EMAIL),
    map((action: fromActions.SignInEmail) => action.credentials),
    switchMap((credentials) =>
      from(this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.pasword)).pipe(
        switchMap(signInState =>
          this.afs.doc<User>(`users/${signInState.user.uid}`).valueChanges().pipe(
            take(1),
            map(user => new fromActions.SignInEmailSuccess(signInState.user.uid, user || null))
          )
        ),
        catchError(err => {
          this.notification.error(err.message);
          return of(new fromActions.SignInEmailError(err.message));
        })
      )
    )
  );

  @Effect()
  signUpEmail: Observable<Action> = this.actions.pipe(
    ofType(fromActions.Types.SIGN_UP_EMAIL),
    map((action: fromActions.SignUpEmail) => action.credentials),
    switchMap(credentials =>
      // createUserWithEmailAndPassword returns a promise, so to convert it to observable.. use 'from' operator.
      from(this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.pasword)).pipe(
        // the tap operator does not modify the observable stream in any manner, but it works only if there is no error.
        tap(() => {
          this.afAuth.auth.currentUser.sendEmailVerification(environment.firebase.actionCodeSettings);
        }),
        map((signUpState) => new fromActions.SignUpEmailSuccess(signUpState.user.uid)),
        catchError(err => {
          this.notification.error(err.message);
          return of(new fromActions.SignUpEmailError(err.message));
        })
      )
    )
  );

  @Effect()
  signOut: Observable<Action> = this.actions.pipe(
    ofType(fromActions.Types.SIGN_OUT),
    switchMap(() =>
      from(this.afAuth.auth.signOut()).pipe(
        map(() => new fromActions.SignOutSuccess()),
        catchError(err => of(new fromActions.SignOutError(err.message)))
      )
    )
  );
}

