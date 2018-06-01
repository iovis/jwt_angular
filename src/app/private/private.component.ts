import { Component, OnInit } from '@angular/core';

import { ApiService } from '../api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css']
})
export class PrivateComponent implements OnInit {
  public content: string;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api
      .getPrivate()
      .subscribe(data => (this.content = JSON.stringify(data, null, 2)));
  }
}
