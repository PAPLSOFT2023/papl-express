
import { Component,ElementRef, ViewChild } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
// import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { DataService } from 'src/app/data.service';
import { ApicallService } from 'src/app/apicall.service';
import { inspector } from 'src/app/sidenav/nav-data';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-breif-spec',
  templateUrl: './breif-spec.component.html',
  styleUrls: ['./breif-spec.component.scss']
})
export class BreifSpecComponent {
  unit_details:any[]=[];

  isAnyInputNull(): boolean {
    return (
      !this.elevator_number ||
      !this.capacity ||
      !this.speed ||
      // !this.maintained_by ||
      // !this.oem ||
      !this.elevator_number ||
      !this.type_of_equipment ||
      !this.year_of_manufacture ||
      !this.type_of_usage ||
      !this.machine_location ||
      !this.controller_drive_type ||
      !this.controller_name_as_per_oem ||
      
      !this.type_of_operation ||
      !this.grouping_type ||
      !this.name_of_the_group ||
      !this.floor_details ||
      !this.openings ||
      !this.floor_designations ||
      !this.front_opening_floors ||
      !this.rear_opening_floors ||
      !this.non_stop_service_floors ||
      !this.emergency_stop_floors ||
      !this.rope_category ||
      !this.no_of_ropes_belts ||
      !this.rope_size ||
      !this.no_of_drive_sheave_grooves ||
      !this.ropes_wrap_details ||
      !this.type_of_roping ||
      !this.machine_type ||
      !this.kilo_watt ||
      !this.voltage ||
      !this.current_in_ampere ||
      !this.frequency ||
      !this.rpm ||
      !this.insulation_class ||
      !this.ingress_protection ||
      !this.no_of_poles ||
      !this.st_hr ||
      !this.serial_no ||
      !this.rope_dia ||
      !this.normal_speed ||
      !this.electrical_tripping_speed ||
      !this.mechanical_tripping_speed ||
      !this.door_operator ||
      !this.entrance_width ||
      !this.entrance_height ||
      !this.type_of_openings ||
      !this.cabin_width ||
      !this.cabin_height ||
      !this.no_of_car_operating_panels ||
      !this.car_indicator_type ||
      !this.multimedia_display ||
      !this.no_cabin_fans ||
      !this.type_of_cabin_fan ||
      !this.type_of_call_buttons ||
      !this.stop_button ||
      !this.service_cabinet ||
      !this.voice_announcement ||
      !this.handrail ||
      !this.cabin_bumper ||
      !this.auto_attendant ||
      !this.auto_independant ||
      !this.non_stop ||
      !this.fan_switch ||
      !this.hall_indicator_type ||
      !this.hall_laterns ||
      !this.arrival_chime ||
      !this.no_of_risers_at_main_lobby ||
      !this.no_of_risers_at_other_floors ||
      !this.hall_call_type_at_main_lobby ||
      !this.hall_call_type_at_all_floors ||
      !this.no_of_car_buffers ||
      !this.type_of_car_buffers ||
      !this.no_of_cwt_buffer ||
      !this.type_of_cwt_buffer ||
      !this.manual_rescue
    );
  }
  

  

  total_values:string[]|any|null = [];
  video: any;
  val:string | null='';
  name:string | null ='';
  document_id:string | null |any ='';
  unit_no:string|null='';
  values:string[]=[];
  units_values:any=[];
  unitNo: string='';

  



