import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationController } from 'src/app/utilities/notification.controller';
import { BenefitCategoryService } from '../../setup/benefits/service/beneficategory.service';
import { PlanService } from '../../setup/plans/service/plan.service';

@Component({
  selector: 'app-dispensing',
  templateUrl: './dispensing.component.html',
  styleUrls: ['./dispensing.component.scss']
})
export class DispensingComponent implements OnInit {

  checkPlanType?:boolean;
  on:any
  planSelected?:any
  planForm:FormGroup | any
  basePlan:any
  constructor(
    private planService : PlanService,
    private notify: NotificationController,
    private benefitCategoryService: BenefitCategoryService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.getPlan()
    this.initForm()
  }

  async moveNext(){
  
    this.router.navigate(
    ["/setup/plans/providers"], 
    {
      state: {
        formData: this.planForm.value
      }}
      )
}
  

  getPlan(){  
    this.planService.getPlan()
    .subscribe(async (res: any) => {
      console.log('this is  basePlan', res.payload)
      if (res) {
        this. basePlan = res.payload;
      } else {
        this.notify.showMessage(res);
      }
    });
  }

  initForm(){
    this.planForm = this.fb.group({
      checkPlanType:[''],
      premium:['', Validators.compose([Validators.required])],
      name: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      description: [''],
      basePlanId:[''],
    });
  }


}
