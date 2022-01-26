import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ActivatedRoute, NavigationStart, ParamMap, Router } from '@angular/router';
import { ProviderService } from 'src/app/services/provider.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { NotificationController } from 'src/app/utilities/notification.controller';
import { filter, map, switchMap } from 'rxjs/operators';
import { PlanService } from '../service/plan.service';
import { ProviderSearchComponent } from '../provider-search/provider-search.component';

@Component({
  selector: 'app-plan-providers',
  templateUrl: './plan-providers.component.html',
  styleUrls: ['./plan-providers.component.scss'],
})
export class PlanProvidersComponent implements OnInit {
  modalRef!: BsModalRef;
  mainSearchForm:any;
  searchValue:any
  searchText:any

  selectProviderForDelet :any = []

  selectedList:Array<[]> = []
  data: any = {};
  routeState: any;
  
  planRef:any
  constructor(
    private notify: NotificationController,
    private fb: FormBuilder,
    private modalService: BsModalService, 
    private planService: PlanService,
    private router: Router,
    private routerActive: ActivatedRoute,
    private providerService: ProviderService
    ) {    
    }

  ngOnInit(){
    this.getProviderForPlan()
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
      //  let newList  = this.selectedList.map((provider:any) => provider.providerId)
      //  this.planService.addProviderTOPlan({
      //   planReferenceNumber: this.planRef,
      //   providerIds: newList
      // }).subscribe(da => console.log(da))
    }
 

getProviderForPlan(){
   this.routerActive.params.subscribe(routerRes => {
      this.planService.getProviderOfPlan(routerRes.ref).subscribe(res => {
      this.selectedList =    res.payload
      })
      this.planRef = routerRes.ref
    })
}
  

  openProviderSearch() {
    this.modalRef = this.modalService.show(ProviderSearchComponent, {
      class: 'modal-lg',
      initialState: {
        planRef: this.planRef,
        isModel : true
      }
    })

    this.modalRef.content.event.subscribe((res: any) => {
      if (res) {
        console.log('provider added')
        this.getProviderForPlan()
        this.modalRef.hide()
      }
    });
  
  }
 
 
  moveNext(){
    this.router.navigate(["/setup/plans/benefits",this.planRef ]);
  }

}
