// import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Component,HostListener,ViewChild, ElementRef,ViewChildren, QueryList,AfterViewInit,ChangeDetectorRef} from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
// import { Router, response } from 'express';

import { ApicallService } from 'src/app/apicall.service';
import { inspector } from 'src/app/sidenav/nav-data';
import { environment } from 'src/environments/environment';

interface Row {
  name: string;
  designation: string;
  company: string;
  contact_number: string;
  signature: string; 
  role: string;
}




@Component({
  selector: 'app-key-abstract',
  templateUrl: './key-abstract.component.html',
  styleUrls: ['./key-abstract.component.scss']
})

export class KeyAbstractComponent {
  location=environment.clientUrl+"assets/remove_logo.png";
  isLoading=true;

  showBlurEffect: boolean = true;
  isDialogVisible: boolean = false; // Ensure it's declared as public
  savedSignature: string | null = null; // Property to hold the saved signature URL
  // private context: CanvasRenderingContext2D | null = null;
  // private isDrawing: boolean = false;
  signature: string ="";
  // @ViewChildren('canvas', 'canvas2') canvasList!: QueryList<ElementRef<HTMLCanvasElement>>;
  // @ViewChildren('canvas1', 'canvas2') canvasList!: QueryList<ElementRef<HTMLCanvasElement>>;
  // @ViewChildren('canvas1, canvas2') canvasList!: QueryList<ElementRef<HTMLCanvasElement>>;

  @ViewChild('popupCanvas', { static: false }) popupCanvas!: ElementRef<HTMLCanvasElement>;
 
  @ViewChild('contentToConvert') contentToConvert!: ElementRef;


  rows: Row[] = [
    { name: '', designation: '',role: '', company: '', contact_number: '',signature: '' },
    { name: '', designation: '',role: '', company: '', contact_number: '',signature: '' },

    // { name: '', designation: '',role: '', company: '', contact_number: '',signature: '' },
    // { name: '', designation: '',role: '', company: '', contact_number: '' ,signature: ''},
    // { name: '', designation: '',role: '', company: '', contact_number: '',signature: '' }
  ];


  // ngAfterViewInit() {
  //   const canvas = document.querySelector('canvas') as HTMLCanvasElement;
  //   this.context = canvas.getContext('2d');
  //   if (this.context) {
  //     this.context.lineWidth = 2;
  //     this.context.strokeStyle = '#000';
  //     this.context.lineCap = 'round';
  //     this.context.lineJoin = 'round';
  //   }
  // }

  // startDrawing(event: MouseEvent) {
  //   this.isDrawing = true;
  //   if (this.context) {
  //     const rect = this.context.canvas.getBoundingClientRect();
  //     const x = event.clientX - rect.left;
  //     const y = event.clientY - rect.top;
  //     this.context.beginPath();
  //     this.context.moveTo(x, y);
  //   }
  // }


  

  // draw(event: MouseEvent) {
  //   if (this.isDrawing && this.context) {
  //     const rect = this.context.canvas.getBoundingClientRect();
  //     const x = event.clientX - rect.left;
  //     const y = event.clientY - rect.top;
  //     this.context.lineTo(x, y);
  //     this.context.stroke();
  //   }
  // }

  // endDrawing() {
  //   this.isDrawing = false;
  // }
  // captureSignature(event: TouchEvent, canvas: HTMLCanvasElement, index: number) {
  //   const ctx = canvas.getContext('2d')!;
  //   ctx.lineWidth = 2;
  //   ctx.strokeStyle = 'black';

  //   const rect = canvas.getBoundingClientRect();

  //   let isDrawing = false;
  //   let lastX = 0;
  //   let lastY = 0;

  //   const touchStartHandler = (e: TouchEvent) => {
  //     const touch = e.changedTouches[0];
  //     [lastX, lastY] = [touch.clientX - rect.left, touch.clientY - rect.top];
  //     isDrawing = true;
  //   };

  //   const touchMoveHandler = (e: TouchEvent) => {
  //     if (!isDrawing) return;
  //     const touch = e.changedTouches[0];
  //     const currentX = touch.clientX - rect.left;
  //     const currentY = touch.clientY - rect.top;

  //     ctx.beginPath();
  //     ctx.moveTo(lastX, lastY);
  //     ctx.lineTo(currentX, currentY);
  //     ctx.stroke();
  //     [lastX, lastY] = [currentX, currentY];
  //   };

  //   const touchEndHandler = () => {
  //     isDrawing = false;
  //     this.rows[index].signature = canvas.toDataURL('image/png');
  //     canvas.removeEventListener('touchstart', touchStartHandler);
  //     canvas.removeEventListener('touchmove', touchMoveHandler);
  //     canvas.removeEventListener('touchend', touchEndHandler);
  //   };

