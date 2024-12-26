import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { response } from 'express';
import { ApicallService } from 'src/app/apicall.service';

@Component({
  selector: 'app-certificate-o',
  templateUrl: './certificate-o.component.html',
  styleUrls: ['./certificate-o.component.scss']
})
export class CertificateOComponent {

  unit:string|null ='';
  document_id:string |null ='';
  constructor(private route: ActivatedRoute,private apicallservice:ApicallService) { } 
  ngOnInit(){
    this.unit = this.route.snapshot.paramMap.get('unit');
    this.document_id = this.route.snapshot.paramMap.get('document_id');
    console.log('unit is ',this.unit);
    console.log('document id is ',this.document_id);
    
    


  }
}
