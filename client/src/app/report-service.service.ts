import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportDataService {



  Orderd_parts:string[]= [];


  // 'PIT','CABIN', 'CAR TOP', 'MACHINE ROOM','FLOOR LANDING'
  Dataservice_Record_Values:{
    checked:boolean;
    description:string;
    document_id:number;
    dropdown_option:string;
    id:number;
    img:any;
    inspector_name:string;
    needforReport:boolean;
    section:string;
    unit_no:string,
    Customer_Scope:boolean,
    Emergency_Features:boolean,
    Negative_ADJ:number,
    Negative_MNT:number,
    Positive_ADJ:number,
    Positive_MNT:number
  
  }[]=[]

  Order_unit:string[]=[];

  // Quality evaluation 
  first:string[]=["EMERGENCY ALARM","EMERGENCY LIGHT","INTERCOM FUNCTION","ARD OPERATION","MANUAL BRAKE RELEASE DEVICE & INSTRUCTIONS","FIREMAN OPERATION"];
  second:string[]=["PIT & EQUIPMENTS","TRAILING CABLE CONDITION","UNDER SIDE OF THE CAR","BUFFER & CLEARANCES","SAFETY ACCESSORIES"];
  third:string[]=["CABIN & FIXTURE","CAR DOOR & GAP WITH PANELS","DOOR OPERATION & PROTECTION","RIDING QUALITY","START /ACC& DEC/ JERKS","LEVELING"];
  fourth:string[]=["CAR TOP ACCESSARIES & EARTHING","CAR TOP BALUSTRADE & EMERGEN. EXIT","CAR & CWT GUIDES","MIDWAY T.C & CWT CONDITION","HOIST WAY EQUIPMENTS & FASCIA"];
  fifth:string[]=["M/c ROOM /MRL - CONDTION","EARTHING","MACHINE & SHEAVE CONDITION","ROTATING EQUIPMENTS GUARDING","HOIST ROPES/GOV. ROPE/BELTS","CONTROLLER & CONDITION","GOVERNOR & ACCESSORIES","OVERBALANCING & CURRENT READINGS"];
  sixth:string[]=["UNLOCKING DEVICE/ACCESSIBLE HEIGHT","LANDING DOORS & HALL FIXTURES","SIMPLEX/DUPLEX/ GROUPING"];
  seventh:string[]=["CUSTOM. SCOPE OF WORK"];

  seventh_description_logic:any[]=["['MACHINE ROOM'][1].Dropdown","['MACHINE ROOM'][6].Dropdown","['MACHINE ROOM'][7].Dropdown","['MACHINE ROOM'][8].Dropdown","['MACHINE ROOM'][9].Dropdown[1]","['MACHINE ROOM'][16].Dropdown","['MACHINE ROOM'][23].Dropdown","['PIT'][2].Dropdown[3]","['CAR TOP'][13].Dropdown","['PIT'][5].Dropdown"]
  seventh_description:string[]=[];
  // "SAFE ACCESS",
  // "POWER MAIN SWITCH CONDITION",
  // "ACCESSIBILITY OF POWER MAIN SWITCHES",
  // "TRAP DOOR / HOISTING HOOKS CONDITION",
  // "Incoming Earth is missing, should be rectified on priority",
  // "VENTILATION OF THE MACHINE ROOM",
  // "SMOKE DETECTOR / FIRE EXTINGUISHER",
  // "Water seepage in pit. Should be cleaned and rectified",
  // "SHAFT LIGHTING",
  // "PIT LIGHT & CONTROL"];
  // 5 "EQUIPMENTS EARTHING AS PER STANDARD"
  // 8 "PIT CONDITION",

Unique_description_with_section:any[]=[];
Report_image_Value:any=[];

temp_img:any



  constructor() { }
}