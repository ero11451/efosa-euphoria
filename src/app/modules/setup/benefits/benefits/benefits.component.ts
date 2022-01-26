import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { find } from 'rxjs/operators';
import { NotificationController } from 'src/app/utilities/notification.controller';
import { BenefitCategoryService } from '../service/beneficategory.service';
import { BenefitService } from '../service/benefit.service';
import { BenefitCategory } from '../service/interface/benfit';

@Component({
  selector: 'app-benefits',
  templateUrl: './benefits.component.html',
  styleUrls: ['./benefits.component.scss'],
})

export class BenefitsComponent implements OnInit {
  
  isSelected:any 
  template: TemplateRef<any> | undefined
  benefitID :any
  isServiceListSelected:boolean = true
  isEditMode?: boolean = false;
  updatedLimtiType:any = []

  oldLimit = [{ 
    limitType: 'Monetary', isSelected:false },{  limitType :"Number of sessions",isSelected:false},   {  
    limitType : "Open field ",isSelected:false },{limitType : "Period",isSelected:false}, {   
    limitType : "List of services", isSelected:false}]
  
   mainLimitS:any = [{ 
      limitType: 'Monetary',isSelected:false},{ limitType :"Number of sessions",  isSelected:false},{ 
      limitType : "Open field ",isSelected:false},{limitType : "Period", isSelected:false}, {
      limitType : "List of services", isSelected:false
     }, 
    ]
   
  selecteLimit:any = []
  benfitCategory: Observable<BenefitCategory[]> | any;
  modalRef!: BsModalRef;
  benfit ?: any
  benefitForm:FormGroup | any
  selectedBenefitForDelet:  any
  seletedBenfitForEdit:any
  serviceList: any 

  constructor(
    private modalService: BsModalService,
    private notify: NotificationController,
    private fb: FormBuilder,
    private benefitService: BenefitService,
    private benefitCategoryService: BenefitCategoryService
  ) {}

  ngOnInit() {
    this.getBenefitCategory()
    this.getBanefit()
    this.initForm()
    this.getService()
  }
  async editBenfit(data:any){
    this.isEditMode = true
    this.seletedBenfitForEdit = data
    this.benefitForm.patchValue(data);
    this.mainLimitS =  [{ 
      limitType: 'Monetary', isSelected:false },{  limitType :"Number of sessions",isSelected:false},   {  
      limitType : "Open field ",isSelected:false },{limitType : "Period",isSelected:false}, {   
      limitType : "List of services", isSelected:false, serviceId: this.benefitForm.value.serviceId}]
      
    console.log(data)
    setTimeout(() => {
      const selectedForm: FormArray = this.benefitForm.get('limitListViewModel') as FormArray;
      selectedForm.clear()
      let key = ''
      data.limitListViewModel.forEach(async (element: any) => {
        let selectedLimits =  await this.mainLimitS.find((e: any) => e.limitType == element.limitType)
        
        if (selectedLimits) {
            
            selectedForm.push(new FormControl({
              limitType: element.limitType,  
               } 
              ));  
            ((selectedLimits) ?  selectedLimits.isSelected = true : selectedLimits.isSelected = true );
            if (element.limitType === 'List of services') {
              let  selectService : FormControl = this.benefitForm.get('serviceId')
              let serviceId = data.limitListViewModel.find((service: any) => service.serviceId)
              selectService.setValue(serviceId.serviceId)
              this.isServiceListSelected = false
             }
        } else {        
          this.mainLimitS = this.oldLimit
        }
      });   
      console.log(selectedForm)
    }, 100);
   
  
  
  } 

  async updateBenfit(){
    await this.notify.showLoader("");
    const id = this.seletedBenfitForEdit.id
   
   const selectedForm: FormArray = this.benefitForm.get('limitListViewModel') as FormArray;
   let selectedLimit =  selectedForm.controls.find(a => a.value.limitType === 'List of services')
   selectedLimit?.setValue({
    limitType:'List of services',
    serviceId:this.benefitForm.value.serviceId})

    let mainlist =  
    [...new Map(this.benefitForm.value.limitListViewModel.map((item:any) => [item['limitType'], item])).values()]

    this.benefitForm.value.limitListViewModel = mainlist
   
    if (selectedLimit?.value.limitType  && !selectedLimit?.value.serviceId) {
      this.notify.showErrorMessage('Please select a services for list.')
      this.notify.hideLoader()
      return
    }

    this.benefitService.updateBenefit({id, ...this.benefitForm.value}) 
    .subscribe(async (res: any) => {
      await this.notify.hideLoader();
      if (res.payload) {
        this.mainLimitS =  [{ 
          limitType: 'Monetary', isSelected:false },{  limitType :"Number of sessions",isSelected:false},   {  
          limitType : "Open field",isSelected:false },{limitType : "Period",isSelected:false}, {   
          limitType : "List of services", isSelected:false}]
        this.isEditMode = false
        this.getBanefit()
        this.benefitForm.reset()
        this.notify.showMessage(res.payload);
      } else {
        console.log(res, 'error')
        this.notify.showErrorMessage(res.errors);
      }
    })
  }
  
