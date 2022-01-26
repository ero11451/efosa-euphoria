import { Component, EventEmitter, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { of } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { ProviderService } from 'src/app/services/provider.service';
import { NotificationController } from 'src/app/utilities/notification.controller';

@Component({
  selector: 'provider-search',
  templateUrl: './provider-search.component.html',
  styleUrls: ['./provider-search.component.scss']
})
export class ProviderSearchComponent implements OnInit {

  isSearching:any
  apiResponse:any

  providerData :any
  closeBtnName?: string = "close";
  title?: string;
  searchValue:any
  public event: EventEmitter<any> = new EventEmitter();

  list:Array<[]> = [];

  constructor(
    private notify: NotificationController,
    private providerServicer: ProviderService,
    public bsModalRef: BsModalRef) { }

  ngOnInit(){
    this.getProvider()
  }

  search(event: any){
   this.isSearching = true;
   const x = of(event.target.value)
   x.pipe(filter(res => res.length > 1), debounceTime(500)
   , distinctUntilChanged())
   .subscribe((text: string) => {
    this.isSearching = true;
    this.searchGetCall(text)
    .subscribe((res:any) => {
      this.isSearching = false;
      this.providerData = res.data;
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
    return this.providerServicer.searchProviderByTerm(term)
  }
  onCheckboxChange(htmlEvent:any, data:any){
    if (htmlEvent.target.checked) {
    this.list.push(data);
    } else {
       const index = this.list.findIndex(x => x === data);
       this.list.splice(index, 1);
    }
    console.log(this.list)
  }
 
 
  async getProvider(){
    await this.notify.showLoader("");
    this.providerServicer.getProvider()
    .subscribe(async (res:any) => {
      console.log(res)
      this.notify.hideLoader()
      if (res) {
        this.providerData = res.data;
      } else {
        this.notify.showMessage(res);
      }
    });
  }

  triggerEvent(data: any) {
    this.event.emit(this.list);
  }

}
