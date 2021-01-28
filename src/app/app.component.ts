import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
// import { environment } from '@src/environments/environment';

import { Store } from '@ngrx/store';
import * as fromRoot from './store';
import * as fromDictionaries from './store/dictionaries';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'archit';

  constructor(private store: Store<fromRoot.State>){}

  ngOnInit(){
    // this.afs.collection('test').snapshotChanges().subscribe(items=>{ //now no use, as test collection deleted
    //   console.log(items.map(x=>x.payload.doc.data()));
    // })
    this.store.dispatch(new fromDictionaries.Read());
  }
}
