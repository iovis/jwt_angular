import { Component, OnInit } from '@angular/core';

import { ApiService } from '../api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css']
})
export class PrivateComponent implements OnInit {
  public content: Observable<string>;

  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    this.content = this.api.getPrivate();
  }
}
