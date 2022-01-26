import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationController } from 'src/app/utilities/notification.controller';
import { BenefitService } from '../../benefits/service/benefit.service';
import { ListOfServiceService } from '../service/list-of-service.service';
import { PlanService } from '../service/plan.service';
import { filter, find, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { BenefitsComponent } from '../../benefits/benefits/benefits.component';

@Component({
  selector: 'app-plan-benefits',
  templateUrl: './plan-benefits.component.html',
  styleUrls: ['./plan-benefits.component.scss'],
})
export class PlanBenefitsComponent implements OnInit {
 
  planRef :any
  categories:any = [];
  ListOfSerive:any = []
  Periods = [{time:'Days', id:1},{time:'Weeks',id:2}]

  constructor(
    private router :Router,
    private benefitService: BenefitService,
    private notify: NotificationController,
    private planService: PlanService,
    private routerActive: ActivatedRoute,
    private listOfServiceService: ListOfServiceService,
    private renderer: Renderer2,
    ) {}

  ngOnInit() {
    this.getBenefit()
    this.getPlanRef()
  }

 
  async addCategory(htmlEvent:any, values:any) {
    let findedPlan = this.categories.find((e:any) => e.benefitCategoryId === values)
    
    if (htmlEvent.target.checked) {
      findedPlan.isBenefitCategorySelected = true
    } else {
      findedPlan.isBenefitCategorySelected = false
    }
  }
  addBenefit(htmlEvent:any, cat:any, benefit:any){
      let benefit_main  =  this.categories.find((category:any ) => category.benefitCategoryId === cat)
      let {benefits} = benefit_main
      let index_benefit_main  =  benefits.find((bene:any ) => bene.benefitId === benefit)
      if(htmlEvent.target.checked) {
        index_benefit_main.isBenefitSelected = true
       }else{
        index_benefit_main.isBenefitSelected = false
       }    
    } 

  addLimitType(htmlEvent:any,catID:any, benefit:any ,limitType:any,limitText:string) {
    let benefit_main  =  this.categories.find((category:any ) => category.benefitCategoryId === catID)
    let { benefits } = benefit_main
    let selected_benefit_main  =  benefits.find((bene:any ) => bene.benefitId === benefit)
    let  {   limitListViewModel, unSelectedLimit} = selected_benefit_main
    
    let selectedLimit =   limitListViewModel.findIndex((x:any) => x.limitType === limitType)
    // let selectedUnLimit =  unSelectedLimit.findIndex((x:any) => x.limitType === limitType)

    if(htmlEvent.target.checked) {
      
      limitListViewModel.limitType = {
            limitType:limitType,
            limit:limitText
          }
        }
    else{
      limitListViewModel.limitType = {}
        }
      
     
  }
 

  getService( serviceID:any, benefitID:any, ):any{
    console.log(serviceID, benefitID)
    let mainList: any[] = []
    if (serviceID) {
      this.listOfServiceService.getListOfServiceByID(`?parentId=${serviceID}&benefitId=${benefitID}&planReferenceNumber=${this.planRef}`).subscribe((res) => {
        this.notify.hideLoader()
        console.log('this is the list of lst', res)
        res.payload.forEach((element: any) => {
          mainList.push(element)
          console.log(element)
        });
         return res.payload
    })
     console.log(mainList)
      return mainList
    }
    else{
      this.notify.showErrorMessage('Error','This limit type does not have a list of service.')
      this.notify.hideLoader()
      
    }
  // return main
  }


  toggle(currentTarget: any) {
    let children = this.renderer.nextSibling(currentTarget);
    console.log(children.classList)
    if (children.classList.contains('active')) {
      this.renderer.removeClass(children, 'active');
    } else {
      this.renderer.addClass(children, 'active');
    }
  }

  // toggle(currentTarget: any) {
  //   let children = this.renderer.nextSibling(currentTarget);
  //   let checkClassActive = false
  //   for (let index = 0; index <  children.classList.length; index++) {
  //     const element =  children.classList[index];
  //     if (element == 'active')   checkClassActive = true 
  //   }
  //   if (checkClassActive) {
  //       this.renderer.removeClass(children, 'active');
  //   }else{
  //         this.renderer.addClass(children, 'active');
  //   }
  // }

 async submit(){
  let plan: { categoryId: any; benefitModels: any[]; }[] = []
  let cat = this.categories.filter((cat:any)=> cat)
  let send = true
  this.notify.showLoader('')
  cat.forEach((cate: any) => {
      plan.push({
        categoryId:cate.benefitCategoryId,
        benefitModels:[]
      })
      let selectedCat =  plan.find((selectedCat:any) =>  selectedCat.categoryId === cate.benefitCategoryId)
      let a = cate.benefits.filter((e:any) => e.isBenefitSelected  === true);
      a.forEach((ele: any) => {
      
      selectedCat?.benefitModels.push({
        benefitId:ele.benefitId,
        limitListViewModel:ele.limitListViewModel.filter((sa: any) => sa)
         })

         ele.limitListViewModel.forEach((serviceList: any) => {
           if (serviceList.limitType == 'Period') {
             if (serviceList.limitPeriod) {
                serviceList.limit = serviceList.limitPeriod + serviceList.limitTime 
             }
           }
          if (serviceList.serviceId) {
              serviceList.limit = '.'
              serviceList.service =   serviceList.service.map((ser: any) => {
                  if (ser.isSelected) {
                    if (ser.service) {
                      return ser.service
                    }
                    }  
               })   || ''
               serviceList.service = serviceList.service.filter(( e: any ) =>   e !== undefined && e != '');
              console.log(serviceList.service, 'this is a serive')
          }
         })
         ele.limitListViewModel.forEach((limit: any) => {
           if (limit.isSelected === true) {
            if (limit.limitType && !limit.limit) {
              this.notify.showMessage(` Please check if you added a limit to ${limit.limitType}`)
              send = false
             }   
           }
          
         });
        //  if (ele.limitListViewModel) {
        //  let limitSelected = ele.limitListViewModel.filter((d: any) => d.isSelected === true)
         
        //   if (limitSelected) {
        //     if (limitSelected.find((d:any) => !d.limit)) {
        //      this.notify.showMessage(` Please check if you added a limit.`)
        //     } 
        //    }    
        //  }
       
    
      });
    });
 if (send) {
  this.planService.addBenentToPlan({
         planReferenceNumber:this.planRef,
         benefitViewModel:plan
       }).subscribe(async (res:any) => {
          if (!res.hasErrors) {
            console.log(res)
            this.notify.showMessage(res.payload)
            this.notify.hideLoader() 
            this.router.navigate(['/setup/plans/priview/', this.planRef])
          } else{
              console.log(res)
              this.notify.hideLoader()
             this.notify.showErrorMessage('', res.errors[0])
          }
      }); 
      
   this.notify.hideLoader()
 }else{
   this.notify.hideLoader()
  this.getBenefit()
 }
 console.log('plan that was sent:', plan)
   
  }

 

  async getBenefit(){
    
    // this.categories =  this.payLoad.payload
    await this.notify.showLoader("");
    this.benefitService.getGetBenfitByPlanRef(this.planRef)
     .subscribe(async (res:any) => {
      this.notify.hideLoader()
      if (res) {
        this.categories =  res.payload
        this.categories.forEach(async (catego: any) => {
         catego.benefits.forEach((benefit: any) => {
           benefit.limitListViewModel.forEach((limit: any) => {
             if (limit.limitType === 'Period') {
                 limit.limitTime = limit.limit ? limit.limit.match(/\d+/)[0] : ''
             }
              if (limit.serviceId) {
                this.listOfServiceService.getListOfServiceByID(`?parentId=${limit.serviceId}
                &benefitId=${benefit.benefitId}&planReferenceNumber=${this.planRef}`)
                .subscribe((serviceList) => {
                 this.notify.hideLoader()
                  // limit.service = serviceList.payload.map((serviceItem: any) => serviceItem.service);
                  limit.service = serviceList.payload.filter((serviceItem: any) => {
                    // if (serviceItem.service) {
                      return serviceItem
                    // }
                  });;
              })
            }
           });
         });
        });
       console.log(this.categories)
      } else {
        this.notify.showMessage(res);
        this.notify.hideLoader()
      }
    });
    
    console.log(this.categories)
  }

  // async getListOfService(limitID:number){
  //   this.listOfServiceService.getListOfServiceByID(limitID)
  //    .subscribe(async (res:any) => {
  //     if (res) {
  //      this.ListOfSerive =  res.payload
  //      console.log( res.payload,)
  //     } else {
  //       this.notify.showMessage(res);
  //     }
  //   });
  // }
  getPlanRef(){
    this.routerActive.params.subscribe(routerRes => this.planRef = routerRes.ref)
  }


}
