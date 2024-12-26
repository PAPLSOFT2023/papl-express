
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-spec-crud',
  templateUrl: './spec-crud.component.html',
  styleUrls: ['./spec-crud.component.scss']
})
export class SpecCrudComponent {


  searchQuery: string = '';

  
  
  shouldDisplayTable(headerText: string): boolean {
    return this.searchQuery ? headerText.toLowerCase().includes(this.searchQuery.toLowerCase()) : true;
  }

  searchTables(): void {
    // This can be used to trigger any other custom logic you need when the search button is clicked
  }


  items: any[] = [];
  items1: any[] = [];
  equipment: any[]=[];
  usage:any[]=[];
  location:any[]=[];
  no_machine_room:any[]=[];
  machine_room:any[]=[];
  controller_drive_type:any[]=[];
  type_of_operation:any[]=[];
  grouping_type:any[]=[];
  traction_category:any[]=[];
  rope_wrap_details:any[]=[];
  machine_type:any[]=[];
  type_of_roping:any[]=[];
  type_of_motor:any[]=[];
  door_operator:any[]=[];
  type_of_openings:any[]=[];
  car_operating_panels:any[]=[];
  car_indicator_type:any[]=[];
  multimedia_display:any[]=[];
  cabin_fans:any[]=[];
  type_of_call_buttons:any[]=[];
  stop_button:any[]=[];
  service_cabinet:any[]=[];
  voice_announcement:any[]=[];
  cabin_bumper:any[]=[];
  auto_attendant:any[]=[];
  auto_independant:any[]=[];
  non_stop:any[]=[];
  fan_switch:any[]=[];
  hall_indicator_type:any[]=[];
  hall_laterns:any[]=[];
  arrival_chime:any[]=[];
  no_of_risers_at_main_lobby:any[]=[];
  no_of_risers_at_other_floors:any[]=[];
  hall_call_type_at_main_lobby:any[]=[];
  hall_call_type_at_all_floors:any[]=[];
  no_of_car_buffers:any[]=[];
  type_of_car_buffers:any[]=[];
  no_of_cwt_buffer:any[]=[];
  type_of_cwt_buffer:any[]=[];
  manual_rescue:any[]=[];
  e_light:any[]=[];
  e_alarm:any[]=[];
  e_intercom:any[]=[];
  ard_operation:any[]=[];
  ard_audio:any[]=[];
  ard_visuals:any[]=[];
  fireman_operation:any[]=[];
  fireman_emerg_return:any[]=[];
  fireman_audio:any[]=[];
  fireman_visual:any[]=[];
  passenger_overload_operation:any[]=[];
  passenger_overload_audio:any[]=[];
  passenger_overload_visual:any[]=[];
  seismic_sensor_operation:any[]=[];
  vendor_master:any[]=[];  
  
  
  
  
  newItem = { type_of_cabin_fan: '' };
  newItem1 = { handrail: '' };
  newItem2 = { equipment_name: '' };
  newusage= {type_of_usage: ''};
  newlocation={machine_location:''};
  newroom={machine_room:''};
  newmroom={machineroomnew:''};
  new_controller_drive_type={controller_drive_type:''}
  newoperation={type_of_operation:''}
  newgroup={grouping_type:''}
  newtraction={traction_category:''}
  newwrap={rope_wrap_details:''}
  newtype={machine_type:''}
  newrope={type_of_roping:''}
  newmotor={type_of_motor:''}
  newdoor={door_operator:''}
  newopen={type_of_openings:''}
  newcar={car_operating_panels:''}
  newindicator={car_indicator_type:''}
  newdisplay={multimedia_display:''}
  newfan={cabin_fans:''}
  newcall={type_of_call_buttons:''}
  newstop={stop_button:''}
  newcabinet={service_cabinet:''}
  newvoice={voice_announcement:''}
  newbumper={cabin_bumper:''}
  newattendant={auto_attendant:''}
  newindependant={auto_independant:''}
  newnon={non_stop:''}
  newswitch={fan_switch:''}
  newhall={hall_indicator_type:''}
  newlaterns={hall_laterns:''}
  newchime={arrival_chime:''}
  newrisers={no_of_risers_at_main_lobby:''}
  newother={no_of_risers_at_other_floors:''}
  newlobby={hall_call_type_at_main_lobby:''}
  newfloors={hall_call_type_at_all_floors:''}
  newbuffers={no_of_car_buffers:''}
  newtypebuffers={type_of_car_buffers:''}
  newcwtbuffer={no_of_cwt_buffer:''}
  newtypecwtbuffer={type_of_cwt_buffer:''}
  newrescue={manual_rescue:''}
  newlight={e_light:''}
  newalarm={e_alarm:''}
  newintercom={e_intercom:''}
  neward={ard_operation:''}
  newardaudio={ard_audio:''}
  newardvisuals={ard_visuals:''}
  newfireman={fireman_operation:''}
  newemerg={fireman_emerg_return:''}
  newfiremanaudio={fireman_audio:''}
  newfiremanvisual={fireman_visual:''}
  newpassenger={passenger_overload_operation:''}
  newaudio={passenger_overload_audio:''}
  newvisual={passenger_overload_visual:''}
  newsensor={seismic_sensor_operation:''}
  newvendor={vendor_name:''}
  
  
  // private apiUrl = 'http://localhost:3000/api/'; 

  private apiUrl = `${environment.serverUrl}api/`; 

  
  constructor(private http: HttpClient) { }
  
  ngOnInit(): void {
    this.fetchItems();
    
  }
  
