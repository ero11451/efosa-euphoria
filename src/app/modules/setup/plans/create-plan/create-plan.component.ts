import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationController } from 'src/app/utilities/notification.controller';
import { PlanService } from '../service/plan.service';

@Component({
  selector: 'app-create-plan',
  templateUrl: './create-plan.component.html',
  styleUrls: ['./create-plan.component.scss']
})
export class CreatePlanComponent implements OnInit {

  checkPlanType?:boolean = false;
  on:any
  planSelected?:any
  planForm:FormGroup | any
  basePlan?:any = []
  constructor(
    private planService : PlanService,
    private notify: NotificationController,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.getPlan()
    this.initForm()
  }

 

  async moveNext(){
    // this.notify.showLoader('')
    if (this.planForm.value.isBasePlan === false) {
     await delete this.planForm.value.parentId
    }
   
    this.planService.createPlan(this.planForm.value).subscribe(res => {
        console.log(res)
      if (!res.hasErrors) {
        this.notify.hideLoader()
        this.router.navigate(['setup/plans/providers', res.payload.planReferenceNumber])
      }else{
      
        this.notify.showErrorMessage(res.errors)
      }
    })
}
  

  getPlan(){  
    this.planService.getPlan()
    .subscribe(async (res: any) => {
      console.log('this is  basePlan', res.payload)
      if (res) {
        this.basePlan =   res.payload
      } else {
        this.notify.showMessage(res);
      }
    });
  }

  initForm(){
    this.planForm = this.fb.group({
      isBasePlan:[false],
      premium:['', Validators.compose([Validators.required])],
      name: ['', Validators.compose([Validators.required])],
      description: [''],
      parentId:[0],
    });
  }

}
