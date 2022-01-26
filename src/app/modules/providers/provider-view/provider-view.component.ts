import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ProviderService } from 'src/app/services/provider.service';
import { NotificationController } from 'src/app/utilities/notification.controller';
import { ProviderSearchComponent } from '../provider-search/provider-search.component';

@Component({
  selector: 'app-provider-view',
  templateUrl: './provider-view.component.html',
  styleUrls: ['./provider-view.component.scss']
})
export class ProviderViewComponent implements OnInit {

  modalRef!: BsModalRef;
  mainSearchForm:any;
  searchValue:any
  searchText:any

  selectProviderForDelet :any = []

  selectedList:Array<[]> = []
  data: any = {};
  routeState: any;
  
  constructor(
    private notify: NotificationController,
    private fb: FormBuilder,
    private modalService: BsModalService, 
    private providerService : ProviderService,
    private router: Router
    ) {    
    // this.getPlanFormOtherePage()
    }

  ngOnInit(){
  }

  onCheckboxChange(htmlEvent:any, chechboxname:any) {
    if (htmlEvent.target.checked) {
      const index = this.selectedList.indexOf(chechboxname);;
       this.selectProviderForDelet.push(index);
    } else {
       const index = this.selectedList.indexOf(chechboxname);;
       this.selectProviderForDelet.splice( index);
    }
  }
  removeMulitpeProviver(){
    for (var i = this.selectProviderForDelet.length -1; i >= 0; i--)
        this.selectedList.splice(this.selectProviderForDelet[i], 1);   
  }

   removeAnItem(data:any){
       const index = this.selectedList.indexOf( data);
       this.selectedList.splice( index, 1);
       console.log('index', index, this.selectedList, data)
    }
 


  

  openProviderSearch() {
    this.modalRef = this.modalService.show(ProviderSearchComponent, {
      class: 'modal-lg',
    });
    this.modalRef.content.event.subscribe((res: any) => {
      console.log(res)
      if (res) {
        if (this.modalRef.content.list.length === 0) {
          return
        }
        else{
          this.selectedList = this.modalRef.content.list
        }
      }
    });
  
  }
 

}