  fetchItems(): void {
    this.http.get<any[]>(this.apiUrl+'items').subscribe(data => {
      if(data)
        {
          console.log("data1",data);
          
          this.items = data;
        }
    });
  
    this.http.get<any[]>(this.apiUrl+'items1').subscribe(data => {
      if(data)
        {
          console.log("data2",data);
          
          this.items1 = data;
        }
      
    });
  
    // type_of_equipment 
    this.http.get<any[]>(this.apiUrl+'equipment').subscribe(data => {
      if(data)
        {
          console.log("equipment",data);
          
          this.equipment = data;
        }
      
    });
  
  // type_of_usage
  this.http.get<any[]>(this.apiUrl+'usage').subscribe(data => {
    if(data)
      {
        console.log("usage",data);
        
        this.usage = data;
      }
    
  });
  
  // machine_location
  this.http.get<any[]>(this.apiUrl+'location').subscribe(data => {
    if(data)
      {
        console.log("location",data);
        
        this.location = data;
      }
    
  });
  
  // no_of_machine_room
  this.http.get<any[]>(this.apiUrl+'no_machine_room').subscribe(data => {
    if(data)
      {
        console.log("no_machine_room",data);
        
        this.no_machine_room = data;
      }
    
  });
  
  //machine_room
  this.http.get<any[]>(this.apiUrl+'getmachine').subscribe(data => {
    if(data)
      {
        console.log("machine_room",data);
        
        this.machine_room = data;
      }
    
  });
  
  //controller_drive_type
  this.http.get<any[]>(this.apiUrl+'getcontroller').subscribe(data => {
    if(data)
      {
        console.log("controller_drive_type",data);
        
        this.controller_drive_type = data;
      }
    
  });
  
  //type_of_operation
  this.http.get<any[]>(this.apiUrl+'getoperation').subscribe(data => {
    if(data)
      {
        console.log("type_of_operation",data);
        
        this.type_of_operation = data;
      }
    
  });
  
  //grouping_type
  this.http.get<any[]>(this.apiUrl+'getgroup').subscribe(data => {
    if(data)
      {
        console.log("grouping_type",data);
        
        this.grouping_type = data;
      }
    
  });
  
  //traction_category
  this.http.get<any[]>(this.apiUrl+'gettraction').subscribe(data => {
    if(data)
      {
        console.log("traction_category",data);
        
        this.traction_category = data;
      }
    
  });
  
  //ropes_wrap_details
  this.http.get<any[]>(this.apiUrl+'getwrap').subscribe(data => {
    if(data)
      {
        console.log("rope_wrap_details",data);
        
        this.rope_wrap_details = data;
      }
    
  });
    
  //machine_type
  this.http.get<any[]>(this.apiUrl+'gettype').subscribe(data => {
    if(data)
      {
        console.log("machine_type",data);
        
        this.machine_type = data;
      }
    
  });
  
  
  
  //type_of_roping
  this.http.get<any[]>(this.apiUrl+'getrope').subscribe(data => {
    if(data)
      {
        console.log("type_of_roping",data);
        
        this.type_of_roping = data;
      }
    
  });
  
  
  
  //type_of_motor
  this.http.get<any[]>(this.apiUrl+'getmotor').subscribe(data => {
    if(data)
      {
        console.log("type_of_motor",data);
        
        this.type_of_motor = data;
      }
    
  });
  
  //door_operator
  this.http.get<any[]>(this.apiUrl+'getdoor').subscribe(data => {
    if(data)
      {
        console.log("door_operator",data);
        
        this.door_operator = data;
      }
    
  });
  
  
  //type_of_openings 
  this.http.get<any[]>(this.apiUrl+'getopen').subscribe(data => {
    if(data)
      {
        console.log("type_of_openings",data);
        
        this.type_of_openings = data;
      }
    
  });
  
  // car_operating_panels
  this.http.get<any[]>(this.apiUrl+'getcar').subscribe(data => {
    if(data)
      {
        console.log("car_operating_panels",data);
        
        this.car_operating_panels = data;
      }
    
  });
  
  // car_indicator_type
  this.http.get<any[]>(this.apiUrl+'getindicator').subscribe(data => {
    if(data)
      {
        console.log("car_indicator_type",data);
        
        this.car_indicator_type = data;
      }
    
  });
  
  // multimedia_display
  this.http.get<any[]>(this.apiUrl+'getdisplay').subscribe(data => {
    if(data)
      {
        console.log("multimedia_display",data);
        
        this.multimedia_display = data;
      }
    
  });
  
  this.http.get<any[]>(this.apiUrl+'getfan').subscribe(data => {
    if(data)
      {
        console.log("cabin_fans",data);
        
        this.cabin_fans = data;
      }
    
  });
  
  this.http.get<any[]>(this.apiUrl+'getcall').subscribe(data => {
    if(data)
      {
        console.log("type_of_call_buttons",data);
        
        this.type_of_call_buttons = data;
      }
    
  });
  
  
  this.http.get<any[]>(this.apiUrl+'getstop').subscribe(stop=>{
    if(stop)
      {
        console.log("stop_button",stop);
  
        this.stop_button = stop;
        
      }
  });
  
  
  this.http.get<any[]>(this.apiUrl+'getcabinet').subscribe(stop=>{
    if(stop)
      {
        console.log('service_cabinet',stop);
  
        this.service_cabinet = stop;
        
      }
  });
  
  this.http.get<any[]>(this.apiUrl+'getvoice').subscribe(stop=>{
    if(stop)
      {
        console.log('voice_announcement',stop);
        this.voice_announcement=stop;
        
      }
  });
  
  this.http.get<any[]>(this.apiUrl+'getbumper').subscribe(stop=>{
    if(stop)
      {
        console.log('cabin_bumper',stop);
        this.cabin_bumper=stop;
        
      }
  });
  
  this.http.get<any[]>(this.apiUrl+'getattendant').subscribe(stop=>{
    if(stop)
      {
        this.auto_attendant=stop;
      }
  });
  
  
  this.http.get<any[]>(this.apiUrl+'getindependant').subscribe(stop=>{
    if(stop)
      {
        this.auto_independant=stop;
      }
  });
  
  
  this.http.get<any[]>(this.apiUrl+'getnon').subscribe(stop=>{
    if(stop)
      {
        this.non_stop=stop;
      }
  });
  
  
  this.http.get<any[]>(this.apiUrl+'getswitch').subscribe(stop=>{
    if(stop)
      {
        this.fan_switch=stop;
      }
  });
  
  
  this.http.get<any[]>(this.apiUrl+'gethall').subscribe(stop=>{
    if(stop)
      {
        this.hall_indicator_type=stop;
      }
  });
  
  
  this.http.get<any[]>(this.apiUrl+'getlaterns').subscribe(stop=>{
    if(stop)
      {
        this.hall_laterns=stop;
      }
  });
  
  this.http.get<any[]>(this.apiUrl+'getchime').subscribe(stop=>{
    if(stop)
      {
        this.arrival_chime=stop;
      }
  });
  
  this.http.get<any[]>(this.apiUrl+'getrisers').subscribe(stop=>{
    if(stop)
      {
        this.no_of_risers_at_main_lobby=stop;
      }
  });
  
  
  this.http.get<any[]>(this.apiUrl+'getother').subscribe(stop=>{
    if(stop)
      {
        this.no_of_risers_at_other_floors=stop;
      }
  });
  
  
  this.http.get<any[]>(this.apiUrl+'getlobby').subscribe(stop=>{
    if(stop)
      {
        this.hall_call_type_at_main_lobby=stop;
      }
  });
  
  this.http.get<any[]>(this.apiUrl+'getfloors').subscribe(stop=>{
    if(stop)
      {
        this.hall_call_type_at_all_floors=stop;
      }
  });
  
  
  this.http.get<any[]>(this.apiUrl+'getbuffers').subscribe(stop=>{
    if(stop)
      {
        this.no_of_car_buffers=stop;
      }
  });
  
  this.http.get<any[]>(this.apiUrl+'gettypebuffers').subscribe(stop=>{
    if(stop)
      {
        this.type_of_car_buffers=stop;
      }
  });
  
  
  this.http.get<any[]>(this.apiUrl+'getcwtbuffer').subscribe(stop=>{
    if(stop)
      {
        this.no_of_cwt_buffer=stop;
      }
  });
  
  
  this.http.get<any[]>(this.apiUrl+'gettypecwtbuffer').subscribe(stop=>{
    if(stop)
      {
        this.type_of_cwt_buffer=stop;
      }
  });
  
  this.http.get<any[]>(this.apiUrl+'getrescue').subscribe(stop=>{
    if(stop)
      {
        this.manual_rescue=stop;
      }
  });
  
  this.http.get<any[]>(this.apiUrl+'getlight').subscribe(stop=>{
    if(stop)
      {
        this.e_light=stop;
      }
  });
  
  this.http.get<any[]>(this.apiUrl+'getalarm').subscribe(stop=>{
    if(stop)
      {
        this.e_alarm=stop;
      }
  });
  
  this.http.get<any[]>(this.apiUrl+'getintercom').subscribe(stop=>{
    if(stop)
      {
        this.e_intercom=stop;
      }
  });
  
  this.http.get<any[]>(this.apiUrl+'getard').subscribe(stop=>{
    if(stop)
      {
        this.ard_operation=stop;
      }
  });
  
  
  this.http.get<any[]>(this.apiUrl+'getardaudio').subscribe(stop=>{
    if(stop)
      {
        this.ard_audio=stop;
      }
  });
  
  
  this.http.get<any[]>(this.apiUrl+'getardvisuals').subscribe(stop=>{
    if(stop)
      {
        this.ard_visuals=stop;
      }
  });
  
  
  this.http.get<any[]>(this.apiUrl+'getfireman').subscribe(stop=>{
    if(stop)
      {
        this.fireman_operation=stop;
      }
  });
  
  
  
  this.http.get<any[]>(this.apiUrl+'getemerg').subscribe(stop=>{
    if(stop)
      {
        this.fireman_emerg_return=stop;
      }
  });
  
  this.http.get<any[]>(this.apiUrl+'getfiremanaudio').subscribe(stop=>{
    if(stop)
      {
        this.fireman_audio=stop;
      }
  });
  
  
  this.http.get<any[]>(this.apiUrl+'getfiremanvisual').subscribe(stop=>{
    if(stop)
      {
        this.fireman_visual=stop;
      }
  });
  
  
  this.http.get<any[]>(this.apiUrl+'getpassenger').subscribe(stop=>{
    if(stop)
      {
        this.passenger_overload_operation=stop;
      }
  });
  
  this.http.get<any[]>(this.apiUrl+'getvisual').subscribe(stop=>{
    if(stop)
      {
        this.passenger_overload_visual=stop;
      }
  });
  
  
  this.http.get<any[]>(this.apiUrl+'getsensor').subscribe(stop=>{
    if(stop)
      {
        this.seismic_sensor_operation=stop;
      }
  });
  
  
  this.http.get<any[]>(this.apiUrl+'getvendor').subscribe(stop=>{
    if(stop)
      {
        this.vendor_master=stop;
      }
  });
  

  this.http.get<any[]>(this.apiUrl+'getaudio').subscribe(stop=>{
    if(stop)
      {
        this.passenger_overload_audio=stop;
      }
  });
  
  
  
  
  
  
  }
  
  
  
  addItem(): void {
    this.http.post<any>(this.apiUrl+'items', this.newItem).subscribe(item => {
      this.items.push(item);
      this.newItem = {type_of_cabin_fan: '' }; // Reset form
    });
  
  
  }
  
  
  addItem1(): void {
    this.http.post<any>(this.apiUrl+'items1', this.newItem1).subscribe(item => {
      this.items1.push(item);
      this.newItem1 = {handrail: '' }; // Reset form
    });
  }
  
