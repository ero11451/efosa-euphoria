import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ProviderService } from 'src/app/services/provider.service';
import { NotificationController } from 'src/app/utilities/notification.controller';
import { ProviderSearchComponent } from '../../providers/provider-search/provider-search.component';
import { CreatedrugComponent } from '../createdrug/createdrug.component';

@Component({
  selector: 'app-drugs-inventory',
  templateUrl: './drugs-inventory.component.html',
  styleUrls: ['./drugs-inventory.component.scss']
})
export class DrugsInventoryComponent implements OnInit {

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
 


  

    addDrug() {
    this.modalRef = this.modalService.show(CreatedrugComponent, {
      class: 'modal-lg',
    });
   
  
  }
 
}
