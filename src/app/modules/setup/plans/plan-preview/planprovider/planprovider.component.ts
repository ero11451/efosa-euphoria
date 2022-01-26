import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-planprovider',
  templateUrl: './planprovider.component.html',
  styleUrls: ['./planprovider.component.scss']
})
export class PlanproviderComponent implements OnInit {
  @Input() providers: any;
  @Input( )model: boolean = false
  
  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

}
