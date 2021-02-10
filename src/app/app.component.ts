import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
// import { environment } from '@src/environments/environment';

import { select, Store } from '@ngrx/store';
import * as fromRoot from './store';
import * as fromDictionaries from './store/dictionaries';
import * as fromUser from './store/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'archit';

  isAuthorised$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>){}

  ngOnInit(){
    // this.afs.collection('test').snapshotChanges().subscribe(items=>{ //now no use, as test collection deleted
    //   console.log(items.map(x=>x.payload.doc.data()));
    // })
    this.isAuthorised$ = this.store.pipe(select(fromUser.getIsAuthorized));

    this.store.dispatch(new fromUser.Init());
    this.store.dispatch(new fromDictionaries.Read());
  }

  onSignout(){
    this.store.dispatch(new fromUser.SignOut());
  }
}
