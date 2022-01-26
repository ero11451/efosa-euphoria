import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import { NotificationController } from 'src/app/utilities/notification.controller';
import { PlanService } from '../service/plan.service';
import { PlanbenefitComponent } from './planbenefit/planbenefit.component';
import { PlanproviderComponent } from './planprovider/planprovider.component';

@Component({
  selector: 'app-plan-preview',
  templateUrl: './plan-preview.component.html',
  styleUrls: ['./plan-preview.component.scss']
})
export class PlanPreviewComponent implements OnInit {
  benefits:any = []
  providers:any = []
  planRef:string = ''
  plan:any= {}
  modalRef!: BsModalRef;
  allBenefit:any 
  constructor(
    private modalService: BsModalService,
    private router:Router,
    private notify: NotificationController,
    private planService:PlanService,
    private routerActive: ActivatedRoute) { }

  ngOnInit(){
    this.getPlanRef()
    this.getPriviewPlan()
    this.notify.hideLoader()
  }
  getPlanRef(){
    this.routerActive.params.subscribe(routerRes => this.planRef = routerRes.ref)
  }
 
  getPriviewPlan(){
    this.planService.getPlanPriview(this.planRef).subscribe(res => {
      console.log(res)
      if (res) {
        this.plan = res.payload.plan
        this.benefits = res.payload.benefits.slice(0, 3)
        this.allBenefit = res.payload.benefits
        this.providers = res.payload.providers
      } else {
        
      }
    })
  }
  openProvider(){
    this.modalRef = this.modalService.show(PlanproviderComponent, {
      class: 'modal-lg xlg-modal',
      initialState: {
        providers: this.providers,
        model:true
      }
    })
  }
  openBenefit(){
    this.modalRef = this.modalService.show(PlanbenefitComponent, {
      class: 'modal-lg xlg-modal ',
      initialState: {
        benefits: this.allBenefit
      }
    })

    // this.modalRef.content.event.subscribe((res: any) => {
    //   if (res) {
    //     this.modalRef.hide()
    //   }
    // });
  }
  goBack(){
    this.router.navigate(['/setup/plans/benefits/', this.planRef])
  }
  async approvePlan(){
   await this.notify.showLoader('')
     console.log(this.planRef)
    this.planService.activatePlan(this.planRef).subscribe(res => {
      console.log(res)
      if (res.hasErrors === false) {
         this.notify.showMessage(res.payload)
      } else {
        this.notify.showErrorMessage(res.errors[0])
      }
    })
  }
}