  type_of_equipment_d:string[] =[];
  type_of_usage_d:string[] =[];
  machine_location_d:string[]=[];
  machine_room_d:string[]=[];
  machine_room_new_d:string[]=[];
  Controller_Drive_Type_d:string[]=[];
  type_of_operation_d:string[]=[];
  grouping_type_d:string[]=[];
  traction_category_d:string[]=[];
  rope_wrap_details_d:string[]=[];
  type_of_roping_d:string[]=[];
  machine_type_d:string[]=[];
  type_of_motor_d:string[]=[];
  door_operator_d:string[]=[];
  type_of_opening_d:string[]=[];
  car_operating_panels_d:string[]=[];
  car_indicator_type_d:string[]=[];
  multimedia_display_d:string[]=[];
  cabin_fans_d:string[]=[];
  type_of_cabin_fan_d:string[]=[];
  type_of_call_buttons_d:string[]=[];
  stop_button_d:string[]=[];
  service_cabinet_d:string[]=[];
  voice_announcement_d:string[]=[];
  handrail_d:string[]=[];
  cabin_bumper_d:string[]=[];
  auto_attendant_d:string[]=[];
  auto_independant_d:string[]=[];
  non_stop_d:string[]=[];
  fan_switch_d:string[]=[];
  hall_indicator_type_d:string[]=[];
  hall_laterns_d:string[]=[];
  arrival_chime_d:string[]=[];
  risers_at_main_lobby_d:string[]=[];
  risers_at_other_floors_d:string[]=[];
  hall_call_type_at_main_lobby_d:string[]=[];
  hall_call_type_at_all_floors_d:string[]=[];
  no_of_car_buffers_d:string[]=[];
  type_of_car_buffers_d:string[]=[];
  no_of_cwt_buffer_d:string[]=[];
  type_of_cwt_buffer_d:string[]=[];
  manual_rescue_d:string[]=[];
  e_light_d:string[]=[];
  e_alarm_d:string[]=[];
  e_intercom_d:string[]=[];
  ard_operation_d:string[]=[];
  ard_audio_d:string[]=[];
  ard_visuals_d:string[]=[];
  fireman_operation_d:string[]=[];
  fireman_emerg_return_d:string[]=[];
  fireman_audio_d:string[]=[];
  fireman_visual_d:string[]=[];
  passenger_overload_operation_d:string[]=[];
  passenger_overload_visual_d:string[]=[];
  passenger_overload_audio_d:string[]=[];
  seismic_sensor_operation_d:string[]=[];
















  
  //breif spec variables
  service_provider:string='';
  no_of_machine_room:string='';
  machine_room:string='';
  type_of_motor:string='';
  cabin_depth:string='';
  capacity:string='';
  speed:string='';
  maintained_by:string='';
  oem:string='';
  elevator_number:string | null='';
  type_of_equipment:string='';
  year_of_manufacture:string='';
  type_of_usage:string='';
  machine_location:string='';
  controller_drive_type:string='';
  controller_name_as_per_oem:string='';
  type_of_operation:string='';
  grouping_type:string='';
  name_of_the_group:string='';
  floor_details:string='';
  openings:string='';
  floor_designations:string='';
  front_opening_floors:string='';
  rear_opening_floors:string='';
  non_stop_service_floors:string='';
  emergency_stop_floors:string='';
  rope_category:string='';
  no_of_ropes_belts:string='';
  rope_size:string='';
  no_of_drive_sheave_grooves:string='';
  ropes_wrap_details:string='';
  type_of_roping:string='';
  machine_type:string='';
  kilo_watt:string='';
  voltage:string='';
  current_in_ampere:string='';
  frequency:string='';
  rpm:string='';
  insulation_class:string='';
  ingress_protection:string='';
  no_of_poles:string='';
  st_hr:string='';
  serial_no:string='';
  rope_dia:string='';
  normal_speed:string='';
  electrical_tripping_speed:string='';
  mechanical_tripping_speed:string='';
  cwt_governor_details:boolean=false;
  door_operator:string='';
  cwt_rope_dia:string='';
  cwt_normal_speed:string='';
  cwt_electrical_tripping_speed:string='';
  cwt_mechanical_tripping_speed:string='';
  entrance_width:string='';
  entrance_height:string='';
  type_of_openings:string='';
  cabin_width:string='';
  cabin_height:string='';
  no_of_car_operating_panels:string='';
  car_indicator_type:string='';
  multimedia_display:string='';
  no_cabin_fans:string='';
  type_of_cabin_fan:string='';
  type_of_call_buttons:string='';
  stop_button:string='';
  service_cabinet:string='';
  voice_announcement:string='';
  handrail:string='';
  cabin_bumper:string='';
  auto_attendant:string='';
  auto_independant:string='';
  non_stop:string='';
  fan_switch:string='';
  hall_indicator_type:string='';
  hall_laterns:string='';
  arrival_chime:string='';
  no_of_risers_at_main_lobby:string='';
  no_of_risers_at_other_floors:string='';
  hall_call_type_at_main_lobby:string='';
  hall_call_type_at_all_floors:string='';
  no_of_car_buffers:string='';
  type_of_car_buffers:string='';
  no_of_cwt_buffer:string='';
  type_of_cwt_buffer:string='';
  e_light:string='';
  e_alarm:string='';
  e_intercom:string='';
  ard_operation:string='';
  ard_audio:string='';
  ard_visuals:string='';
  fireman_operation:string='';
  fireman_emerg_return:string='';
  fireman_audio:string='';
  fireman_visual:string='';
  passenger_overload_operation:string='';
  passenger_overload_visual:string='';
  passenger_overload_audio:string='';
  seismic_sensor_operation:string='';
  manual_rescue:string='';


  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,private dataService: ApicallService,private http :HttpClient,private router:Router){
     this.route.paramMap.subscribe(params => {
      this.val = params.get('c_no');
      console.log(this.val);
      
    });

  }
  // getValueFromSessionStorage() {
  //   let unitValues = this.sessionStorage.retrieve('unit_values');
  //   console.log(unitValues); // Do whatever you need with the value
  // }
  ngOnInit(){


    this.document_id = sessionStorage.getItem('document_id');
    console.log('document id is ',this.document_id);
    this.unit_no=sessionStorage.getItem('unit_no');
    this.elevator_number=this.unit_no;
    console.log('unit number is',this.unit_no);
    console.log('section is ',this.val);
    this.name = sessionStorage.getItem('UserName') as string;
    console.log('inspector name',this.name);
    // const unitValuesString = sessionStorage.getItem('unit_values');
    // console.log('unit values',unitValuesString);
    
    // console.log('unit value is',unitValuesString);
    const uniqueKey = `${this.document_id}_${this.unit_no}_${this.name}`;
const savedFormData = sessionStorage.getItem(uniqueKey);
if (savedFormData) {
  const formData = JSON.parse(savedFormData);

  this.service_provider = formData.service_provider || '';
  this.no_of_machine_room = formData.no_of_machine_room || '';
  this.machine_room = formData.machine_room || '';
  this.type_of_motor = formData.type_of_motor || '';
  this.cabin_depth = formData.cabin_depth || '';
  this.maintained_by = formData.maintained_by || '';
  this.capacity = formData.capacity || '';
  this.speed = formData.speed || '';
  this.oem = formData.oem || '';
  // this.elevator_number = formData.elevator_number || '';
  this.type_of_equipment = formData.type_of_equipment || '';
  this.year_of_manufacture = formData.year_of_manufacture || '';
  this.type_of_usage = formData.type_of_usage || '';
  this.machine_location = formData.machine_location || '';
  this.controller_drive_type = formData.controller_drive_type || '';
  this.controller_name_as_per_oem = formData.controller_name_as_per_oem || '';
  this.type_of_operation = formData.type_of_operation || '';
  this.grouping_type = formData.grouping_type || '';
  this.name_of_the_group = formData.name_of_the_group || '';
  this.floor_details = formData.floor_details || '';
  this.openings = formData.openings || '';
  this.floor_designations = formData.floor_designations || '';
  this.front_opening_floors = formData.front_opening_floors || '';
  this.rear_opening_floors = formData.rear_opening_floors || '';
  this.non_stop_service_floors = formData.non_stop_service_floors || '';
  this.emergency_stop_floors = formData.emergency_stop_floors || '';
  this.rope_category = formData.rope_category || '';
  this.no_of_ropes_belts = formData.no_of_ropes_belts || '';
  this.rope_size = formData.rope_size || '';
  this.no_of_drive_sheave_grooves = formData.no_of_drive_sheave_grooves || '';
  this.ropes_wrap_details = formData.ropes_wrap_details || '';
  this.type_of_roping = formData.type_of_roping || '';
  this.machine_type = formData.machine_type || '';
  this.kilo_watt = formData.kilo_watt || '';
  this.voltage = formData.voltage || '';
  this.current_in_ampere = formData.current_in_ampere || '';
  this.frequency = formData.frequency || '';
  this.rpm = formData.rpm || '';
  this.insulation_class = formData.insulation_class || '';
  this.ingress_protection = formData.ingress_protection || '';
  this.no_of_poles = formData.no_of_poles || '';
  this.st_hr = formData.st_hr || '';
  this.serial_no = formData.serial_no || '';
  this.rope_dia = formData.rope_dia || '';
  this.normal_speed = formData.normal_speed || '';
  this.electrical_tripping_speed = formData.electrical_tripping_speed || '';
  this.mechanical_tripping_speed = formData.mechanical_tripping_speed || '';
  this.cwt_governor_details = formData.cwt_governor_details || '';
  this.door_operator = formData.door_operator || '';
  this.cwt_rope_dia = formData.cwt_rope_dia || '';
  this.cwt_normal_speed = formData.cwt_normal_speed || '';
  this.cwt_electrical_tripping_speed = formData.cwt_electrical_tripping_speed || '';
  this.cwt_mechanical_tripping_speed = formData.cwt_mechanical_tripping_speed || '';
  this.entrance_width = formData.entrance_width || '';
  this.entrance_height = formData.entrance_height || '';
  this.type_of_openings = formData.type_of_openings || '';
  this.cabin_width = formData.cabin_width || '';
  this.cabin_height = formData.cabin_height || '';
  this.no_of_car_operating_panels = formData.no_of_car_operating_panels || '';
  this.car_indicator_type = formData.car_indicator_type || '';
  this.multimedia_display = formData.multimedia_display || '';
  this.no_cabin_fans = formData.no_cabin_fans || '';
  this.type_of_cabin_fan = formData.type_of_cabin_fan || '';
  this.type_of_call_buttons = formData.type_of_call_buttons || '';
  this.stop_button = formData.stop_button || '';
  this.service_cabinet = formData.service_cabinet || '';
  this.voice_announcement = formData.voice_announcement || '';
  this.handrail = formData.handrail || '';
  this.cabin_bumper = formData.cabin_bumper || '';
  this.auto_attendant = formData.auto_attendant || '';
  this.auto_independant = formData.auto_independant || '';
  this.non_stop = formData.non_stop || '';
  this.fan_switch = formData.fan_switch || '';
  this.hall_indicator_type = formData.hall_indicator_type || '';
  this.hall_laterns = formData.hall_laterns || '';
  this.arrival_chime = formData.arrival_chime || '';
  this.no_of_risers_at_main_lobby = formData.no_of_risers_at_main_lobby || '';
  this.no_of_risers_at_other_floors = formData.no_of_risers_at_other_floors || '';
  this.hall_call_type_at_main_lobby = formData.hall_call_type_at_main_lobby || '';
  this.hall_call_type_at_all_floors = formData.hall_call_type_at_all_floors || '';
  this.no_of_car_buffers = formData.no_of_car_buffers || '';
  this.type_of_car_buffers = formData.type_of_car_buffers || '';
  this.no_of_cwt_buffer = formData.no_of_cwt_buffer || '';
  this.type_of_cwt_buffer = formData.type_of_cwt_buffer || '';
  this.e_light = formData.e_light || '';
  this.e_alarm = formData.e_alarm || '';
  this.e_intercom = formData.e_intercom || '';
  this.ard_operation = formData.ard_operation || '';
  this.ard_audio = formData.ard_audio || '';
  this.ard_visuals = formData.ard_visuals || '';
  this.fireman_operation = formData.fireman_operation || '';
  this.fireman_emerg_return = formData.fireman_emerg_return || '';
  this.fireman_audio = formData.fireman_audio || '';
  this.fireman_visual = formData.fireman_visual || '';
  this.passenger_overload_operation = formData.passenger_overload_operation || '';
  this.passenger_overload_visual = formData.passenger_overload_visual || '';
  this.passenger_overload_audio = formData.passenger_overload_audio || '';
  this.seismic_sensor_operation = formData.seismic_sensor_operation || '';
  this.manual_rescue = formData.manual_rescue || '';
}

    
const equipment = `${environment.serverUrl}api/type_equipment`;
const usage = `${environment.serverUrl}api/type_usage`;
const machine = `${environment.serverUrl}api/machine_location`;
const machine_room = `${environment.serverUrl}api/machine_room`;
const machine_room_new = `${environment.serverUrl}api/machine_room_new`;
const controller_drive_type = `${environment.serverUrl}api/controller_drive_type`;
const type_of_operation = `${environment.serverUrl}api/type_of_operation`;
const grouping_type = `${environment.serverUrl}api/grouping_type`;
const traction_category = `${environment.serverUrl}api/traction_category`;
const rope_wrap_details = `${environment.serverUrl}api/rope_wrap_details`;
const type_of_roping = `${environment.serverUrl}api/type_of_roping`;
const machine_type = `${environment.serverUrl}api/machine_type`;
const type_of_motor = `${environment.serverUrl}api/type_of_motor`;
const door_operator = `${environment.serverUrl}api/door_operator`;
const type_of_opening = `${environment.serverUrl}api/type_of_opening`;
const car_operating_panels = `${environment.serverUrl}api/car_operating_panels`;
const car_indicator_type = `${environment.serverUrl}api/car_indicator_type`;
const multimedia_display = `${environment.serverUrl}api/multimedia_display`;
const cabin_fans = `${environment.serverUrl}api/cabin_fans`;
const type_of_cabin_fan = `${environment.serverUrl}api/type_of_cabin_fan`;
const type_of_call_buttons = `${environment.serverUrl}api/type_of_call_buttons`;
const stop_button = `${environment.serverUrl}api/stop_button`;
const service_cabinet = `${environment.serverUrl}api/service_cabinet`;
const voice_announcement = `${environment.serverUrl}api/voice_announcement`;
const handrail = `${environment.serverUrl}api/handrail`;
const cabin_bumper = `${environment.serverUrl}api/cabin_bumper`;
const auto_attendant = `${environment.serverUrl}api/auto_attendant`;
const auto_independant = `${environment.serverUrl}api/auto_independant`;
const non_stop = `${environment.serverUrl}api/non_stop`;
const fan_switch = `${environment.serverUrl}api/fan_switch`;
const hall_indicator_type = `${environment.serverUrl}api/hall_indicator_type`;
const hall_laterns = `${environment.serverUrl}api/hall_laterns`;
const arrival_chime = `${environment.serverUrl}api/arrival_chime`;
const risers_at_main_lobby = `${environment.serverUrl}api/risers_at_main_lobby`;
const risers_at_other_floors = `${environment.serverUrl}api/risers_at_other_floors`;
const hall_call_type_at_main_lobby = `${environment.serverUrl}api/hall_call_type_at_main_lobby`;
const hall_call_type_at_all_floors = `${environment.serverUrl}api/hall_call_type_at_all_floors`;
const no_of_car_buffers = `${environment.serverUrl}api/no_of_car_buffers`;
const type_of_car_buffers = `${environment.serverUrl}api/type_of_car_buffers`;
const no_of_cwt_buffer = `${environment.serverUrl}api/no_of_cwt_buffer`;
const type_of_cwt_buffer = `${environment.serverUrl}api/type_of_cwt_buffer`;
const manual_rescue = `${environment.serverUrl}api/manual_rescue`;
const e_light = `${environment.serverUrl}api/e_light`;
const e_alarm = `${environment.serverUrl}api/e_alarm`;
const e_intercom = `${environment.serverUrl}api/e_intercom`;
const ard_operation = `${environment.serverUrl}api/ard_operation`;
const ard_audio = `${environment.serverUrl}api/ard_audio`;
const ard_visuals = `${environment.serverUrl}api/ard_visuals`;
const fireman_operation = `${environment.serverUrl}api/fireman_operation`;
const fireman_emerg_return = `${environment.serverUrl}api/fireman_emerg_return`;
const fireman_audio = `${environment.serverUrl}api/fireman_audio`;
const fireman_visual = `${environment.serverUrl}api/fireman_visual`;
const passenger_overload_operation = `${environment.serverUrl}api/passenger_overload_operation`;
const passenger_overload_visual = `${environment.serverUrl}api/passenger_overload_visual`;
const passenger_overload_audio = `${environment.serverUrl}api/passenger_overload_audio`;
const seismic_sensor_operation = `${environment.serverUrl}api/seismic_sensor_operation`;






this.http.get<string[]>(seismic_sensor_operation).subscribe((data) => {
  this.seismic_sensor_operation_d = data;
  console.log('cwt buffers drop down ',this.seismic_sensor_operation_d);
  
 });

this.http.get<string[]>(passenger_overload_audio).subscribe((data) => {
  this.passenger_overload_audio_d = data;
  console.log('cwt buffers drop down ',this.passenger_overload_audio_d);
  
 });

this.http.get<string[]>(passenger_overload_visual).subscribe((data) => {
  this.passenger_overload_visual_d = data;
  console.log('cwt buffers drop down ',this.passenger_overload_visual_d);
  
 });

this.http.get<string[]>(passenger_overload_operation).subscribe((data) => {
  this.passenger_overload_operation_d = data;
  console.log('cwt buffers drop down ',this.passenger_overload_operation_d);
  
 });

this.http.get<string[]>(fireman_visual).subscribe((data) => {
  this.fireman_visual_d = data;
  console.log('cwt buffers drop down ',this.fireman_visual_d);
  
 });

this.http.get<string[]>(fireman_audio).subscribe((data) => {
  this.fireman_audio_d = data;
  console.log('cwt buffers drop down ',this.fireman_audio_d);
  
 });

this.http.get<string[]>(fireman_emerg_return).subscribe((data) => {
  this.fireman_emerg_return_d = data;
  console.log('cwt buffers drop down ',this.fireman_emerg_return_d);
  
 });

this.http.get<string[]>(fireman_operation).subscribe((data) => {
  this.fireman_operation_d = data;
  console.log('cwt buffers drop down ',this.fireman_operation_d);
  
 });

this.http.get<string[]>(ard_visuals).subscribe((data) => {
  this.ard_visuals_d = data;
  console.log('cwt buffers drop down ',this.ard_visuals_d);
  
 });

this.http.get<string[]>(ard_audio).subscribe((data) => {
  this.ard_audio_d = data;
  console.log('cwt buffers drop down ',this.ard_audio_d);
  
 });

this.http.get<string[]>(ard_operation).subscribe((data) => {
  this.ard_operation_d = data;
  console.log('cwt buffers drop down ',this.ard_operation_d);
  
 });

this.http.get<string[]>(e_intercom).subscribe((data) => {
  this.e_intercom_d = data;
  console.log('cwt buffers drop down ',this.e_intercom_d);
  
 });

this.http.get<string[]>(e_alarm).subscribe((data) => {
  this.e_alarm_d = data;
  console.log('cwt buffers drop down ',this.e_alarm_d);
  
 });

this.http.get<string[]>(e_light).subscribe((data) => {
  this.e_light_d = data;
  console.log('cwt buffers drop down ',this.e_light_d);
  
 });

this.http.get<string[]>(manual_rescue).subscribe((data) => {
  this.manual_rescue_d = data;
  console.log('cwt buffers drop down ',this.manual_rescue_d);
  
 });



this.http.get<string[]>(type_of_cwt_buffer).subscribe((data) => {
  this.type_of_cwt_buffer_d = data;
  console.log('cwt buffers drop down ',this.type_of_cwt_buffer_d);
  
 });


this.http.get<string[]>(no_of_cwt_buffer).subscribe((data) => {
  this.no_of_cwt_buffer_d = data;
  console.log('car buffers drop down ',this.no_of_cwt_buffer_d);
  
 });


this.http.get<string[]>(type_of_car_buffers).subscribe((data) => {
  this.type_of_car_buffers_d = data;
  console.log('car buffers drop down ',this.type_of_car_buffers_d);
  
 });

this.http.get<string[]>(no_of_car_buffers).subscribe((data) => {
  this.no_of_car_buffers_d = data;
  console.log('car buffers drop down ',this.no_of_car_buffers_d);
  
 });


this.http.get<string[]>(hall_call_type_at_all_floors).subscribe((data) => {
  this.hall_call_type_at_all_floors_d = data;
  console.log('hall call type at all floors drop down ',this.hall_call_type_at_all_floors_d);
  
 });

this.http.get<string[]>(hall_call_type_at_main_lobby).subscribe((data) => {
  this.hall_call_type_at_main_lobby_d = data;
  console.log('risers at main lobby drop down ',this.hall_call_type_at_main_lobby_d);
  
 });


this.http.get<string[]>(risers_at_other_floors).subscribe((data) => {
  this.risers_at_other_floors_d = data;
  console.log('risers at main lobby drop down ',this.risers_at_other_floors_d);
  
 });

this.http.get<string[]>(risers_at_main_lobby).subscribe((data) => {
  this.risers_at_main_lobby_d = data;
  console.log('risers at main lobby drop down ',this.risers_at_main_lobby_d);
  
 });

this.http.get<string[]>(arrival_chime).subscribe((data) => {
  this.arrival_chime_d = data;
  console.log('arrival chime drop down ',this.arrival_chime_d);
  
 });

this.http.get<string[]>(hall_laterns).subscribe((data) => {
  this.hall_laterns_d = data;
  console.log('hall laterns drop down ',this.hall_laterns_d);
  
 });

this.http.get<string[]>(hall_indicator_type).subscribe((data) => {
  this.hall_indicator_type_d = data;
  console.log('hall indicator drop down ',this.hall_indicator_type_d);
  
 });

this.http.get<string[]>(fan_switch).subscribe((data) => {
  this.fan_switch_d = data;
  console.log('fan switch drop down ',this.fan_switch_d);
  
 });

this.http.get<string[]>(non_stop).subscribe((data) => {
  this.non_stop_d = data;
  console.log('non stop drop down ',this.non_stop_d);
  
 });


this.http.get<string[]>(auto_independant).subscribe((data) => {
  this.auto_independant_d = data;
  console.log('auto independant drop down ',this.auto_independant_d);
  
 });

this.http.get<string[]>(auto_attendant).subscribe((data) => {
  this.auto_attendant_d = data;
  console.log('type of equipment drop down ',this.auto_attendant_d);
  
 });

this.http.get<string[]>(cabin_bumper).subscribe((data) => {
  this.cabin_bumper_d = data;
  console.log('type of equipment drop down ',this.cabin_bumper_d);
  
 });

this.http.get<string[]>(handrail).subscribe((data) => {
  this.handrail_d = data;
  console.log('type of equipment drop down ',this.handrail_d);
  
 });
 
this.http.get<string[]>(voice_announcement).subscribe((data) => {
  this.voice_announcement_d = data;
  console.log('type of equipment drop down ',this.voice_announcement_d);
  
 });

this.http.get<string[]>(service_cabinet).subscribe((data) => {
  this.service_cabinet_d = data;
  console.log('type of equipment drop down ',this.service_cabinet_d);
  
 });

this.http.get<string[]>(stop_button).subscribe((data) => {
  this.stop_button_d = data;
  console.log('type of equipment drop down ',this.stop_button_d);
  
 });

this.http.get<string[]>(type_of_call_buttons).subscribe((data) => {
  this.type_of_call_buttons_d = data;
  console.log('type of equipment drop down ',this.type_of_call_buttons_d);
  
 });

this.http.get<string[]>(type_of_cabin_fan).subscribe((data) => {
  this.type_of_cabin_fan_d = data;
  console.log('type of equipment drop down ',this.type_of_cabin_fan_d);
  
 });

this.http.get<string[]>(cabin_fans).subscribe((data) => {
  this.cabin_fans_d = data;
  console.log('type of equipment drop down ',this.cabin_fans_d);
  
 });

this.http.get<string[]>(multimedia_display).subscribe((data) => {
  this.multimedia_display_d = data;
  console.log('type of equipment drop down ',this.multimedia_display_d);
  
 });


this.http.get<string[]>(car_indicator_type).subscribe((data) => {
  this.car_indicator_type_d = data;
  console.log('type of equipment drop down ',this.car_indicator_type_d);
  
 });


this.http.get<string[]>(car_operating_panels).subscribe((data) => {
  this.car_operating_panels_d = data;
  console.log('type of equipment drop down ',this.car_operating_panels_d);
  
 });


this.http.get<string[]>(type_of_opening).subscribe((data) => {
  this.type_of_opening_d = data;
  console.log('type of equipment drop down ',this.type_of_opening_d);
  
 });

this.http.get<string[]>(door_operator).subscribe((data) => {
  this.door_operator_d = data;
  console.log('type of equipment drop down ',this.door_operator_d);
  
 });

this.http.get<string[]>(type_of_motor).subscribe((data) => {
  this.type_of_motor_d = data;
  console.log('type of equipment drop down ',this.type_of_motor_d);
  
 });


this.http.get<string[]>(machine_type).subscribe((data) => {
  this.machine_type_d = data;
  console.log('type of equipment drop down ',this.machine_type_d);
  
 });

this.http.get<string[]>(equipment).subscribe((data) => {
  this.type_of_equipment_d = data;
  console.log('type of equipment drop down ',this.type_of_equipment_d);
  
 });

 this.http.get<string[]>(usage).subscribe((data) => {
  this.type_of_usage_d = data;
  console.log('type of usage drop down ',this.type_of_usage_d);
  
 });

 this.http.get<string[]>(machine).subscribe((data) => {
  this.machine_location_d = data;
  console.log('machine location drop down ',this.machine_location_d);
  
 });

 this.http.get<string[]>(machine_room).subscribe((data) => {
  this.machine_room_d = data;
  console.log('machine room drop down ',this.machine_room_d);
  
 });

 this.http.get<string[]>(machine_room_new).subscribe((data) => {
  this.machine_room_new_d = data;
  console.log('machine room drop down ',this.machine_room_new_d);
  
 });

 this.http.get<string[]>(controller_drive_type).subscribe((data) => {
  this.Controller_Drive_Type_d = data;
  console.log('machine room drop down ',this.Controller_Drive_Type_d);
  
 });

 this.http.get<string[]>(type_of_operation).subscribe((data) => {
  this.type_of_operation_d = data;
  console.log('machine room drop down ',this.type_of_operation_d);
  
 });

 this.http.get<string[]>(grouping_type).subscribe((data) => {
  this.grouping_type_d = data;
  console.log('machine room drop down ',this.grouping_type_d);
  
 });


 this.http.get<string[]>(traction_category).subscribe((data) => {
  this.traction_category_d = data;
  console.log('machine room drop down ',this.traction_category_d);
  
 });

 this.http.get<string[]>(rope_wrap_details).subscribe((data) => {
  this.rope_wrap_details_d = data;
  console.log('machine room drop down ',this.rope_wrap_details_d);
  
 });


 this.http.get<string[]>(type_of_roping).subscribe((data) => {
  this.type_of_roping_d = data;
  console.log('machine room drop down ',this.type_of_roping_d);
  
 });








 

    //unit values api
   


    // if (unitValuesString) {
    //   this.units_values = JSON.parse(unitValuesString); // Parse the string into an array
    //   console.log('unit values are',this.units_values);
      
    // } else {
    //   console.error('unit_values not found in sessionStorage');
    // }
    
    const inspector = `${environment.serverUrl}api/b_spec_unit?encodedValue=${this.document_id}`;
        console.log('url is',inspector);
    
    this.http.get<any[]>(inspector) // Replace with your server endpoint
      .subscribe(data => {
        // this.unit_details = data.unit_no;
        // this.unit_details = data.map(item => item.unit_no);
        data.forEach(item => {
          const unitNos: string[] = item.unit_no.split(',');
          // Remove brackets, single quotes, and double quotes from each value and add them to the 'unit_details' array
          unitNos.forEach(unit => {
            const cleanedUnit = unit.replace(/[\[\]'"`]+/g, ''); // Remove brackets, single quotes, and double quotes
            this.unit_details.push(cleanedUnit);
          });
        });

        console.log('unit details is',this.unit_details);
        
        // console.log('breif spec is',this.breif_spec);
        
      });
 

      this.http.get<string[]>(`${environment.serverUrl}api/vendor`).subscribe((data) => {
              this.values = data;
      console.log(this.values);
      
    });

    }
  check(){
    console.log('elevator number is ',this.elevator_number);
    
  }
  fetch(unit:any){
    const values ={
      unit_no:this.unit_no,
      document_id:this.document_id
    }
    const params = new HttpParams().set('unit_no',unit ).set('document_id',this.document_id);
    this.http.get<string[]>(`${environment.serverUrl}api/breif_spec_fetch`,{params}).subscribe(      (response) => {
        // this.router.navigate(['afterlogin', 'unit',this.document_id]);
        console.log('saved successfully...!');

        this.total_values=response;
        this.service_provider=this.total_values.service_provider,
        this.no_of_machine_room=this.total_values.no_of_machine_room,
        this.machine_room = this.total_values.machine_room,
        this.type_of_motor = this.total_values.type_of_motor,
        this.capacity=this.total_values.capacity,
        this.cabin_depth =this.total_values.cabin_depth,
        this.speed=this.total_values.speed,
        this.maintained_by=this.total_values.maintained_by,
        // this.elevator_number=this.total_values.elevator_number;
        this.oem=this.total_values.oem,
        this.year_of_manufacture=this.total_values.year_of_manufacture,
        this.type_of_usage=this.total_values.type_of_usage,
        this.machine_location=this.total_values.machine_location,
        this.controller_drive_type=this.total_values.controller_driver_type,
        this.controller_name_as_per_oem=this.total_values.controller_name_as_per_oem,
        this.type_of_operation= this.total_values.type_of_operation,
        this.grouping_type = this.total_values.grouping_type,
        this.name_of_the_group=this.total_values.name_of_the_group,
        this.floor_details=this.total_values.floor_stops,
        this.openings=this.total_values.floor_opening,
        this.floor_designations = this.total_values.floor_designation,
        this.front_opening_floors=this.total_values.front_opening_floors,
        this.rear_opening_floors=this.total_values.rear_opening_floors,
        this.non_stop_service_floors =this.total_values.service_floors,
        this.emergency_stop_floors = this.total_values.emergency_stop_floors,
        this.rope_category = this.total_values.rope_category,
        this.no_of_ropes_belts = this.total_values.number_of_rope_belt,
        this.rope_size = this.total_values.rope_size,
        this.no_of_drive_sheave_grooves = this.total_values.no_of_drive_sheave_grooves,
        this.ropes_wrap_details = this.total_values.ropes_wrap_details,
        this.type_of_roping = this.total_values.type_of_roping,
        this.machine_type = this.total_values.machine_type,
        this.kilo_watt = this.total_values.motor_kilo_watt,
        this.voltage = this.total_values.motor_voltage,
        this.current_in_ampere = this.total_values.motor_current_in_ampere,
        this.frequency = this.total_values.motor_frequency,
        this.rpm = this.total_values.motor_rpm,
        this.insulation_class = this.total_values.motor_insulation_class,
        this.ingress_protection = this.total_values.motor_ingress_protection,
        this.no_of_poles = this.total_values.motor_no_of_poles,
        this.st_hr = this.total_values.motor_st_hr,
        // this.serial_no = this.total_values.motor_serial_number,
        this.rope_dia = this.total_values.car_governor_rope_dia,
        this.normal_speed = this.total_values.car_governor_normal_speed,
        this.electrical_tripping_speed = this.total_values.car_governor_electric_tripping_speed,
        this.mechanical_tripping_speed = this.total_values.car_governor_mechanical_tripping_speed	,
        this.cwt_governor_details = this.total_values.cwt_governor,
        this.cwt_rope_dia = this.total_values.cwt_governor_rope_dia,
        this.cwt_normal_speed = this.total_values.cwt_governor_normal_speed,
        this.cwt_electrical_tripping_speed = this.total_values.cwt_governor_electrical_tripping_speed,
        this.cwt_mechanical_tripping_speed = this.total_values.cwt_governor_mechanical_tripping_speed,
        this.door_operator = this.total_values.door_operator,
        console.log('door operator is',this.door_operator);
        
        this.entrance_height = this.total_values.entrance_height,
        this.entrance_width = this.total_values.entrance_width,
        this.type_of_openings = this.total_values.entrance_type_of_opening,
        this.cabin_height = this.total_values.cabin_height,
        this.cabin_width = this.total_values.cabin_width,
        this.no_of_car_operating_panels = this.total_values.no_of_cop,
        this.car_indicator_type = this.total_values.car_indicator_type,
        this.multimedia_display = this.total_values.multimedia_display,
        this.no_cabin_fans = this.total_values.no_of_cabin_fans,
        this.type_of_cabin_fan = this.total_values.type_of_cabin_fans,
        this.type_of_call_buttons = this.total_values.type_of_call_buttons,
        this.stop_button = this.total_values.car_stop_button,
        this.service_cabinet =this.total_values.car_service_cabinet,
        this.voice_announcement = this.total_values.car_voice_announcement,
        this.handrail = this.total_values.car_handrail,
        this.cabin_bumper = this.total_values.car_cabin_bumper,
        this.auto_attendant = this.total_values.car_auto_attendant,
        this.auto_independant = this.total_values.car_auto_independent,
        this.non_stop = this.total_values.car_non_stop,
        this.fan_switch = this.total_values.car_fan_switch,
        this.hall_indicator_type = this.total_values.hall_indicator_type,
        // this.hall_laterns = this.total_values.hall_lantems,
        this.hall_laterns = this.total_values.hall_lantems,
        this.arrival_chime = this.total_values.hall_arrival_chime,
        this.no_of_risers_at_main_lobby = this.total_values.no_of_risers_at_main_lobby,
        this.no_of_risers_at_other_floors = this.total_values.no_of_risers_at_other_floors,
        this.hall_call_type_at_main_lobby = this.total_values.hall_call_type_at_main_lobby,
        this.hall_call_type_at_all_floors = this.total_values.hall_call_type_at_all_floors,
        this.no_of_car_buffers = this.total_values.no_of_car_buffers,
        this.type_of_car_buffers = this.total_values.type_of_car_buffers,
        this.no_of_cwt_buffer = this.total_values.no_of_counter_weight_buffer,
        this.type_of_cwt_buffer = this.total_values.type_of_cwt_buffer,
        this.e_light = this.total_values.e_light,
        this.e_alarm = this.total_values.e_alarm,
        this.e_intercom = this.total_values.e_intercom,
        this.ard_operation = this.total_values.ard_audio,
        this.ard_audio = this.total_values.ard_audio,
        this.ard_visuals = this.total_values.ard_visual,
        this.fireman_operation = this.total_values.fireman_operation,
        this.fireman_emerg_return = this.total_values.fer,
        this.fireman_audio = this.total_values.fireman_audio,
        this.fireman_visual = this.total_values.fireman_visual,
        this.manual_rescue = this.total_values.manual_rescue,
        this.passenger_overload_operation = this.total_values.passenger_overload_operation,
        this.passenger_overload_visual = this.total_values.passenger_overload_visual,
        this.passenger_overload_audio = this.total_values.passenger_overload_audio,
        this.seismic_sensor_operation = this.total_values.seismic_sensor_operation,
        this.type_of_equipment = this.total_values.type_of_equipment







        console.log('response is',this.total_values);
        },
      (error) => {
        console.error('Error storing data', error);
      }
    );

    

  }
  savePartial(){
    const values = {
      service_provider:this.service_provider,
      no_of_machine_room:this.no_of_machine_room,
      machine_room:this.machine_room,
      type_of_motor:this.type_of_motor,
      cabin_depth:this.cabin_depth,
      inspector_name:this.name,
      document_id:this.document_id,
      unit_no:this.unit_no,
      maintained_by:this.maintained_by,
      capacity:this.capacity,
      speed:this.speed,
      
      oem:this.oem,
      elevator_number:this.elevator_number,
      type_of_equipment:this.type_of_equipment,
      year_of_manufacture:this.year_of_manufacture,
      type_of_usage:this.type_of_usage,
      machine_location:this.machine_location,
      controller_drive_type:this.controller_drive_type,
      controller_name_as_per_oem:this.controller_name_as_per_oem,
      type_of_operation:this.type_of_operation,
      grouping_type:this.grouping_type,
      name_of_the_group:this.name_of_the_group,
      floor_details:this.floor_details,
      openings:this.openings,
      floor_designations:this.floor_designations,
      front_opening_floors:this.front_opening_floors,
      rear_opening_floors:this.rear_opening_floors,
      non_stop_service_floors:this.non_stop_service_floors,
      emergency_stop_floors:this.emergency_stop_floors,
      rope_category:this.rope_category,
      no_of_ropes_belts:this.no_of_ropes_belts,
      rope_size:this.rope_size,
      no_of_drive_sheave_grooves:this.no_of_drive_sheave_grooves,
      ropes_wrap_details:this.ropes_wrap_details,
      type_of_roping:this.type_of_roping,
      machine_type:this.machine_type,
      kilo_watt:this.kilo_watt,
      voltage:this.voltage,
      current_in_ampere:this.current_in_ampere,
      frequency:this.frequency,
      rpm:this.rpm,
      insulation_class:this.insulation_class,
      ingress_protection:this.ingress_protection,
      no_of_poles:this.no_of_poles,
      st_hr:this.st_hr,
      serial_no:this.serial_no,
      rope_dia:this.rope_dia,
      normal_speed:this.normal_speed,
      electrical_tripping_speed:this.electrical_tripping_speed,
      mechanical_tripping_speed:this.mechanical_tripping_speed,
      cwt_governor_details:this.cwt_governor_details,
      door_operator:this.door_operator,
    
      
      cwt_rope_dia:this.cwt_rope_dia,
      cwt_normal_speed:this.cwt_normal_speed,
      cwt_electrical_tripping_speed:this.cwt_electrical_tripping_speed,
      cwt_mechanical_tripping_speed:this.cwt_mechanical_tripping_speed,
      entrance_width:this.entrance_width,
      entrance_height:this.entrance_height,
      type_of_openings:this.type_of_openings,
      cabin_width:this.cabin_width,
      cabin_height:this.cabin_height,
      no_of_car_operating_panels:this.no_of_car_operating_panels,
      car_indicator_type:this.car_indicator_type,
      multimedia_display:this.multimedia_display,
      no_cabin_fans:this.no_cabin_fans,
      type_of_cabin_fan:this.type_of_cabin_fan,
      type_of_call_buttons:this.type_of_call_buttons,
      stop_button:this.stop_button,
      service_cabinet:this.service_cabinet,
      voice_announcement:this.voice_announcement,
      handrail:this.handrail,
      cabin_bumper:this.cabin_bumper,
      auto_attendant:this.auto_attendant,
      auto_independant:this.auto_independant,
      non_stop:this.non_stop,
      fan_switch:this.fan_switch,
      hall_indicator_type:this.hall_indicator_type,
      hall_laterns:this.hall_laterns,
      arrival_chime:this.arrival_chime,
      no_of_risers_at_main_lobby:this.no_of_risers_at_main_lobby,
      no_of_risers_at_other_floors:this.no_of_risers_at_other_floors,
      hall_call_type_at_main_lobby:this.hall_call_type_at_main_lobby,
      hall_call_type_at_all_floors:this.hall_call_type_at_all_floors,
      no_of_car_buffers:this.no_of_car_buffers,
      type_of_car_buffers:this.type_of_car_buffers,
      no_of_cwt_buffer:this.no_of_cwt_buffer,
      type_of_cwt_buffer:this.type_of_cwt_buffer,
      e_light:this.e_light,
      e_alarm:this.e_alarm,
      e_intercom:this.e_intercom,
      ard_operation:this.ard_operation,
      ard_audio:this.ard_audio,
      ard_visuals:this.ard_visuals,
      fireman_operation:this.fireman_operation,
      fireman_emerg_return:this.fireman_emerg_return,
      fireman_audio:this.fireman_audio,
      fireman_visual:this.fireman_visual,
      passenger_overload_operation:this.passenger_overload_operation,
      passenger_overload_visual:this.passenger_overload_visual,
      passenger_overload_audio:this.passenger_overload_audio,
      seismic_sensor_operation:this.seismic_sensor_operation,
      manual_rescue:this.manual_rescue 

    }
    const uniqueKey = `${this.document_id}_${this.unit_no}_${this.name}`;
    sessionStorage.setItem(uniqueKey, JSON.stringify(values));
    alert('Partially data saved successfully!');
    this.router.navigate(['afterlogin', 'unit', this.document_id]);

  }

  Submit1(){
    console.log(this.manual_rescue);
    
 
    const values = {
      service_provider:this.service_provider,
      no_of_machine_room:this.no_of_machine_room,
      machine_room:this.machine_room,
      type_of_motor:this.type_of_motor,
      cabin_depth:this.cabin_depth,
      inspector_name:this.name,
      document_id:this.document_id,
      unit_no:this.unit_no,
      maintained_by:this.maintained_by,
      capacity:this.capacity,
      speed:this.speed,
      
      oem:this.oem,
      elevator_number:this.elevator_number,
      type_of_equipment:this.type_of_equipment,
      year_of_manufacture:this.year_of_manufacture,
      type_of_usage:this.type_of_usage,
      machine_location:this.machine_location,
      controller_drive_type:this.controller_drive_type,
      controller_name_as_per_oem:this.controller_name_as_per_oem,
      type_of_operation:this.type_of_operation,
      grouping_type:this.grouping_type,
      name_of_the_group:this.name_of_the_group,
      floor_details:this.floor_details,
      openings:this.openings,
      floor_designations:this.floor_designations,
      front_opening_floors:this.front_opening_floors,
      rear_opening_floors:this.rear_opening_floors,
      non_stop_service_floors:this.non_stop_service_floors,
      emergency_stop_floors:this.emergency_stop_floors,
      rope_category:this.rope_category,
      no_of_ropes_belts:this.no_of_ropes_belts,
      rope_size:this.rope_size,
      no_of_drive_sheave_grooves:this.no_of_drive_sheave_grooves,
      ropes_wrap_details:this.ropes_wrap_details,
      type_of_roping:this.type_of_roping,
      machine_type:this.machine_type,
      kilo_watt:this.kilo_watt,
      voltage:this.voltage,
      current_in_ampere:this.current_in_ampere,
      frequency:this.frequency,
      rpm:this.rpm,
      insulation_class:this.insulation_class,
      ingress_protection:this.ingress_protection,
      no_of_poles:this.no_of_poles,
      st_hr:this.st_hr,
      serial_no:this.serial_no,
      rope_dia:this.rope_dia,
      normal_speed:this.normal_speed,
      electrical_tripping_speed:this.electrical_tripping_speed,
      mechanical_tripping_speed:this.mechanical_tripping_speed,
      cwt_governor_details:this.cwt_governor_details,
      door_operator:this.door_operator,
    
      
      cwt_rope_dia:this.cwt_rope_dia,
      cwt_normal_speed:this.cwt_normal_speed,
      cwt_electrical_tripping_speed:this.cwt_electrical_tripping_speed,
      cwt_mechanical_tripping_speed:this.cwt_mechanical_tripping_speed,
      entrance_width:this.entrance_width,
      entrance_height:this.entrance_height,
      type_of_openings:this.type_of_openings,
      cabin_width:this.cabin_width,
      cabin_height:this.cabin_height,
      no_of_car_operating_panels:this.no_of_car_operating_panels,
      car_indicator_type:this.car_indicator_type,
      multimedia_display:this.multimedia_display,
      no_cabin_fans:this.no_cabin_fans,
      type_of_cabin_fan:this.type_of_cabin_fan,
      type_of_call_buttons:this.type_of_call_buttons,
      stop_button:this.stop_button,
      service_cabinet:this.service_cabinet,
      voice_announcement:this.voice_announcement,
      handrail:this.handrail,
      cabin_bumper:this.cabin_bumper,
      auto_attendant:this.auto_attendant,
      auto_independant:this.auto_independant,
      non_stop:this.non_stop,
      fan_switch:this.fan_switch,
      hall_indicator_type:this.hall_indicator_type,
      hall_laterns:this.hall_laterns,
      arrival_chime:this.arrival_chime,
      no_of_risers_at_main_lobby:this.no_of_risers_at_main_lobby,
      no_of_risers_at_other_floors:this.no_of_risers_at_other_floors,
      hall_call_type_at_main_lobby:this.hall_call_type_at_main_lobby,
      hall_call_type_at_all_floors:this.hall_call_type_at_all_floors,
      no_of_car_buffers:this.no_of_car_buffers,
      type_of_car_buffers:this.type_of_car_buffers,
      no_of_cwt_buffer:this.no_of_cwt_buffer,
      type_of_cwt_buffer:this.type_of_cwt_buffer,
      e_light:this.e_light,
      e_alarm:this.e_alarm,
      e_intercom:this.e_intercom,
      ard_operation:this.ard_operation,
      ard_audio:this.ard_audio,
      ard_visuals:this.ard_visuals,
      fireman_operation:this.fireman_operation,
      fireman_emerg_return:this.fireman_emerg_return,
      fireman_audio:this.fireman_audio,
      fireman_visual:this.fireman_visual,
      passenger_overload_operation:this.passenger_overload_operation,
      passenger_overload_visual:this.passenger_overload_visual,
      passenger_overload_audio:this.passenger_overload_audio,
      seismic_sensor_operation:this.seismic_sensor_operation,
      manual_rescue:this.manual_rescue 

    }
  
    this.http.post(`${environment.serverUrl}api/breif_spec_add`, values).subscribe((response) => {
      alert("Data Entered Successfully");
        this.router.navigate(['afterlogin', 'unit',this.document_id]);
        console.log('saved successfully...!');
        },
      (error) => {
        console.error('Error storing data', error);
      }
    );
}
back(){
  this.router.navigate(['afterlogin','section',this.unit_no])
}
}
