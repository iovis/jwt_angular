import { Component, OnInit } from '@angular/core';

import { ApiService } from '../api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})
export class PublicComponent implements OnInit {
  public content: Observable<string>;

  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    this.content = this.api.getPublic();
  }
}