    // type_of_equipment 
  
  
  addItem2(): void {
    this.http.post<any>(this.apiUrl+'equipment', this.newItem2).subscribe(item => {
      this.equipment.push(item);
      this.newItem2 = {equipment_name: '' }; // Reset form
    });
  }
  
  addItem3(): void {
    this.http.post<any>(this.apiUrl+'usage', this.newusage).subscribe(item => {
      this.usage.push(item);
      this.newusage = {type_of_usage: '' }; // Reset form
    });
  }
  
  addlocation(): void {
    this.http.post<any>(this.apiUrl+'location', this.newlocation).subscribe(item => {
      this.location.push(item);
      this.newlocation = {machine_location: '' }; // Reset form
    });
  }
  
  addroom(): void {
    // console.log("Array value for insert ",this.newroom);
    this.http.post<any>(this.apiUrl+'addmachine', this.newroom).subscribe(item => {
      this.no_machine_room.push(item);
      this.newroom = {machine_room: '' }; // Reset form
    });
  }
  
  addmroom(): void {
    // console.log("Array value for insert ",this.newroom);
    this.http.post<any>(this.apiUrl+'addmachineroom', this.newmroom).subscribe(item => {
      this.machine_room.push(item);
      this.newmroom = {machineroomnew: '' }; // Reset form
    });
  }
  
  addcontroller(): void {
    // console.log("Array value for insert ",this.newroom);
    this.http.post<any>(this.apiUrl+'addcontroller', this.new_controller_drive_type).subscribe(item => {
      this.controller_drive_type.push(item);
      this.new_controller_drive_type = {controller_drive_type: '' }; // Reset form
    });
  }
  
  addoperation(): void {
    // console.log("Array value for insert ",this.newroom);
    this.http.post<any>(this.apiUrl+'addoperation', this.newoperation).subscribe(item => {
      this.type_of_operation.push(item);
      this.newoperation = {type_of_operation: '' }; // Reset form
    });
  }
  
  addgroup(): void {
    // console.log("Array value for insert ",this.newroom);
    this.http.post<any>(this.apiUrl+'addgroup', this.newgroup).subscribe(item => {
      this.grouping_type.push(item);
      this.newgroup = {grouping_type: '' }; // Reset form
    });
  }
  
  addtraction(): void {
    // console.log("Array value for insert ",this.newroom);
    this.http.post<any>(this.apiUrl+'addtraction', this.newtraction).subscribe(item => {
      this.traction_category.push(item);
      this.newtraction = {traction_category: '' }; // Reset form
    });
  }
  
  addwrap(): void {
    // console.log("Array value for insert ",this.newroom);
    this.http.post<any>(this.apiUrl+'addwrap', this.newwrap).subscribe(item => {
      this.rope_wrap_details.push(item);
      this.newwrap = {rope_wrap_details: '' }; // Reset form
    });
  }
  
  
  addtype(): void {
    // console.log("Array value for insert ",this.newroom);
    this.http.post<any>(this.apiUrl+'addtype', this.newtype).subscribe(item => {
      this.machine_type.push(item);
      this.newtype = {machine_type: '' }; // Reset form
    });
  }
  
  addrope(): void {
    // console.log("Array value for insert ",this.newroom);
    this.http.post<any>(this.apiUrl+'addrope', this.newrope).subscribe(item => {
      this.type_of_roping.push(item);
      this.newrope = {type_of_roping: '' }; // Reset form
    });
  }
  
  addmotor(): void {
    // console.log("Array value for insert ",this.newroom);
    this.http.post<any>(this.apiUrl+'addmotor', this.newmotor).subscribe(item => {
      this.type_of_motor.push(item);
      this.newmotor = {type_of_motor: '' }; // Reset form
    });
  }
  
  
  adddoor(): void {
    // console.log("Array value for insert ",this.newdoor);
    this.http.post<any>(this.apiUrl+'adddoor', this.newdoor).subscribe(item => {
      this.door_operator.push(item);
      this.newdoor = {door_operator: '' }; // Reset form
    });
  }
  
  addopen(): void {
    // console.log("Array value for insert ",this.newdoor);
    this.http.post<any>(this.apiUrl+'addopen', this.newopen).subscribe(item => {
      this.type_of_openings.push(item);
      this.newopen = {type_of_openings: '' }; // Reset form
    });
  }
  
  addcar(): void {
    // console.log("Array value for insert ",this.newdoor);
    this.http.post<any>(this.apiUrl+'addcar', this.newcar).subscribe(item => {
      this.car_operating_panels.push(item);
      this.newcar = {car_operating_panels: '' }; // Reset form
    });
  }
  
  addindicator(): void {
    // console.log("Array value for insert ",this.newindicator);
    this.http.post<any>(this.apiUrl+'addindicator', this.newindicator).subscribe(item => {
      this.type_of_motor.push(item);
      this.newindicator = {car_indicator_type: '' }; // Reset form
    });
  }
  
  adddisplay(): void {
    // console.log("Array value for insert ",this.newindicator);
    this.http.post<any>(this.apiUrl+'adddisplay', this.newdisplay).subscribe(item => {
      this.multimedia_display.push(item);
      this.newdisplay = {multimedia_display: '' }; // Reset form
    });
  }
  
  addfan(): void {
    // console.log("Array value for insert ",this.newindicator);
    this.http.post<any>(this.apiUrl+'addfan', this.newfan).subscribe(item => {
      this.cabin_fans.push(item);
      this.newfan = {cabin_fans: '' }; // Reset form
    });
  }
  
  addcall(): void {
    // console.log("Array value for insert ",this.newindicator);
    this.http.post<any>(this.apiUrl+'addcall', this.newcall).subscribe(item => {
      this.type_of_call_buttons.push(item);
      this.newcall = {type_of_call_buttons: '' }; // Reset form
    });
  }
  
  addstop():void{
    this.http.post<any>(this.apiUrl+'addstop',this.newstop).subscribe(item=> {
      this.stop_button.push(item);
      this.newstop ={stop_button:''};
  
  
    });
  }
  
  addcabinet():void{
    this.http.post<any>(this.apiUrl+'addcabinet',this.newcabinet).subscribe(item=>{
      this.service_cabinet.push(item);
      this.newcabinet={service_cabinet:''};
  
    });
  }
  
  addvoice():void{
    this.http.post<any>(this.apiUrl+'addvoice',this.newvoice).subscribe(item=>{
      this.voice_announcement.push(item);
      this.newvoice={voice_announcement:''};
    });
  }
  
  addbumper():void{
    this.http.post<any>(this.apiUrl+'addbumper',this.newbumper).subscribe(item=>{
      this.cabin_bumper.push(item);
      this.newbumper={cabin_bumper:''};
    });
  }
  
  addattendant():void{
    this.http.post<any>(this.apiUrl+'addattendant',this.newattendant).subscribe(item=>{
      this.auto_attendant.push(item);
      this.newattendant={auto_attendant:''};
    });
  }
  
  addindependant():void{
    this.http.post<any>(this.apiUrl+'addindependant',this.newindependant).subscribe(item=>{
      this.auto_independant.push(item);
      this.newindependant={auto_independant:''};
    });
  }
  
  addnon():void{
    this.http.post<any>(this.apiUrl+'addnon',this.newnon).subscribe(item=>{
      this.non_stop.push(item);
      this.newnon={non_stop:''};
    });
  }
  
  addswitch():void{
    this.http.post<any>(this.apiUrl+'addswitch',this.newswitch).subscribe(item=>{
      this.fan_switch.push(item);
      this.newswitch={fan_switch:''};
    });
  }
  
  addhall():void{
    this.http.post<any>(this.apiUrl+'addhall',this.newhall).subscribe(item=>{
      this.hall_indicator_type.push(item);
      this.newhall={hall_indicator_type:''};
    });
  }
  
  addlaterns():void{
    this.http.post<any>(this.apiUrl+'addlaterns',this.newlaterns).subscribe(item=>{
      this.hall_laterns.push(item);
      this.newlaterns={hall_laterns:''};
    });
  }
  
  addchime():void{
    this.http.post<any>(this.apiUrl+'addchime',this.newchime).subscribe(item=>{
      this.arrival_chime.push(item);
      this.newchime={arrival_chime:''};
    });
  }
  
  addrisers():void{
    this.http.post<any>(this.apiUrl+'addrisers',this.newrisers).subscribe(item=>{
      this.no_of_risers_at_main_lobby.push(item);
      this.newrisers={no_of_risers_at_main_lobby:''};
    });
  }
  
  
  addother():void{
    this.http.post<any>(this.apiUrl+'addother',this.newother).subscribe(item=>{
      this.no_of_risers_at_other_floors.push(item);
      this.newother={no_of_risers_at_other_floors:''};
    });
  }
  