  //   const touchCancelHandler = () => {
  //     isDrawing = false;
  //     canvas.removeEventListener('touchstart', touchStartHandler);
  //     canvas.removeEventListener('touchmove', touchMoveHandler);
  //     canvas.removeEventListener('touchend', touchEndHandler);
  //   };

  //   canvas.addEventListener('touchstart', touchStartHandler);
  //   canvas.addEventListener('touchmove', touchMoveHandler);
  //   canvas.addEventListener('touchend', touchEndHandler);
  //   canvas.addEventListener('touchcancel', touchCancelHandler);
  // }

  // clearSignature(rowIndex: number) {
  //   if (this.canvasList && this.canvasList.length > rowIndex) {
  //     const canvasRef = this.canvasList.toArray()[rowIndex];
  //     const canvas = canvasRef.nativeElement;
  //     const ctx = canvas.getContext('2d')!;
  //     ctx.clearRect(0, 0, canvas.width, canvas.height);
  //     this.rows[rowIndex].signature = '';
  //   } else {
  //     console.error(`Canvas at index ${rowIndex} is not available.`);
  //   }
  // }
 
 

 
 


  

  


  

  records: any[]=[];
  baseUrl = `${environment.serverUrl}`;
    // breif_spec:any[]=[];
  breif_spec:any[] =[];

  certificate:boolean=false;
  desktop:boolean=false;
  onsite:boolean=false;
  hasFunctionalPointYChecked1: boolean = true;
  pit_light_control: boolean = true;

  pit_stop_switch_upper:boolean=true;
  pit_stop_switch_lower:boolean=true;
  limit_switch:boolean=true;
  car_run_by:boolean=true;
  cwt_run_by:boolean=true;
  car_buffer:boolean=true;
  cwt_buffer:boolean=true;
  pit_condition:boolean=true;
  cop_operation:boolean=true;
  cabin_display:boolean=true;
  function_hall_button:boolean=true;
  function_hall_position:boolean=true;
  function_hall_latern:boolean=true;
  dcs: boolean = true;
  door_safety:boolean=true;
  ard:boolean=true;
  alaram:boolean=true;
  light:boolean=true;
  intercom:boolean=true;
  fireman:boolean=true;
  unlocking:boolean=true;
  levelling:boolean=true;
  riding:boolean=true;
  door:boolean=true;
  cabin:boolean=true;
  toe_guard:boolean=true;
  stop_switch:boolean=true;
  earthing:boolean=true;
  hand_lamp:boolean=true;
  gear_switch:boolean=true;
  gate_switch:boolean=true;
  landing_locks:boolean=true;
  condition_car_top:boolean=true;
  identification_car_top:boolean=true;
  safe_access:boolean=true;
  main_switch:boolean=true;
  equipments_earthing:boolean=true;
  equipments:boolean=true;
  machine_sheave:boolean=true;
  abnormal_noise:boolean=true;
  rope_condition:boolean=true;
  manual_brake:boolean=true;
  lighting:boolean=true;
  final_limit:boolean=true;
  car_light:boolean=true;
  contact:boolean=true;
  abnormal_heat:boolean=true;
  overspeed:boolean=true;
  instruction:boolean=true;
  mcrswitch:boolean=true;
  controller:boolean=true;



  name:string='';
  unit:string|null ='';
  document_id:string |null ='';
  contract:string|null='';
  building_name:string|null='';
  current_date=new Date();
  inf_26:{id:number,contract_number:string,customer_workorder_name:string,customer_workorder_date:string,
    customer_name_as_per_work_order:string,type_of_inspection:string,job_type:string,project_name:string,
    building_name:string,location:string,type_of_building:string,site_address:string,customer_contact_name:string,
    ustomer_contact_number:string,customer_contact_number:string,customer_contact_mailid:string,oem_details:string,
    no_of_elevator:number,no_of_escalator:number,no_of_travelator:number,	no_of_mw:number, no_of_car_parking:number,
    travel_expenses_by:string,accomodation_by:string,no_of_stops_elevator:number,no_of_stops_dw:number,no_of_home_elevator:number,
    no_of_visits_as_per_work_order:number,no_of_mandays_as_per_work_order:number,	total_units_schedule:number,schedule_from:string,
    schedule_to:string,tpt6:number,	tpt7:number, load_test:number,pmt:number,rope_condition:number,callback:number,balance:number,inspector_list:string[],
    inspector_array:string}={id:0,contract_number:'',customer_workorder_name:'',customer_workorder_date:'',customer_name_as_per_work_order:'',type_of_inspection:'',job_type:'',project_name:'',building_name:'',location:'',type_of_building:'',site_address:'',customer_contact_name:'',ustomer_contact_number:'',customer_contact_number:'',customer_contact_mailid:'',oem_details:'',no_of_elevator:0,no_of_escalator:0,no_of_travelator:0,	no_of_mw:0,no_of_car_parking:0,travel_expenses_by:'',accomodation_by:'',no_of_stops_elevator:0,no_of_stops_dw:0,no_of_home_elevator:0,no_of_visits_as_per_work_order:0,no_of_mandays_as_per_work_order:0,	total_units_schedule:0,schedule_from:'',
    schedule_to:'',tpt6:0,	tpt7:0, load_test:0,pmt:0, rope_condition:0,callback:0,balance:0,inspector_list:[],inspector_array:''};
  

