import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { of } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, find } from 'rxjs/operators';
import { ProviderService } from 'src/app/services/provider.service';
import { NotificationController } from 'src/app/utilities/notification.controller';
import { PlanService } from '../service/plan.service';

@Component({
  selector: 'provider-search',
  templateUrl: './provider-search.component.html',
  styleUrls: ['./provider-search.component.scss']
})
export class ProviderSearchComponent implements OnInit {
 
  searchText:any
  planRef !:any
  initialState:any
  isSearching:any
  apiResponse:any

  isModel:boolean | any = false

  providerData :any = [];
  closeBtnName?: string = "close";
  title?: string;
  searchValue:any
  public event: EventEmitter<any> = new EventEmitter();

  list:Array<[]> = [];

  constructor(
    private notify: NotificationController,
    private planServicer: PlanService,
    public bsModalRef: BsModalRef) { }

  ngOnInit(){
    this.getProvider()
  }

  search(event: any){
   this.isSearching = true;
   const x = of(event.target.value)
   x.pipe(filter(res => res.length >= 1), debounceTime(100))
   .subscribe((text: string) => {
    this.isSearching = true;
    this.searchGetCall(text)
    .subscribe((res:any) => {
      this.isSearching = false;
      this.providerData = res.payl;
    }, (err) => {
      this.notify.showErrorMessage(err)
      this.isSearching = false;
      console.log('error', err);
    });

  });
  }
 
  searchGetCall(term: any) {
    if (term === '') {
      return of([]);
    }
    return this.planServicer.searchForProvider('')
  }

  onCheckboxChange(htmlEvent:any, data:any){
    if (htmlEvent.target.checked) {
    this.list.push(data.providerId);
    } else {
       const index = this.list.findIndex(x => x === data);
       this.list.splice(index, 1);
    }
    // console.log(this.list)
  }
 
 
  async getProvider(){
    await this.notify.showLoader("");
      this.planServicer.getEligableProvider(this.planRef).subscribe(res => {
        this.notify.hideLoader()
        console.log(res.payload)
          const key = 'providerId';
          this.providerData =   [...new Map(res.payload.map((item:any) => [item[key], item])).values()]
        })
  }

  triggerEvent(data: any) {
    console.log({
      planReferenceNumber: this.planRef,
      providerIds: this.list
    })
    this.planServicer.addProviderTOPlan({
      planReferenceNumber: this.planRef,
      providerIds: this.list
    }).subscribe(res => {
      if (res) {
        
    this.event.emit('new provider added');
        this.notify.showMessage('')
      }
    })
  }

}