  addlobby():void{
    this.http.post<any>(this.apiUrl+'addlobby',this.newlobby).subscribe(item=>{
      this.hall_call_type_at_main_lobby.push(item);
      this.newlobby={hall_call_type_at_main_lobby:''};
    });
  }
  
  
  addfloors():void{
    this.http.post<any>(this.apiUrl+'addfloors',this.newfloors).subscribe(item=>{
      this.hall_call_type_at_all_floors.push(item);
      this.newfloors={hall_call_type_at_all_floors:''};
    });
  }
  
  addbuffers():void{
    this.http.post<any>(this.apiUrl+'addbuffers',this.newbuffers).subscribe(item=>{
      this.no_of_car_buffers.push(item);
      this.newbuffers={no_of_car_buffers:''};
    });
  }
  
  addtypebuffers():void{
    this.http.post<any>(this.apiUrl+'addtypebuffers',this.newtypebuffers).subscribe(item=>{
      this.type_of_car_buffers.push(item);
      this.newtypebuffers={type_of_car_buffers:''};
    });
  }
  
  
  addcwtbuffer():void{
    this.http.post<any>(this.apiUrl+'addcwtbuffer',this.newcwtbuffer).subscribe(item=>{
      this.no_of_cwt_buffer.push(item);
      this.newcwtbuffer={no_of_cwt_buffer:''};
    });
  }
  
  
  addtypecwtbuffer():void{
    this.http.post<any>(this.apiUrl+'addtypecwtbuffer',this.newtypecwtbuffer).subscribe(item=>{
      this.type_of_cwt_buffer.push(item);
      this.newtypecwtbuffer={type_of_cwt_buffer:''};
    });
  }
  
  addrescue():void{
    this.http.post<any>(this.apiUrl+'addrescue',this.newrescue).subscribe(item=>{
      this.manual_rescue.push(item);
      this.newrescue={manual_rescue:''};
    });
  }
  
  
  addlight():void{
    this.http.post<any>(this.apiUrl+'addlight',this.newlight).subscribe(item=>{
      this.e_light.push(item);
      this.newlight={e_light:''};
    });
  }
  
  
  addalarm():void{
    this.http.post<any>(this.apiUrl+'addalarm',this.newalarm).subscribe(item=>{
      this.e_alarm.push(item);
      this.newalarm={e_alarm:''};
    });
  }
  
  addintercom():void{
    this.http.post<any>(this.apiUrl+'addintercom',this.newintercom).subscribe(item=>{
      this.e_intercom.push(item);
      this.newintercom={e_intercom:''};
    });
  }
  
  
  addard():void{
    this.http.post<any>(this.apiUrl+'addard',this.neward).subscribe(item=>{
      this.ard_operation.push(item);
      this.neward={ard_operation:''};
    });
  }
  
  
  addardaudio():void{
    this.http.post<any>(this.apiUrl+'addardaudio',this.newardaudio).subscribe(item=>{
      this.ard_audio.push(item);
      this.newardaudio={ard_audio:''};
    });
  }
  
  addardvisuals():void{
    this.http.post<any>(this.apiUrl+'addardvisuals',this.newardvisuals).subscribe(item=>{
      this.ard_visuals.push(item);
      this.newardvisuals={ard_visuals:''};
    });
  }
  
  addfireman():void{
    this.http.post<any>(this.apiUrl+'addfireman',this.newfireman).subscribe(item=>{
      this.fireman_operation.push(item);
      this.newfireman={fireman_operation:''};
    });
  }
  
  addemerg():void{
    this.http.post<any>(this.apiUrl+'addemerg',this.newemerg).subscribe(item=>{
      this.fireman_emerg_return.push(item);
      this.newemerg={fireman_emerg_return:''};
    });
  }
  
  addfiremanaudio():void{
    this.http.post<any>(this.apiUrl+'addfiremanaudio',this.newfiremanaudio).subscribe(item=>{
      this.fireman_audio.push(item);
      this.newfiremanaudio={fireman_audio:''};
    });
  }
  
  
  addfiremanvisual():void{
    this.http.post<any>(this.apiUrl+'addfiremanvisual',this.newfiremanvisual).subscribe(item=>{
      this.fireman_visual.push(item);
      this.newfiremanvisual={fireman_visual:''};
    });
  }
  
  
  addpassenger():void{
    this.http.post<any>(this.apiUrl+'addpassenger',this.newpassenger).subscribe(item=>{
      this.passenger_overload_operation.push(item);
      this.newpassenger={passenger_overload_operation:''};
    });
  }
  
  addvisual():void{
    this.http.post<any>(this.apiUrl+'addvisual',this.newvisual).subscribe(item=>{
      this.passenger_overload_visual.push(item);
      this.newvisual={passenger_overload_visual:''};
    });
  }
  
  addsensor():void{
    this.http.post<any>(this.apiUrl+'addsensor',this.newsensor).subscribe(item=>{
      this.seismic_sensor_operation.push(item);
      this.newsensor={seismic_sensor_operation:''};
    });
  }


  addvendor():void{
    this.http.post<any>(this.apiUrl+'addvendor',this.newvendor).subscribe(item=>{
      this.vendor_master.push(item);
      this.newvendor={vendor_name:''};
    });
  }
  