  constructor(private route: ActivatedRoute,private dataService:ApicallService, private http:HttpClient,private router:Router,private cdr:ChangeDetectorRef) { 
    
  } 
  ngOnInit(){
    this.fetchSignature();

    this.name = sessionStorage.getItem('UserName') as string;

    this.unit = this.route.snapshot.paramMap.get('unit');
    this.document_id = this.route.snapshot.paramMap.get('document_id');
    this.contract= this.route.snapshot.paramMap.get('contract_no');
    console.log('document id is',this.document_id);
    console.log('unit is ',this.unit);
    console.log('contract no is ', this.contract);

    const documentId = this.document_id!; // Non-null assertion
    const unitNo = this.unit!; // Non-null assertion
    // const section = 'your_section'; // Adjust or define section variable
    const inspector = `${environment.serverUrl}api/b_spec?encodedValue=${documentId}&encodedValue1=${unitNo}`;   
     console.log('url is',inspector);
    
    this.http.get<any[]>(inspector) // Replace with your server endpoint
      .subscribe(data => {
        this.breif_spec = data;
        console.log('breif spec is',this.breif_spec);
        
      });


    this.http.get<any[]>(`${this.baseUrl}records`, {
      params: {
        document_id: documentId,
        unit_no: unitNo,
        // section: section
      }
    })
    .subscribe(data => {
      this.records = data;
      setTimeout(() => {
        this.isLoading = false;
        this.cdr.detectChanges(); // Trigger change detection manually if needed
       });
      console.log('records',this.records);
      this.checkFunctionalPointYChecked1();
      this.certificate = 
  this.limit_switch &&
  this.car_run_by &&
  this.cwt_run_by &&
  this.door_safety&&
  this.ard &&
  this.alaram &&
  this.light &&
  this.intercom &&
  this.fireman &&
  this.unlocking &&
  this.toe_guard &&
  this.stop_switch &&
  this.final_limit &&
  this.gear_switch &&
  this.gate_switch &&
  this.landing_locks &&

  this.contact &&
  this.equipments_earthing &&
  this.equipments &&
  this.machine_sheave &&
  this.abnormal_noise &&
  this.abnormal_heat &&
  this.rope_condition &&
  this.overspeed &&
  this.manual_brake &&
  this.mcrswitch &&
  this.controller

  ? true
  : false;


  this.desktop =this.pit_light_control && 
  this.pit_stop_switch_upper && 
  this.pit_stop_switch_lower &&
  this.limit_switch &&
  this.cwt_run_by &&
  this.cop_operation &&
  this.cabin_display && 
  this.function_hall_button &&
  this.function_hall_position &&
  this.function_hall_latern &&
  this.dcs &&
  this.door_safety &&
  this.ard && 
  this.alaram &&
  this.light && 
  this.intercom &&
  this.fireman && 
  this.unlocking &&
  this.levelling &&
  this.cabin && 
  this.toe_guard &&
  this.stop_switch && 
  this.final_limit && 
  this. gear_switch && 
  this.landing_locks && 
  this.earthing && 
  this.equipments && 
  this.rope_condition && 
  this.overspeed && 
  this.manual_brake &&
  this.instruction && 
  this.mcrswitch && this.car_run_by && this.abnormal_noise &&
  this.abnormal_heat 

  ?true:false;

  this.onsite=
  
  this.rope_condition 
  ?true:false;

      

      
    });
    

    


    this.dataService.getDetailsForContractName(this.contract).subscribe((details: any) => {
      console.log('inf api is called');
      
       this.inf_26 = details;
       this.building_name=details.building_name;
   
      console.log('agreement page inf',this.inf_26);
     
      console.log('inspector array is',details.inspector_array);
      const Ins_array = JSON.parse(details.inspector_array);
      
    });

   

    
  
  }
  redirectToAnotherPage() {
    // if (this.unit) {
      this.router.navigate(['certificate', this.unit,this.document_id]);
      
        // () => console.log('Navigation successful'),
        // (error) => console.error('Navigation failed:', error)
    //   );
    // } else {
    //   console.error('Invalid unit value:', unit);
    // }
  // }
  }
  showFalsePopup: boolean = true;
  showFalsePopup1:boolean = true;

closePopupContainer() {
  this.showFalsePopup = false;
}
  
