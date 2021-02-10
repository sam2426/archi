import { ChangeDetectionStrategy, Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  @Input() isAuthorised: boolean;
  @Output() signout = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onSignOut(){
    this.signout.emit();
  }

}