  getService(){
    this.benefitService.getService()
    .subscribe(async (res: any) => {
      if (res) {
        this.serviceList = res.payload;
        console.log(res.payload)
      } else {
        this.notify.showMessage(res);
      }
    });
  }
 

  onCheckboxChange(htmlEvent:any, limitType:any, service:any) {
    const selectedForm: FormArray = this.benefitForm.get('limitListViewModel') as FormArray;
    if (htmlEvent.target.checked) {
      if (limitType == 'List of services') {
        console.log('you just selected list')
        this.isServiceListSelected = false
        selectedForm.push(new FormControl({
          limitType:limitType,
          serviceId:service
         }))
      }else{
        selectedForm.push(new FormControl({
          limitType
         }))
      }
    
    } else {
       const index = selectedForm.controls.findIndex(x => x.value === limitType);
       selectedForm.removeAt(index);
      
       if (limitType == 'List of services') {
        this.isServiceListSelected = false
       }
       
    }
    
  }
 

 
 public get serviceFormControler() : string {
   return this.benefitForm.get('serviceFormControler')
 }
 

  initForm() {
    this.benefitForm = this.fb.group({
      serviceId:[''],
      benefitCategoryName:[''],
      benefitCategoryId: ['',Validators.compose([Validators.required])],
      name: ['', Validators.compose([Validators.required])],
      limitListViewModel:this.fb.array([])
    });
  }

 
get limitListViewModel() : FormArray {
  return this.benefitForm.get("limitListViewModel") as FormArray
}
  
  async getBanefit(){
    this.notify.showLoader('')
    this.benefitService.getBenefit()
    .subscribe(async (res: BenefitCategory) => {
      if (res) {
        this.notify.hideLoader()
        this.benfit = res.payload;
      } else {
        this.notify.showMessage(res);
      }
    });
  }

  

  async deleteBenfitCategory(){
    await this.notify.showLoader("");
    this.benefitService.deletBenefit(this.selectedBenefitForDelet) 
    .subscribe(async (res: any) => {
      await this.notify.hideLoader();
      if (res.hasErrors == false) {
        this.getBanefit()
      }else{
        
      this.notify.showErrorMessage(res.errors[0]);
      }
    });
}

getBenefitCategory(){
  this.benefitCategoryService.getBenefitCategory()
  .subscribe(async (res: BenefitCategory) => {
    if (res) {
      this.benfitCategory = res.payload;
      console.log(this.benfitCategory)
    } else {
      this.notify.showMessage(res);
    }
  });
}
 

  async createBenefit(){
    const selectedForm: FormArray = this.benefitForm.get('limitListViewModel') as FormArray;
    const ListFound = selectedForm.controls.find(x => x.value.limitType === 'List of services');
    if (this.benefitForm.value.serviceId ) {
      ListFound?.setValue({
        limitType:'List of services',
        serviceId:this.benefitForm.value.serviceId
      })   
    }
    if (ListFound && !this.benefitForm.value.serviceId) {
      this.notify.showErrorMessage('Error','You need to select a list of service')
      return
    }
    console.log(this.benefitForm.value)
    
    await this.notify.showLoader("");
    this.benefitService.createBenfit(this.benefitForm.value)
    .subscribe(async res => {
      await this.notify.hideLoader();
      if (res.hasErrors === false) {
        this.notify.showMessage(res.payload);
        this.getBanefit()
        this.cancelEdit()
        
      } else {
        this.notify.showErrorMessage(res.payLoad);
      }
    })
  }


  cancelEdit(){
    this.isSelected = []
    this.isEditMode = false
    this.benefitForm.reset() ;
    this.mainLimitS =  this.oldLimit
  }
  
  openModal(template: TemplateRef<any>, id:any) {
    this.selectedBenefitForDelet = id
    this.modalRef = this.modalService.show(template);
  }

}