  closePopup() {
    this.certificate = false;
  }

  closepopup1(){
    this.showFalsePopup1= false;


  }
  
  

  checkFunctionalPointYChecked1() {
    
    for (const record of this.records) {
     
      if (record.description === "PIT LIGHT & CONTROL" && record.functional_point === 'Y' && record.checked === 1) {
        this.pit_light_control = false;
        break;
      }
    
    }
    for (const record of this.records) {
     
      if (record.description === "PIT UPPER STOP SW. OPERATION" && record.functional_point === 'Y' && record.checked === 1) {
        this.pit_stop_switch_upper = false;
        break;
      }
    }
    for (const record of this.records) {
     
      if (record.description === "PIT LOWER STOP SW. OPERATION" && record.functional_point === 'Y' && record.checked === 1) {
        this.pit_stop_switch_lower = false;
        break;
      }
    }
    for (const record of this.records) {
     
      if (record.description === "DOWN FINAL LIMIT SWITCH CONDITION /OPERATION" && record.functional_point === 'Y' && record.checked === 1) {
        this.limit_switch = false;
        break;
      }
    }
    for (const record of this.records) {
     
      if (record.description === "BUFFERS & CONDITION" && record.functional_point === 'Y' && record.checked === 1) {
        this.car_run_by = false;
        break;
      }
    }
    for (const record of this.records) {
     
      if (record.id_no === "CWT RUN BY" && record.functional_point === 'Y' && record.checked === 1) {
        this.cwt_run_by = false;
        break;
      }
    }
    for (const record of this.records) {
     
      if (record.description ==="PIT CONDITION"  && record.functional_point === 'Y' && record.checked === 1) {
        this.pit_condition = false;
        break;
      }
    }
    for (const record of this.records) {
     
      if (record.description === "PIT IDENTIFICATION" && record.functional_point === 'Y' && record.checked === 1) {
        this. hasFunctionalPointYChecked1= false;
        break;
      }
    }
    for (const record of this.records) {
     
      if (record.description === "C.O.P OPERATIONS" && record.functional_point === 'Y' && record.checked === 1) {
        this.cop_operation = false;
        break;
      }
    }
    for (const record of this.records) {
     
      if (record.description=== "CABIN DISPLAY CONDITION" && record.functional_point === 'Y' && record.checked === 1) {
        this.cabin_display = false;
        break;
      }
    }
    for (const record of this.records) {
     
      if (record.description === "FUNCTION OF HALL BUTTON" && record.functional_point === 'Y' && record.checked === 1) {
        this.function_hall_button = false;
        break;
      }
    }
    for (const record of this.records) {
     
      if (record.description === "FUNCTION OF HALL POSITION DISPLAY" && record.functional_point === 'Y' && record.checked === 1) {
        this.function_hall_position = false;
        break;
      }
    }
    for (const record of this.records) {
     
      if (record.description === "FUNCTION OF HALL LANTERNS" && record.functional_point === 'Y' && record.checked === 1) {
        this.function_hall_latern = false;
        break;
      }
    }
    for (const record of this.records) {
     
      if (record.description === "FUNCTION OF DCS" && record.functional_point === 'Y' && record.checked === 1) {
        this.dcs = false;
        break;
      }
    }
    for (const record of this.records) {
     
      if (record.description === "CAR DOOR SAFETY SENSOR/ MECHANISM" && record.functional_point === 'Y' && record.checked === 1) {
        this.door_safety = false;
        break;
      }
    }
    for (const record of this.records) {
     
      if (record.description === "FUNCTION OF ARD" && record.functional_point === 'Y' && record.checked === 1) {
        this.ard = false;
        break;
      }
    }
    for (const record of this.records) {
     
      if (record.description === "FUNCTIONING OF EMERGENCY ALARM" && record.functional_point === 'Y' && record.checked === 1) {
        this.alaram = false;
        break;
      }
    }
    for (const record of this.records) {
     
      if (record.description === "FUNCTIONING OF EMERGENCY LIGHT "&& record.functional_point === 'Y' && record.checked === 1) {
        this.light = false;
        break;
      }
    }
    for (const record of this.records) {
     
      if (record.description === "FUNCTIONING OF INTERCOM OPERATION" && record.functional_point === 'Y' && record.checked === 1) {
        this.intercom = false;
        break;
      }
    }
    for (const record of this.records) {
     
      if (record.description === "FIREMAN OPERATION" && record.functional_point === 'Y' && record.checked === 1) {
        this.fireman = false;
        break;
      }
    }
    for (const record of this.records) {
     
      if (record.description === "FUNCTION OF UNLOCKING DEVICE" && record.functional_point === 'Y' && record.checked === 1) {
        this.unlocking = false;
        break;
      }
    }
    for (const record of this.records) {
     
      if (record.description === "LEVELLING" && record.functional_point === 'Y' && record.checked === 1) {
        this.levelling = false;
        break;
      }
    }
    for (const record of this.records) {
     
      if (record.description ==="RIDING PERFORMANCE"  && record.functional_point === 'Y' && record.checked === 1) {
        this.riding = false;
        break;
      }
    }
    for (const record of this.records) {
     
      if (record.description === "CAR DOOR OPERATION" && record.functional_point === 'Y' && record.checked === 1) {
        this.door = false;
        break;
      }
    }
    for (const record of this.records) {
     
      if (record.description ==="CABIN IDENTIFICATION" && record.functional_point === 'Y' && record.checked === 1) {
        this.cabin = false;
        break;
      }
    }
    for (const record of this.records) {
     
      if (record.description === "TOE GUARD" && record.functional_point === 'Y' && record.checked === 1) {
        this.toe_guard = false;
        break;
      }
    }
    

    for (const record of this.records) {
     
      if (record.description === "MAINTENANCE / INSPECTION  SWITCHES " && record.functional_point === 'Y' && record.checked === 1) {
        this.stop_switch = false;
        break;
      }
    }
    for (const record of this.records) {
     
      if (record.description === "UP FINAL LIMIT SWITCH CONDITION /OPERATION" && record.functional_point === 'Y' && record.checked === 1) {
        this.final_limit = false;
        break;
      }
    }

    for (const record of this.records) {
     
      if (record.description ==="DEDICATED GUARDED HAND LAMP  "  && record.functional_point === 'Y' && record.checked === 1) {
        this.car_light = false;
        break;
      }
    }

    for (const record of this.records) {
     
      if (record.description === "FUNCTION OF STOP SWITCH" && record.functional_point === 'Y' && record.checked === 1) {
        this.gear_switch = false;
        break;
      }
    }

    for (const record of this.records) {
     
      if (record.description === "(SOS) SAFETY GEAR SWITCH OPERATION " && record.functional_point === 'Y' && record.checked === 1) {
        this.gate_switch = false;
        break;
      }
    }

    for (const record of this.records) {
     
      if (record.description === "CAR DOOR CONTACT(SWITCH) OPERATION " && record.functional_point === 'Y' && record.checked === 1) {
        this.contact = false;
        break;
      }
    }
    function closePopupContainer() {
      // Remove the blur effect by modifying the CSS class of the background element
      document.body.classList.remove('blur');
  }

 

    

    for (const record of this.records) {
     
      if (record.description === " CONDITION OF LANDING LOCKS, SWITCHES" && record.functional_point === 'Y' && record.checked === 1) {
        this.landing_locks = false;
        break;
      }
    }

    for (const record of this.records) {
     
      if (record.description === " CONDITION  OF CAR TOP" && record.functional_point === 'Y' && record.checked === 1) {
        this.condition_car_top = false;
        break;
      }
    }

    for (const record of this.records) {
     
      if (record.description === "IDENTIFICATION OF CAR TOP" && record.functional_point === 'Y' && record.checked === 1) {
        this.identification_car_top = false;
        break;
      }
    }

    for (const record of this.records) {
     
      if (record.description === "SAFE ACCESS" && record.functional_point === 'Y' && record.checked === 1) {
        this. safe_access= false;
        break;
      }
    }

    for (const record of this.records) {
     
      if (record.description === "POWER MAIN SWITCH CONDITION " && record.functional_point === 'Y' && record.checked === 1) {
        this.main_switch = false;
        break;
      }
    }

    

    for (const record of this.records) {
     
      if (record.description ==="EQUIPMENTS EARTHING AS PER STANDARD" && record.functional_point === 'Y' && record.checked === 1) {
        this.equipments_earthing= false;
        break;
      }
    }

    for (const record of this.records) {
     
      if (record.description === "IDENTIFICATION OF EQUIPMENTS" && record.functional_point === 'Y' && record.checked === 1) {
        this.equipments = false;
        break;
      }
    }

    for (const record of this.records) {
     
      if (record.description === "MACHINE SHEAVE AND ROPE CONDITION" && record.functional_point === 'Y' && record.checked === 1) {
        this.machine_sheave = false;
        break;
      }
    }

    for (const record of this.records) {
     
      if (record.description === "ANY ABNORMAL NOISE IN MACHINE" && record.functional_point === 'Y' && record.checked === 1) {
        this.abnormal_noise = false;
        break;
      }
    }
    for (const record of this.records) {
     
      if (record.description ==="ANY ABNORMAL HEAT IN MACHINE "  && record.functional_point === 'Y' && record.checked === 1) {
        this.abnormal_heat = false;
        break;
      }
    }
    for (const record of this.records) {
     
      if (record.description === "OPERATION OF GOVERNOR & SAFETY GEAR" && record.functional_point === 'Y' && record.checked === 1) {
        this.rope_condition = false;
        break;
      }
    }
    for (const record of this.records) {
     
      if (record.description === "FUNCTIONAL GOVERNOR OVERSPEED SWITCH" && record.functional_point === 'Y' && record.checked === 1) {
        this.overspeed = false;
        break;
      }
    }
    for (const record of this.records) {
     
      if (record.description === "MANUAL RESCUE OPERATION" && record.functional_point === 'Y' && record.checked === 1) {
        this.manual_brake = false;
        break;
      }
    }
    for (const record of this.records) {
     
      if (record.description === "MANUAL BRAKE RELEASE INSTRUCTIONS" && record.functional_point === 'Y' && record.checked === 1) {
        this.instruction = false;
        break;
      }
    }
    for (const record of this.records) {
     
      if (record.description === "LIGHTING OF MACHINE ROOM" && record.functional_point === 'Y' && record.checked === 1) {
        this.lighting = false;
        break;
      }
    }
    for (const record of this.records) {
     
      if (record.description === "FUNCTIONAL STOP SWITCHES MCR (IF APPLICABLE)" && record.functional_point === 'Y' && record.checked === 1) {
        this.mcrswitch = false;
        break;
      }
    }
    for (const record of this.records) {
     
      if (record.description === "FUNCTIONAL CONTROLLER INSPECTION SWITCHES" && record.functional_point === 'Y' && record.checked === 1) {
        this.controller = false;
        break;
      }
    }

  }

