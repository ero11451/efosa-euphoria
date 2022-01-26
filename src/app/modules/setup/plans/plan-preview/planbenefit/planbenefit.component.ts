import { Component, Input, OnInit } from '@angular/core';
import { NotificationController } from 'src/app/utilities/notification.controller';
import { ListOfServiceService } from '../../service/list-of-service.service';

@Component({
  selector: 'app-planbenefit',
  templateUrl: './planbenefit.component.html',
  styleUrls: ['./planbenefit.component.scss']
})
export class PlanbenefitComponent implements OnInit {
  
 @Input() benefits: any;
 ListOfSerive:any
  constructor(
    private notify: NotificationController,
    private listOfServiceService: ListOfServiceService,) { }

  ngOnInit(){
    this.notify.hideLoader()
  }
  getService(serviceId:any){
    this.listOfServiceService.getListOfServiceByID(serviceId)
    .subscribe(async (res:any) => {
     if (res) {
       console.log('list of service',res.payload)
      this.ListOfSerive =  res.payload
     } else {
       this.notify.showMessage(res);
     }
   });
  }
}