  addaudio():void{
    this.http.post<any>(this.apiUrl+'addaudio',this.newaudio).subscribe(item=>{
      this.passenger_overload_audio.push(item);
      this.newaudio={passenger_overload_audio:''};
    });
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  updateItem(id:number,type_of_cabin_fan:string): void {
    const body={id,type_of_cabin_fan}
    // console.log("hgf",id,type_of_cabin_fan)
    this.http.put<any>(this.apiUrl+'items_update', body).subscribe(updatedItem => {
      const index = this.items.findIndex(i => i.id === updatedItem.id);
      this.items[index] = updatedItem;
    console.log(updatedItem);
      
    });
  }
  
  updateItem1(id:number,handrail:string): void {
    const body={id,handrail}
    // console.log("hgf",id,type_of_cabin_fan)
    this.http.put<any>(this.apiUrl+'items_update1', body).subscribe(updatedItem1 => {
      const index = this.items.findIndex(i => i.id === updatedItem1.id);
      this.items[index] = updatedItem1;
    // console.log(updatedItem);
      
    });
  }
  
    // type_of_equipment 
  
  updateItem2(id:number,equipment_name:string): void {
    const body={id,equipment_name}
    // console.log("hgf",id,type_of_cabin_fan)
    this.http.put<any>(this.apiUrl+'equipment', body).subscribe(updatedItem2 => {
      const index = this.items.findIndex(i => i.id === updatedItem2.id);
      this.items[index] = updatedItem2;
    // console.log(updatedItem);
      
    });
  }
  
  updateItem3(id:number,type_of_usage:string): void {
    const body={id,type_of_usage}
    // console.log("hgf",id,type_of_cabin_fan)
    this.http.put<any>(this.apiUrl+'usage', body).subscribe(updatedItem3 => {
      const index = this.items.findIndex(i => i.id === updatedItem3.id);
      this.items[index] = updatedItem3;
    // console.log(updatedItem);
      
    });
  }
  
  updatelocation(id:number,machine_location:string): void {
    const body={id,machine_location}
    // console.log("hgf",id,type_of_cabin_fan)
    this.http.put<any>(this.apiUrl+'location', body).subscribe(updatelocation => {
      const index = this.items.findIndex(i => i.id === updatelocation.id);
      this.items[index] = updatelocation;
    // console.log(updatedItem);
      
    });
  }
  
  
  updateroom(id:number,machine_room:string): void {
    const body={id,machine_room}
    // console.log("hgf",id,type_of_cabin_fan)
    this.http.put<any>(this.apiUrl+'updateroom', body).subscribe(updateroom => {
      const index = this.items.findIndex(i => i.id === updateroom.id);
      this.items[index] = updateroom;
    // console.log(updatedItem);
      
    });
  }
  
  
  updatemroom(id:number,machineroomnew:string): void {
    const body={id,machineroomnew}
    // console.log("hgf",id,type_of_cabin_fan)
    this.http.put<any>(this.apiUrl+'updatemroom', body).subscribe(updatemroom => {
      const index = this.items.findIndex(i => i.id === updatemroom.id);
      this.items[index] = updatemroom;
    // console.log(updatedItem);
      
    });
  }
  
  
  updatecontroller(id:number,controller_drive_type:string): void {
    const body={id,controller_drive_type}
    // console.log("hgf",id,type_of_cabin_fan)
    this.http.put<any>(this.apiUrl+'updatecontroller', body).subscribe(updatemroom => {
      const index = this.items.findIndex(i => i.id === updatemroom.id);
      this.items[index] = updatemroom;
    // console.log(updatedItem);
      
    });
  }
  
  updateoperation(id:number,type_of_operation:string): void {
    const body={id,type_of_operation}
    // console.log("hgf",id,type_of_cabin_fan)
    this.http.put<any>(this.apiUrl+'updateoperation', body).subscribe(updatemroom => {
      const index = this.items.findIndex(i => i.id === updatemroom.id);
      this.items[index] = updatemroom;
    // console.log(updatedItem);
      
    });
  }
  
  updategroup(id:number,grouping_type:string): void {
    const body={id,grouping_type}
    // console.log("hgf",id,type_of_cabin_fan)
    this.http.put<any>(this.apiUrl+'updategroup', body).subscribe(updatemroom => {
      const index = this.items.findIndex(i => i.id === updatemroom.id);
      this.items[index] = updatemroom;
    // console.log(updatedItem);
      
    });
  }
  
  updatetraction(id:number,traction_category:string): void {
    const body={id,traction_category}
    // console.log("hgf",id,type_of_cabin_fan)
    this.http.put<any>(this.apiUrl+'updatetraction', body).subscribe(updatemroom => {
      const index = this.items.findIndex(i => i.id === updatemroom.id);
      this.items[index] = updatemroom;
    // console.log(updatedItem);
      
    });
  }
  
  updatewrap(id:number,rope_wrap_details:string): void {
    const body={id,rope_wrap_details}
    // console.log("hgf",id,type_of_cabin_fan)
    this.http.put<any>(this.apiUrl+'updatewrap', body).subscribe(updatemroom => {
      const index = this.items.findIndex(i => i.id === updatemroom.id);
      this.items[index] = updatemroom;
    // console.log(updatedItem);
      
    });
  }
  
  updatetype(id:number,machine_type:string): void {
    const body={id,machine_type}
    // console.log("hgf",id,type_of_cabin_fan)
    this.http.put<any>(this.apiUrl+'updatetype', body).subscribe(updatemroom => {
      const index = this.items.findIndex(i => i.id === updatemroom.id);
      this.items[index] = updatemroom;
    // console.log(updatedItem);
      
    });
  }
  
  updaterope(id:number,type_of_roping:string): void {
    const body={id,type_of_roping}
    // console.log("hgf",id,type_of_cabin_fan)
    this.http.put<any>(this.apiUrl+'updaterope', body).subscribe(updatemroom => {
      const index = this.items.findIndex(i => i.id === updatemroom.id);
      this.items[index] = updatemroom;
    // console.log(updatedItem);
      
    });
  }
  
  
  updatemotor(id:number,type_of_motor:string): void {
    const body={id,type_of_motor}
    // console.log("hgf",id,type_of_cabin_fan)
    this.http.put<any>(this.apiUrl+'updatemotor', body).subscribe(updatemroom => {
      const index = this.items.findIndex(i => i.id === updatemroom.id);
      this.items[index] = updatemroom;
    // console.log(updatedItem);
      
    });
  }
  
  
  updatedoor(id:number,door_operator:string): void {
    const body={id,door_operator}
    // console.log("hgf",id,type_of_cabin_fan)
    this.http.put<any>(this.apiUrl+'updatedoor', body).subscribe(updatemroom => {
      const index = this.items.findIndex(i => i.id === updatemroom.id);
      this.items[index] = updatemroom;
    // console.log(updatedItem);
      
    });
  }
  
  
  updateopen(id:number,type_of_openings:string): void {
    const body={id,type_of_openings}
    // console.log("hgf",id,type_of_cabin_fan)
    this.http.put<any>(this.apiUrl+'updateopen', body).subscribe(updatemroom => {
      const index = this.items.findIndex(i => i.id === updatemroom.id);
      this.items[index] = updatemroom;
    // console.log(updatedItem);
      
    });
  }
  
  
  updatecar(id:number,car_operating_panels:string): void {
    const body={id,car_operating_panels}
    // console.log("hgf",id,type_of_cabin_fan)
    this.http.put<any>(this.apiUrl+'updatecar', body).subscribe(updatemroom => {
      const index = this.items.findIndex(i => i.id === updatemroom.id);
      this.items[index] = updatemroom;
    // console.log(updatedItem);
      
    });
  }
  
  updateindicator(id:number,car_indicator_type:string): void {
    const body={id,car_indicator_type}
    // console.log("hgf",id,type_of_cabin_fan)
    this.http.put<any>(this.apiUrl+'updateindicator', body).subscribe(updatemroom => {
      const index = this.items.findIndex(i => i.id === updatemroom.id);
      this.items[index] = updatemroom;
    // console.log(updatedItem);
      
    });
  }
  
  updatedisplay(id:number,multimedia_display:string): void {
    const body={id,multimedia_display}
    // console.log("hgf",id,type_of_cabin_fan)
    this.http.put<any>(this.apiUrl+'updatedisplay', body).subscribe(updatemroom => {
      const index = this.items.findIndex(i => i.id === updatemroom.id);
      this.items[index] = updatemroom;
    // console.log(updatedItem);
      
    });
  }
  
  updatefan(id:number,cabin_fans:string): void {
    const body={id,cabin_fans}
    // console.log("hgf",id,type_of_cabin_fan)
    this.http.put<any>(this.apiUrl+'updatefan', body).subscribe(updatemroom => {
      const index = this.items.findIndex(i => i.id === updatemroom.id);
      this.items[index] = updatemroom;
    // console.log(updatedItem);
      
    });
  }
  
  updatecall(id:number,type_of_call_buttons:string): void {
    const body={id,type_of_call_buttons}
    // console.log("hgf",id,type_of_cabin_fan)
    this.http.put<any>(this.apiUrl+'updatecall', body).subscribe(updatemroom => {
      const index = this.items.findIndex(i => i.id === updatemroom.id);
      this.items[index] = updatemroom;
    // console.log(updatedItem);
      
    });
  }
  
  updatestop(id:number,stop_button:string): void {
    const body={id,stop_button}
    // console.log("hgf",id,type_of_cabin_fan)
    this.http.put<any>(this.apiUrl+'updatestop', body).subscribe(updatemroom => {
      const index = this.items.findIndex(i => i.id === updatemroom.id);
      this.items[index] = updatemroom;
    // console.log(updatedItem);
      
    });
  }
  
  updatecabinet(id:number,service_cabinet:string):void{
    const body={id,service_cabinet}
    this.http.put<any>(this.apiUrl+'updatecabinet',body).subscribe(updateroom =>{
      const index =this.items.findIndex(i=>i.id === updateroom.id);
      this.items[index]=updateroom;
    });
  }
  
  updatevoice(id:number,voice_announcement:string): void {
    const body={id,voice_announcement}
    // console.log("hgf",id,type_of_cabin_fan)
    this.http.put<any>(this.apiUrl+'updatevoice', body).subscribe(updatemroom => {
      const index = this.items.findIndex(i => i.id === updatemroom.id);
      this.items[index] = updatemroom;
    // console.log(updatedItem);
      
    });
  }
  
  updatebumper(id:number,cabin_bumper:string): void {
    const body={id,cabin_bumper}
    // console.log("hgf",id,type_of_cabin_fan)
    this.http.put<any>(this.apiUrl+'updatebumper', body).subscribe(updatemroom => {
      const index = this.items.findIndex(i => i.id === updatemroom.id);
      this.items[index] = updatemroom;
    // console.log(updatedItem);
      
    });
  }
  
  
  updateattendant(id:number,auto_attendant:string): void {
    const body={id,auto_attendant}
    // console.log("hgf",id,type_of_cabin_fan)
    this.http.put<any>(this.apiUrl+'updateattendant', body).subscribe(updatemroom => {
      const index = this.items.findIndex(i => i.id === updatemroom.id);
      this.items[index] = updatemroom;
    // console.log(updatedItem);
      
    });
  }
  
  updateindependant(id:number,auto_independant:string): void {
    const body={id,auto_independant}
    // console.log("hgf",id,type_of_cabin_fan)
    this.http.put<any>(this.apiUrl+'updateindependant', body).subscribe(updatemroom => {
      const index = this.items.findIndex(i => i.id === updatemroom.id);
      this.items[index] = updatemroom;
    // console.log(updatedItem);
      
    });
  }
  
  
  updatenon(id:number,non_stop:string): void {
    const body={id,non_stop}
    // console.log("hgf",id,type_of_cabin_fan)
    this.http.put<any>(this.apiUrl+'updatenon', body).subscribe(updatemroom => {
      const index = this.items.findIndex(i => i.id === updatemroom.id);
      this.items[index] = updatemroom;
    // console.log(updatedItem);
      
    });
  }
  
  updateswitch(id:number,fan_switch:string): void {
    const body={id,fan_switch}
    // console.log("hgf",id,type_of_cabin_fan)
    this.http.put<any>(this.apiUrl+'updateswitch', body).subscribe(updatemroom => {
      const index = this.items.findIndex(i => i.id === updatemroom.id);
      this.items[index] = updatemroom;
    // console.log(updatedItem);
      
    });
  }
  
  
  updatehall(id:number,hall_indicator_type:string): void {
    const body={id,hall_indicator_type}
    // console.log("hgf",id,type_of_cabin_fan)
    this.http.put<any>(this.apiUrl+'updatehall', body).subscribe(updatemroom => {
      const index = this.items.findIndex(i => i.id === updatemroom.id);
      this.items[index] = updatemroom;
    // console.log(updatedItem);
      
    });
  }
  
  updatelaterns(id:number,hall_laterns:string): void {
    const body={id,hall_laterns}
    // console.log("hgf",id,type_of_cabin_fan)
    this.http.put<any>(this.apiUrl+'updatelaterns', body).subscribe(updatemroom => {
      const index = this.items.findIndex(i => i.id === updatemroom.id);
      this.items[index] = updatemroom;
    // console.log(updatedItem);
      
    });
  }
  
  updatechime(id:number,arrival_chime:string): void {
    const body={id,arrival_chime}
    // console.log("hgf",id,type_of_cabin_fan)
    this.http.put<any>(this.apiUrl+'updatechime', body).subscribe(updatemroom => {
      const index = this.items.findIndex(i => i.id === updatemroom.id);
      this.items[index] = updatemroom;
    // console.log(updatedItem);
      
    });
  }
  
  updaterisers(id:number,no_of_risers_at_main_lobby:string): void {
    const body={id,no_of_risers_at_main_lobby}
    // console.log("hgf",id,type_of_cabin_fan)
    this.http.put<any>(this.apiUrl+'updaterisers', body).subscribe(updatemroom => {
      const index = this.items.findIndex(i => i.id === updatemroom.id);
      this.items[index] = updatemroom;
    // console.log(updatedItem);
      
    });
  }
  
  
  updateother(id:number,no_of_risers_at_other_floors:string): void {
    const body={id,no_of_risers_at_other_floors}
    // console.log("hgf",id,type_of_cabin_fan)
    this.http.put<any>(this.apiUrl+'updateother', body).subscribe(updatemroom => {
      const index = this.items.findIndex(i => i.id === updatemroom.id);
      this.items[index] = updatemroom;
    // console.log(updatedItem);
      
    });
  }
  
  
  updatelobby(id:number,hall_call_type_at_main_lobby:string): void {
    const body={id,hall_call_type_at_main_lobby}
    // console.log("hgf",id,type_of_cabin_fan)
    this.http.put<any>(this.apiUrl+'updatelobby', body).subscribe(updatemroom => {
      const index = this.items.findIndex(i => i.id === updatemroom.id);
      this.items[index] = updatemroom;
    // console.log(updatedItem);
      
    });
  }
  
  
  updatefloors(id:number,hall_call_type_at_all_floors:string): void {
    const body={id,hall_call_type_at_all_floors}
    // console.log("hgf",id,type_of_cabin_fan)
    this.http.put<any>(this.apiUrl+'updatefloors', body).subscribe(updatemroom => {
      const index = this.items.findIndex(i => i.id === updatemroom.id);
      this.items[index] = updatemroom;
    // console.log(updatedItem);
      
    });
  }
  
  
  updatebuffers(id:number,no_of_car_buffers:string): void {
    const body={id,no_of_car_buffers}
    // console.log("hgf",id,type_of_cabin_fan)
    this.http.put<any>(this.apiUrl+'updatebuffers', body).subscribe(updatemroom => {
      const index = this.items.findIndex(i => i.id === updatemroom.id);
      this.items[index] = updatemroom;
    // console.log(updatedItem);
      
    });
  }
  
  updatetypebuffers(id:number,type_of_car_buffers:string): void {
    const body={id,type_of_car_buffers}
    // console.log("hgf",id,type_of_cabin_fan)
    this.http.put<any>(this.apiUrl+'updatetypebuffers', body).subscribe(updatemroom => {
      const index = this.items.findIndex(i => i.id === updatemroom.id);
      this.items[index] = updatemroom;
    // console.log(updatedItem);
      
    });
  }
  
  updatecwtbuffer(id:number,no_of_cwt_buffer:string): void {
    const body={id,no_of_cwt_buffer}
    // console.log("hgf",id,type_of_cabin_fan)
    this.http.put<any>(this.apiUrl+'updatecwtbuffer', body).subscribe(updatemroom => {
      const index = this.items.findIndex(i => i.id === updatemroom.id);
      this.items[index] = updatemroom;
    // console.log(updatedItem);
      
    });
  }
  
  updatetypecwtbuffer(id:number,type_of_cwt_buffer:string): void {
    const body={id,type_of_cwt_buffer}
    // console.log("hgf",id,type_of_cabin_fan)
    this.http.put<any>(this.apiUrl+'updatetypecwtbuffer', body).subscribe(updatemroom => {
      const index = this.items.findIndex(i => i.id === updatemroom.id);
      this.items[index] = updatemroom;
    // console.log(updatedItem);
      
    });
  }
  
  updaterescue(id:number,manual_rescue:string): void {
    const body={id,manual_rescue}
    // console.log("hgf",id,type_of_cabin_fan)
    this.http.put<any>(this.apiUrl+'updaterescue', body).subscribe(updatemroom => {
      const index = this.items.findIndex(i => i.id === updatemroom.id);
      this.items[index] = updatemroom;
    // console.log(updatedItem);
      
    });
  }
  
  
  updatelight(id:number,e_light:string): void {
    const body={id,e_light}
    // console.log("hgf",id,type_of_cabin_fan)
    this.http.put<any>(this.apiUrl+'updatelight', body).subscribe(updatemroom => {
      const index = this.items.findIndex(i => i.id === updatemroom.id);
      this.items[index] = updatemroom;
    // console.log(updatedItem);
      
    });
  }
  
  updatealarm(id:number,e_alarm:string): void {
    const body={id,e_alarm}
    // console.log("hgf",id,type_of_cabin_fan)
    this.http.put<any>(this.apiUrl+'updatealarm', body).subscribe(updatemroom => {
      const index = this.items.findIndex(i => i.id === updatemroom.id);
      this.items[index] = updatemroom;
    // console.log(updatedItem);
      
    });
  }
  
  updateintercom(id:number,e_intercom:string): void {
    const body={id,e_intercom}
    // console.log("hgf",id,type_of_cabin_fan)
    this.http.put<any>(this.apiUrl+'updateintercom', body).subscribe(updatemroom => {
      const index = this.items.findIndex(i => i.id === updatemroom.id);
      this.items[index] = updatemroom;
    // console.log(updatedItem);
      
    });
  }
  
  updateard(id:number,ard_operation:string): void {
    const body={id,ard_operation}
    // console.log("hgf",id,type_of_cabin_fan)
    this.http.put<any>(this.apiUrl+'updateard', body).subscribe(updatemroom => {
      const index = this.items.findIndex(i => i.id === updatemroom.id);
      this.items[index] = updatemroom;
    // console.log(updatedItem);
      
    });
  }
  
  updateardaudio(id:number,ard_audio:string): void {
    const body={id,ard_audio}
    // console.log("hgf",id,type_of_cabin_fan)
    this.http.put<any>(this.apiUrl+'updateardaudio', body).subscribe(updatemroom => {
      const index = this.items.findIndex(i => i.id === updatemroom.id);
      this.items[index] = updatemroom;
    // console.log(updatedItem);
      
    });
  }
  
  updateardvisuals(id:number,ard_visuals:string): void {
    const body={id,ard_visuals}
    // console.log("hgf",id,type_of_cabin_fan)
    this.http.put<any>(this.apiUrl+'updateardvisuals', body).subscribe(updatemroom => {
      const index = this.items.findIndex(i => i.id === updatemroom.id);
      this.items[index] = updatemroom;
    // console.log(updatedItem);
      
    });
  }
  
  updatefireman(id:number,fireman_operation:string): void {
    const body={id,fireman_operation}
    // console.log("hgf",id,type_of_cabin_fan)
    this.http.put<any>(this.apiUrl+'updatefireman', body).subscribe(updatemroom => {
      const index = this.items.findIndex(i => i.id === updatemroom.id);
      this.items[index] = updatemroom;
    // console.log(updatedItem);
      
    });
  }
  
  updateemerg(id:number,fireman_emerg_return:string): void {
    const body={id,fireman_emerg_return}
    // console.log("hgf",id,type_of_cabin_fan)
    this.http.put<any>(this.apiUrl+'updateemerg', body).subscribe(updatemroom => {
      const index = this.items.findIndex(i => i.id === updatemroom.id);
      this.items[index] = updatemroom;
    // console.log(updatedItem);
      
    });
  }
  
  
  updatefiremanaudio(id:number,fireman_audio:string): void {
    const body={id,fireman_audio}
    // console.log("hgf",id,type_of_cabin_fan)
    this.http.put<any>(this.apiUrl+'updatefiremanaudio', body).subscribe(updatemroom => {
      const index = this.items.findIndex(i => i.id === updatemroom.id);
      this.items[index] = updatemroom;
    // console.log(updatedItem);
      
    });
  }
  
  
  updatefiremanvisual(id:number,fireman_visual:string): void {
    const body={id,fireman_visual}
    // console.log("hgf",id,type_of_cabin_fan)
    this.http.put<any>(this.apiUrl+'updatefiremanvisual', body).subscribe(updatemroom => {
      const index = this.items.findIndex(i => i.id === updatemroom.id);
      this.items[index] = updatemroom;
    // console.log(updatedItem);
      
    });
  }
  
  updatepassenger(id:number,passenger_overload_operation:string): void {
    const body={id,passenger_overload_operation}
    // console.log("hgf",id,type_of_cabin_fan)
    this.http.put<any>(this.apiUrl+'updatepassenger', body).subscribe(updatemroom => {
      const index = this.items.findIndex(i => i.id === updatemroom.id);
      this.items[index] = updatemroom;
    // console.log(updatedItem);
      
    });
  }
  
  updatevisual(id:number,passenger_overload_visual:string): void {
    const body={id,passenger_overload_visual}
    // console.log("hgf",id,type_of_cabin_fan)
    this.http.put<any>(this.apiUrl+'updatevisual', body).subscribe(updatemroom => {
      const index = this.items.findIndex(i => i.id === updatemroom.id);
      this.items[index] = updatemroom;
    // console.log(updatedItem);
      
    });
  }
  
  
  updatesensor(id:number,seismic_sensor_operation:string): void {
    const body={id,seismic_sensor_operation}
    // console.log("hgf",id,type_of_cabin_fan)
    this.http.put<any>(this.apiUrl+'updatesensor', body).subscribe(updatemroom => {
      const index = this.items.findIndex(i => i.id === updatemroom.id);
      this.items[index] = updatemroom;
    // console.log(updatedItem);
      
    });
  }
  


  updatevendor(id:number,vendor_name:string): void {
    const body={id,vendor_name}
    // console.log("hgf",id,type_of_cabin_fan)
    this.http.put<any>(this.apiUrl+'updatevendor', body).subscribe(updatemroom => {
      const index = this.items.findIndex(i => i.id === updatemroom.id);
      this.items[index] = updatemroom;
    // console.log(updatedItem);
      
    });
  }


  updateaudio(id:number,passenger_overload_audio:string): void {
    const body={id,passenger_overload_audio}
    // console.log("hgf",id,type_of_cabin_fan)
    this.http.put<any>(this.apiUrl+'updateaudio', body).subscribe(updatemroom => {
      const index = this.items.findIndex(i => i.id === updatemroom.id);
      this.items[index] = updatemroom;
    // console.log(updatedItem);
      
    });
  }
  
  
  
  
  
  
  
  
  
  
  
  deleteItem(id: number): void {
    this.http.delete<any>(`${this.apiUrl+'items'}/${id}`).subscribe(() => {
      this.items = this.items.filter(item => item.id !== id);
    });
   
  
  }
  
  deleteItem1(id: number): void {
    this.http.delete<any>(`${this.apiUrl+'items1'}/${id}`).subscribe(() => {
     this.items1 = this.items1.filter(item => item.id !== id);
     });
     } 
  
  
  deleteItem2(id: number): void {
    this.http.delete<any>(`${this.apiUrl+'equipment'}/${id}`).subscribe(() => {
      this.equipment = this.equipment.filter(item => item.id !== id);
    });
    }
  
  
  deleteItem3(id: number): void {
      this.http.delete<any>(`${this.apiUrl+'usage'}/${id}`).subscribe(() => {
        this.usage = this.usage.filter(item => item.id !== id);
      });
      }
  
  deleteupdate(id: number): void {
        this.http.delete<any>(`${this.apiUrl+'location'}/${id}`).subscribe(() => {
          this.location = this.location.filter(item => item.id !== id);
        });
        }
  
  
    deleteroom(id: number): void {
          this.http.delete<any>(`${this.apiUrl+'deleteroom'}/${id}`).subscribe(() => {
            this.no_machine_room = this.no_machine_room.filter(item => item.id !== id);
          });
          }
  
  deletemroom(id: number): void {
    this.http.delete<any>(`${this.apiUrl+'deletemroom'}/${id}`).subscribe(() => {
      this.machine_room = this.machine_room.filter(item => item.id !== id);
      });
      }
  
  
  
  deletecontroller(id: number): void {
    this.http.delete<any>(`${this.apiUrl+'deletecontroller'}/${id}`).subscribe(() => {
      this.controller_drive_type = this.controller_drive_type.filter(item => item.id !== id);
      });
      }
  
  
  deleteoperation(id: number): void {
    this.http.delete<any>(`${this.apiUrl+'deleteoperation'}/${id}`).subscribe(() => {
      this.type_of_operation = this.type_of_operation.filter(item => item.id !== id);
      });
      }
           
  
  deletegroup(id: number): void {
    this.http.delete<any>(`${this.apiUrl+'deletegroup'}/${id}`).subscribe(() => {
      this.grouping_type = this.grouping_type.filter(item => item.id !== id);
      });
      }      
                     
                  
  deletetraction(id: number): void {
    this.http.delete<any>(`${this.apiUrl+'deletetraction'}/${id}`).subscribe(() => {
      this.traction_category = this.traction_category.filter(item => item.id !== id);
      });
      }               
  
  deletewrap(id: number): void {
      this.http.delete<any>(`${this.apiUrl+'deletewrap'}/${id}`).subscribe(() => {
        this.rope_wrap_details = this.rope_wrap_details.filter(item => item.id !== id);
        });
        }
  
  deletetype(id: number): void {
    this.http.delete<any>(`${this.apiUrl+'deletetype'}/${id}`).subscribe(() => {
      this.machine_type = this.machine_type.filter(item => item.id !== id);
      });
      }
  
  
  deleterope(id: number): void {
    this.http.delete<any>(`${this.apiUrl+'deleterope'}/${id}`).subscribe(() => {
      this.type_of_roping = this.type_of_roping.filter(item => item.id !== id);
      });
      }
                                
  
  deletemotor(id: number): void {
    this.http.delete<any>(`${this.apiUrl+'deletemotor'}/${id}`).subscribe(() => {
      this.type_of_motor = this.type_of_motor.filter(item => item.id !== id);
      });
      }
                                    
  
  deletedoor(id: number): void {
    this.http.delete<any>(`${this.apiUrl+'deletedoor'}/${id}`).subscribe(() => {
      this.door_operator = this.door_operator.filter(item => item.id !== id);
      });
      }
                                        
  
  deleteopen(id: number): void {
    this.http.delete<any>(`${this.apiUrl+'deleteopen'}/${id}`).subscribe(() => {
      this.type_of_openings = this.type_of_openings.filter(item => item.id !== id);
      });
      }
                                           
  
  deletecar(id: number): void {
    this.http.delete<any>(`${this.apiUrl+'deletecar'}/${id}`).subscribe(() => {
      this.car_operating_panels = this.car_operating_panels.filter(item => item.id !== id);
      });
      }
                                                
  
  deleteindicator(id: number): void {
    this.http.delete<any>(`${this.apiUrl+'deleteindicator'}/${id}`).subscribe(() => {
      this.car_indicator_type = this.car_indicator_type.filter(item => item.id !== id);
      });
      }
                                                    
  
  deletedisplay(id: number): void {
    this.http.delete<any>(`${this.apiUrl+'deletedisplay'}/${id}`).subscribe(() => {
      this.multimedia_display = this.multimedia_display.filter(item => item.id !== id);
      });
      }                                                  
  
                                                                                            
  deletefan(id: number): void {
    this.http.delete<any>(`${this.apiUrl+'deletefan'}/${id}`).subscribe(() => {
      this.cabin_fans = this.cabin_fans.filter(item => item.id !== id);
      });
      }
                                                        
  
  deletecall(id: number): void {
    this.http.delete<any>(`${this.apiUrl+'deletecall'}/${id}`).subscribe(() => {
      this.type_of_call_buttons = this.type_of_call_buttons.filter(item => item.id !== id);
      });
      }                                                       
  
                                                           
  deletestop(id: number): void {
    
    this.http.delete<any>(`${this.apiUrl+'deletestop'}/${id}`).subscribe(() => {
      this.stop_button = this.stop_button.filter(item => item.id !== id);
      });
      }
  
  deletecabinet(id:number):void{
    this.http.delete<any>(`${this.apiUrl+'deletecabinet'}/${id}`).subscribe(()=>{
      this.service_cabinet =this.service_cabinet.filter(item=>item.id !== id);
    });
  }
  
  deletevoice(id: number): void {
    this.http.delete<any>(`${this.apiUrl+'deletevoice'}/${id}`).subscribe(() => {
      this.voice_announcement = this.voice_announcement.filter(item => item.id !== id);
      });
      }
  
  deletebumper(id: number): void {
    this.http.delete<any>(`${this.apiUrl+'deletebumper'}/${id}`).subscribe(() => {
      this.cabin_bumper = this.cabin_bumper.filter(item => item.id !== id);
      });
  }
  
  deleteattendant(id: number): void {
        this.http.delete<any>(`${this.apiUrl+'deleteattendant'}/${id}`).subscribe(() => {
          this.auto_attendant = this.auto_attendant.filter(item => item.id !== id);
          });
  }
  
  
  deleteindependant(id: number): void {
    this.http.delete<any>(`${this.apiUrl+'deleteindependant'}/${id}`).subscribe(() => {
      this.auto_independant = this.auto_independant.filter(item => item.id !== id);
    });
   
  }
  
  deletenon(id: number): void {
    this.http.delete<any>(`${this.apiUrl+'deletenon'}/${id}`).subscribe(() => {
      this.non_stop = this.non_stop.filter(item => item.id !== id);
    });
  }
  
  
  deleteswitch(id: number): void {
    this.http.delete<any>(`${this.apiUrl+'deleteswitch'}/${id}`).subscribe(() => {
      this.fan_switch = this.fan_switch.filter(item => item.id !== id);
    });
  }
  
  deletehall(id: number): void {
    this.http.delete<any>(`${this.apiUrl+'deletehall'}/${id}`).subscribe(() => {
      this.hall_indicator_type = this.hall_indicator_type.filter(item => item.id !== id);
    });
  }
  
  
  deletelaterns(id: number): void {
    this.http.delete<any>(`${this.apiUrl+'deletelaterns'}/${id}`).subscribe(() => {
      this.hall_laterns = this.hall_laterns.filter(item => item.id !== id);
    });
  }
  
  
  deletechime(id: number): void {
    this.http.delete<any>(`${this.apiUrl+'deletechime'}/${id}`).subscribe(() => {
      this.arrival_chime = this.arrival_chime.filter(item => item.id !== id);
    });
  }
  
  
  deleterisers(id: number): void {
    this.http.delete<any>(`${this.apiUrl+'deleterisers'}/${id}`).subscribe(() => {
      this.no_of_risers_at_main_lobby = this.no_of_risers_at_main_lobby.filter(item => item.id !== id);
    });
  }
  
  
  deleteother(id: number): void {
    this.http.delete<any>(`${this.apiUrl+'deleteother'}/${id}`).subscribe(() => {
      this.no_of_risers_at_other_floors = this.no_of_risers_at_other_floors.filter(item => item.id !== id);
    });
  }
  
  deletelobby(id: number): void {
    this.http.delete<any>(`${this.apiUrl+'deletelobby'}/${id}`).subscribe(() => {
      this.hall_call_type_at_main_lobby = this.hall_call_type_at_main_lobby.filter(item => item.id !== id);
    });
  }
  
  deletefloors(id: number): void {
    this.http.delete<any>(`${this.apiUrl+'deletefloors'}/${id}`).subscribe(() => {
      this.hall_call_type_at_all_floors = this.hall_call_type_at_all_floors.filter(item => item.id !== id);
    });
  }
  
  
  deletebuffers(id: number): void {
    this.http.delete<any>(`${this.apiUrl+'deletebuffers'}/${id}`).subscribe(() => {
      this.no_of_car_buffers = this.no_of_car_buffers.filter(item => item.id !== id);
    });
  }
  
  deletetypebuffers(id: number): void {
    this.http.delete<any>(`${this.apiUrl+'deletetypebuffers'}/${id}`).subscribe(() => {
      this.type_of_car_buffers = this.type_of_car_buffers.filter(item => item.id !== id);
    });
  }
  
  deletecwtbuffer(id: number): void {
    this.http.delete<any>(`${this.apiUrl+'deletecwtbuffer'}/${id}`).subscribe(() => {
      this.no_of_cwt_buffer = this.no_of_cwt_buffer.filter(item => item.id !== id);
    });
  }
  
  deletetypecwtbuffer(id: number): void {
    this.http.delete<any>(`${this.apiUrl+'deletetypecwtbuffer'}/${id}`).subscribe(() => {
      this.type_of_cwt_buffer = this.type_of_cwt_buffer.filter(item => item.id !== id);
    });
  }
  
  deleterescue(id: number): void {
    this.http.delete<any>(`${this.apiUrl+'deleterescue'}/${id}`).subscribe(() => {
      this.manual_rescue = this.manual_rescue.filter(item => item.id !== id);
    });
  }
  
  deletelight(id: number): void {
    this.http.delete<any>(`${this.apiUrl+'deletelight'}/${id}`).subscribe(() => {
      this.e_light = this.e_light.filter(item => item.id !== id);
    });
  }
  
  deletealarm(id: number): void {
    this.http.delete<any>(`${this.apiUrl+'deletealarm'}/${id}`).subscribe(() => {
      this.e_alarm = this.e_alarm.filter(item => item.id !== id);
    });
  }
  
  deleteintercom(id: number): void {
    this.http.delete<any>(`${this.apiUrl+'deleteintercom'}/${id}`).subscribe(() => {
      this.e_intercom = this.e_intercom.filter(item => item.id !== id);
    });
  }
  
  deleteard(id: number): void {
    this.http.delete<any>(`${this.apiUrl+'deleteard'}/${id}`).subscribe(() => {
      this.ard_operation = this.ard_operation.filter(item => item.id !== id);
    });
  }
  
  
  deleteardaudio(id: number): void {
    this.http.delete<any>(`${this.apiUrl+'deleteardaudio'}/${id}`).subscribe(() => {
      this.ard_operation = this.ard_operation.filter(item => item.id !== id);
    });
  }
  
  
  deleteardvisuals(id: number): void {
    this.http.delete<any>(`${this.apiUrl+'deleteardvisuals'}/${id}`).subscribe(() => {
      this.ard_visuals = this.ard_visuals.filter(item => item.id !== id);
    });
  }
  
  deletefireman(id: number): void {
    this.http.delete<any>(`${this.apiUrl+'deletefireman'}/${id}`).subscribe(() => {
      this.fireman_operation = this.fireman_operation.filter(item => item.id !== id);
    });
  }
  
  
  deleteemerg(id: number): void {
    this.http.delete<any>(`${this.apiUrl+'deleteemerg'}/${id}`).subscribe(() => {
      this.fireman_emerg_return = this.fireman_emerg_return.filter(item => item.id !== id);
    });
  }
  
  deletefiremanaudio(id: number): void {
    this.http.delete<any>(`${this.apiUrl+'deletefiremanaudio'}/${id}`).subscribe(() => {
      this.fireman_audio = this.fireman_audio.filter(item => item.id !== id);
    });
  }
  
  
  deletefiremanvisual(id: number): void {
    this.http.delete<any>(`${this.apiUrl+'deletefiremanvisual'}/${id}`).subscribe(() => {
      this.fireman_visual = this.fireman_visual.filter(item => item.id !== id);
    });
  }
  
  
  deletepassenger(id: number): void {
    this.http.delete<any>(`${this.apiUrl+'deletepassenger'}/${id}`).subscribe(() => {
      this.passenger_overload_operation = this.passenger_overload_operation.filter(item => item.id !== id);
    });
  }
  
  
  deletevisual(id: number): void {
    this.http.delete<any>(`${this.apiUrl+'deletevisual'}/${id}`).subscribe(() => {
      this.passenger_overload_visual = this.passenger_overload_visual.filter(item => item.id !== id);
    });
  }
  
  
  deletesensor(id: number): void {
    this.http.delete<any>(`${this.apiUrl+'deletesensor'}/${id}`).subscribe(() => {
      this.seismic_sensor_operation = this.seismic_sensor_operation.filter(item => item.id !== id);
    });
  }

  deletevendor(id: number): void {
    this.http.delete<any>(`${this.apiUrl+'deletevendor'}/${id}`).subscribe(() => {
      this.vendor_master = this.vendor_master.filter(item => item.id !== id);
    });
  }


  deleteaudio(id: number): void {
    this.http.delete<any>(`${this.apiUrl+'deleteaudio'}/${id}`).subscribe(() => {
      this.passenger_overload_audio = this.passenger_overload_audio.filter(item => item.id !== id);
    });
  }

}

