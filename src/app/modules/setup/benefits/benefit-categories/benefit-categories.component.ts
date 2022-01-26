import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { NotificationController } from 'src/app/utilities/notification.controller';
import { BenefitCategoryService } from '../service/beneficategory.service';
import { BenefitCategory } from '../service/interface/benfit';

@Component({
  selector: 'app-benefit-categories',
  templateUrl: './benefit-categories.component.html',
  styleUrls: ['./benefit-categories.component.scss'],
})

export class BenefitCategoriesComponent implements OnInit {
  
  template: TemplateRef<any> | any
  benefitForm!: FormGroup | any;
  isEditMode?: boolean = false;
  benfitCategory: Observable<BenefitCategory[]> | any;
  modalRef!: BsModalRef;
  selectedBenefitForDelet:any
  seletedBenfitForEdit:any

  constructor(
    private modalService: BsModalService,
    private notify: NotificationController,
    private benfitSerive: BenefitCategoryService,
    private fb: FormBuilder
  ) {}


  ngOnInit() {
    this.initForm();
    this.getBanefit()
  }

  cancelEdit(){
    this.isEditMode = false
    this.benefitForm.reset() ;
  }

  editBenfit(data:any){
    this.isEditMode = true
    this.benefitForm.patchValue(data) ;
    this.seletedBenfitForEdit = data
  }

  async updateBenfit(){
    await this.notify.showLoader("");
    const id = this.seletedBenfitForEdit.id
    const dateCreated = this.seletedBenfitForEdit.dateCreated
    this.benfitSerive.updateBenefitCategory({id, dateCreated, ...this.benefitForm.value}) 
    .subscribe(async (res: BenefitCategory) => {
      await this.notify.hideLoader();
      if (res) {
        this.benefitForm.reset()
        this.isEditMode = false
        this.getBanefit()
        this.notify.showMessage(res.payload);
      } else {
        this.notify.showMessage(res);
      }
    });
  }

  async deleteBenfitCategory(){
      await this.notify.showLoader("");
      this.benfitSerive.deletBenefitCategory(this.selectedBenefitForDelet) 
      .subscribe(async (res: any) => {
        await this.notify.hideLoader();
        this.getBanefit()
        this.modalRef.hide()
        console.log(res.payload);
        if (res.payload) {
        this.notify.showMessage(res.payload);
        }else{
          
        this.notify.showErrorMessage('There was an error with your request');
        }
      });
  }
 
  async createBenefit(){
    await this.notify.showLoader("");
    this.benfitSerive.createBenfitCategory(this.benefitForm.value)
    .subscribe(async res => {
      await this.notify.hideLoader();
      console.log(res);
      this.getBanefit()
      if (res.hasErrors === false) {
        this.modalService._hideModal(this.template);
        this.benefitForm.reset()
        this.notify.showMessage(res.payload);
      } if (res.success === false) {
        this.notify.showErrorMessage(res);
      }
    })
  }

  initForm() {
    this.benefitForm = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],
    });
  }

  async getBanefit(){
    await this.notify.showLoader("");
    this.benfitSerive.getBenefitCategory().subscribe(async (res: BenefitCategory) => {
      await this.notify.hideLoader();
      if (res) {
        this.benfitCategory = res.payload;
      } else {
        this.notify.showMessage(res);
      }
    });
  }

  openModal(template: TemplateRef<any>, id:any) {
    this.selectedBenefitForDelet = id
    this.modalRef = this.modalService.show(template);
  }

}
