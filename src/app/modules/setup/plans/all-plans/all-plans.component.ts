import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { of } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { NotificationController } from 'src/app/utilities/notification.controller';
import { Plan } from '../service/interfaces/plan';
import { PlanService } from '../service/plan.service';

@Component({
  selector: 'app-all-plans',
  templateUrl: './all-plans.component.html',
  styleUrls: ['./all-plans.component.scss']
})
export class AllPlansComponent implements OnInit {

  isSearching:any

  selectedPlan:any
  modalRef!: BsModalRef;
  planData?:any = []
  
  constructor(
    private modalService: BsModalService,
    private notify: NotificationController,
    private planService: PlanService
  ) { }

  ngOnInit(){
    this.getPlan()
  }

  search(event: any){
    this.isSearching = true;
    const x = of(event.target.value)
    x.pipe( debounceTime(400), distinctUntilChanged())
    .subscribe((text: string) => {
     this.isSearching = true;
     this.planService.searchForPlan(text)
     .subscribe((res:any) => {
       this.isSearching = false;
       this.planData = res.payload;
       console.log(res)
     }, (err: string | undefined) => {
       this.notify.showErrorMessage(err)
       this.isSearching = false;
       console.log('error', err);
     });
 
   });
   }


  openModal(template: TemplateRef<any>, data:any) {
    this.selectedPlan = data
    this.modalRef = this.modalService.show(template);
  }
  async deleteBenfitCategory(){
    await this.notify.showLoader("");
    this.planService.
    deletePlan(this.selectedPlan.id).subscribe(async (res: any) => {
      this.getPlan()
      await this.notify.hideLoader();
      this.notify.showMessage(res.payload);
      this.modalRef.hide()
    });
}
  async getPlan(){
    await this.notify.showLoader("");
    this.planService.getPlan()
    .subscribe(async (res:any) => {
      this.notify.hideLoader()
      if (res) {
        this.planData = res.payload
      } else {
        this.notify.showMessage(res);
      }
    });
    // this.planService.getPlan()
  }
}