  fetchSignature() {
    const name = sessionStorage.getItem('UserName') as string;
    // console.log('inspector name',this.name);
    this.http.get(`${environment.serverUrl}signature/` + name, { responseType: 'blob' })      .subscribe((data: Blob) => {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          this.signature = event.target.result;
        };
        reader.readAsDataURL(data);
      }, error => {
        console.error('Error fetching signature:', error);
      });
  }
  
  ngAfterViewInit(): void {
    // Ensure popupCanvas is now initialized and accessible
    if (this.popupCanvas && this.popupCanvas.nativeElement) {
      console.log('Canvas initialized:', this.popupCanvas.nativeElement);
    } else {
      console.error('Canvas element not found.');
    }
  }

  
  handleButtonClick(): void {
    this.isDialogVisible = true;
  }

  closeDialog(): void {
    this.isDialogVisible = false;
  }

  saveSignature(): void {
    const canvas = this.popupCanvas.nativeElement;
    const image = canvas.toDataURL('image/png');
    console.log('Saved signature:', image);
    this.savedSignature = image; // Save the signature to your data structure or service

    this.closeDialog();
  }

  handleMouseDown(event: MouseEvent): void {
    const canvas = this.popupCanvas.nativeElement;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const ctx = canvas.getContext('2d')!;
    ctx.beginPath();
    ctx.moveTo(x, y);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const moveX = moveEvent.clientX - rect.left;
      const moveY = moveEvent.clientY - rect.top;
      ctx.lineTo(moveX, moveY);
      ctx.stroke();
    };

    const handleMouseUp = () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
  }

  handleTouchStart(event: TouchEvent): void {
    event.preventDefault(); // Prevent scrolling on touch devices

    const canvas = this.popupCanvas.nativeElement;
    const rect = canvas.getBoundingClientRect();
    const x = event.touches[0].clientX - rect.left;
    const y = event.touches[0].clientY - rect.top;

    const ctx = canvas.getContext('2d')!;
    ctx.beginPath();
    ctx.moveTo(x, y);

    const handleTouchMove = (moveEvent: TouchEvent) => {
      event.preventDefault();
      const moveX = moveEvent.touches[0].clientX - rect.left;
      const moveY = moveEvent.touches[0].clientY - rect.top;
      ctx.lineTo(moveX, moveY);
      ctx.stroke();
    };

    const handleTouchEnd = () => {
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };

    canvas.addEventListener('touchmove', handleTouchMove);
    canvas.addEventListener('touchend', handleTouchEnd);
  }

  clearCanvas(): void {
    const canvas = this.popupCanvas.nativeElement;
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
  }

  generated_PDF() {
    const contentToConvert = this.contentToConvert.nativeElement.innerHTML;
  
    // Get the username from sessionStorage
    const name = sessionStorage.getItem('UserName');
   



  
    // Define HTML content with CSS styles
    const htmlContent = `
      <style>
      @font-face {
  font-family: 'Calibri';
  src: url('/assets/fonts/calibri/calibri-regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

*{
font-family:'Calibri';
}
       .logo1 {
        top: 1px;
  left: 0;
  width: 100px; /* Further reduced width */
  height: auto;
  margin-top: -10px;
}

.fixed {
  white-space: nowrap;
}

body {
  font-size: 10px; /* Further reduced font size */
  font-family: 'Calibri';
}

.signature-image {
  width: 80px; /* Further reduced width */
  height: auto;
}

/* Overlay styles */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog {
  background: #fff;
  padding: 5px; /* Further reduced padding */
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
}

.close_button {
  background: #ff5c5c;
  border: none;
  color: white;
  font-size: 10px; /* Further reduced font size */
  width: 20px; /* Further reduced size */
  height: 20px;
  border-radius: 50%;
  position: absolute;
  top: 5px; /* Adjusted for new size */
  right: 5px; /* Adjusted for new size */
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

close_button i {
  pointer-events: none;
}

h2 {
  margin-top: 0;
  font-size: 16px; /* Further reduced font size */
}

p {
  margin-bottom: 5px; /* Further reduced margin */
}

canvas {
  border: 1px solid #ccc;
  display: block;
  margin-bottom: 10px; /* Reduced margin */
}

.button-container {
  text-align: center;
}

.new_button, .button {
  padding: 3px 5px; /* Further reduced padding */
  margin: 2px; /* Further reduced margin */
  cursor: pointer;
  border-radius: 8px;
  font-size: 10px; /* Further reduced font size */
}

.new_button1 {
  background-color: #148d3d;
  color: white;
  border: none;
}

.new_button {
  background-color: #000;
  color: white;
  border: none;
}

.button {
  background-color: #f44336;
  color: white;
  border: none;
}

.button:hover {
  background-color: #da190b;
}

.blur {
  filter: blur(5px);
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9998;
}

.popup-container .btn_close, .popup-container .redirect {
  padding: 5px 10px; /* Reduced padding */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 10px; /* Reduced font size */
}

.popup-container .btn_close {
  background-color: #a82922;
  color: white;
  margin-top: 20px; /* Reduced margin-top */
}

.popup-container .redirect {
  background-color: #007bff;
  color: white;
  margin-top: 10px; /* Reduced margin-top */
}

.popup-container .btn_close:hover {
  background-color: #881616;
}

.popup-container .redirect:hover {
  background-color: #0056b3;
}

// .container {
//   position: fixed;
//   bottom: -49px;
//   right: -6px;
//   text-align: right;
//   z-index: 999;
// }

.popup-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 10px; /* Reduced padding */
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.popup-container p {
  margin-bottom: 5px; /* Reduced margin */
}

@media print {
  .button-container {
      display: none;
  }
}


.doc_no {
  font-size: 8px;
  font-weight: bolder;
  padding: 5px;
  border-radius: 5px;
  // position: fixed;
  bottom: 0;
  width: 100%;
  text-align: right;
}


.centered-cell {
  text-align: center; /* Horizontally centers content */
  vertical-align: middle; /* Vertically centers content */
  padding: 10px; /* Adjust padding as needed */
}
.system-generated {
  text-align: center; /* Center the text horizontally */
 
  font-style: calibri; /* Make the text italic to indicate it's system-generated */
  color: #999; /* Light gray color for a subtle appearance */
  font-size: 10px;
  padding: 10px; /* Add padding for better spacing */
 
}



table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #4f4a4a;
  padding: 1px; /* Further reduced padding */
  text-align: left;
  font-family: 'calibri';
}

.vertical-line {
  border-right: 1px solid black;
  padding-right: 1px; /* Further reduced padding */
}

.key_head {
  text-align: center;
  background-color: rgb(178, 175, 175);
  font-size: 15px; /* Further reduced font size */
}

.first {
  font-weight: bolder;
  font-family: 'Calibri';
}

b {
  font-family: 'Calibri';
  }


.second {
  font-weight: lighter;
  font-family: 'Calibri';
}
.center_all td,
.center_all tr {
  text-align: center; /* Center text horizontally */
  vertical-align: middle; /* Center text vertically in the cells */
}



.field_namebold td {
  text-align: center; /* Center align text */
  vertical-align: middle; /* Center vertically */
 
}


.pit_center1, .pit_center2 {
  text-align: center;
  background-color: rgb(178, 175, 175);
  font-size: 15px; /* Further reduced font size */
}
.pit1 {
  text-align: left;
}

.pit2 {
  text-decoration: underline;
}

.hr {
  color: black;
}
  .system-generated {
  font-size: 10px; /* Adjust the font size as needed */
  font-weight: bold; /* Make the text bold */
  color: #333; /* Dark gray color for the text */
  text-align: center; /* Center align the text */
  margin: 20px 0; /* Add some space above and below */
  position: relative; /* Position for pseudo-elements if needed */
}

.system-generated i {
 color: #333; /* Dark gray color for the text */
  // margin-right: 10px; /* Space between the icon and the text */
  font-size: 10px; /* Icon size */
  vertical-align: middle; /* Align icon with text */
}

.legend-line {
  border-top: 1px solid black;
  margin-top: 2px; /* Reduced margin */
  margin-bottom: 2px; /* Reduced margin */
}

@media print {
  .key_head, .pit_center1, .pit_center2 {
      -webkit-print-color-adjust: exact;
      color-adjust: exact;
  }
}

.big-checkbox {
  width: 10px; /* Further reduced size */
  height: 10px; /* Further reduced size */
  border: 2px solid #000;
  border-radius: 4px;
}



/* Overlay styles */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
}

.close_button {
  background: #ff5c5c;
  border: none;
  color: white;
  font-size: 16px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.close_button i {
  pointer-events: none; /* ensures the icon doesn't interfere with the button click */
}



canvas {
  border: 1px solid #ccc;
  display: block;
  margin-bottom: 20px;
}

.button-container {
  text-align: center;
}

.new_button, .button {
  padding: 10px 20px;
  margin: 0 10px;
  cursor: pointer;
  border-radius:8px; /* Rounded corners */
}

.new_button1{
  background-color: #148d3d;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 0 10px;
  cursor: pointer;
  font-size: 15px;
  border-radius:8px; /* Rounded corners */
}

.new_button{
  background-color: #000000;
  color: white;

  border: none;
}


.button {
  background-color: #f44336;
  color: white;
  border: none;
  font-size: 15px;
}

.button:hover {
  background-color: #da190b;
}


 

.blur {
  /* Your blur effect CSS styles */
  filter: blur(5px); /* Example: applying a 5px blur effect */
}


  .popup-overlay {
    position: fixed;
    align-items: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black background */
    z-index: 9998; /* Ensure it's below the popup */
  }
  .popup-container .btn_close{
    padding: 10px 20px;
    margin-right: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: #a82922; /* Blue color for buttons */
    color: white;

  }
.popup-container .redirect {
  padding: 10px 20px;
  margin-right: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #007bff; /* Blue color for buttons */
  color: white;
}

.popup-container .btn_close:hover{
    background-color: #881616; /* Darker shade of blue on hover */

}
.popup-container .redirect:hover {
  background-color: #0056b3; /* Darker shade of blue on hover */
}

.popup-container .btn_close {
  margin-top: 100px; /* Adjust margin-top as needed */
}

.popup-container .redirect {
  margin-top: 20px; /* Adjust margin-top as needed */
}

@page {
  size: letter;
  margin-top: 2mm;
  margin-right: 5mm;
  margin-bottom: 2mm;
  margin-left: 5mm;
}

.container {
    position: fixed;
    bottom: -19px; /* Adjust the distance from the bottom */
    right: -6px; /* Adjust the distance from the right */
    text-align: right; /* Align text to the right */
    z-index: 999; /* Ensure it's above other elements */
}

.popup-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border: 1px solid #ccc;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .popup-container p {
    margin-bottom: 10px;
  }
  


@media print {
    .button-container {
      display: none;
    }
  }
   
  
 
  
  .content {
    page-break-after: always; /* Ensure content breaks across pages */
  }
      </style>
      <body>${contentToConvert}</body>
    `;


   // Define the body with the building_name included
const body = {
  htmlContent: htmlContent,
  unit: this.unit,
  document_id: this.document_id,
  contract: this.contract,
  inspector_name: this.name,
  building_name: this.building_name // Include only building_name
};
  
// API URL
const apiUrl = `${environment.serverUrl}api/keyabstract_store`;
console.log("contract number is",this.contract)
console.log("unit is",this.unit)
console.log("document id is",this.document_id)
console.log("inspecter name is",this.name)
console.log("building name is",this.inf_26.building_name)
// console.log(this.inf_26)


// Function to download PDF
const downloadPDF = () => {
  // Show confirmation dialog
  const confirmDownload = window.confirm("Do you want to download the PDF?");

  if (confirmDownload) {
      // Send the request to store the PDF using the body object
      this.http.post(apiUrl, body, { responseType: 'blob' })
          .subscribe((response: Blob) => {
              const blob = new Blob([response], { type: 'application/pdf' });
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `${this.unit}-${this.building_name}-key-abstract.pdf`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              window.URL.revokeObjectURL(url);
          }, error => {
              console.error('PDF generation failed', error);
          });
  }
};

// Call downloadPDF to trigger the download
downloadPDF();
}
  }

