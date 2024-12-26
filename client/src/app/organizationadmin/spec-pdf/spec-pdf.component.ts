import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-spec-pdf',
  templateUrl: './spec-pdf.component.html',
  styleUrls: ['./spec-pdf.component.scss']
})
export class SpecPdfComponent {

  elevatorDetails: any[] = [];
  filteredDetails: any[] = []; // Array to store filtered results
  searchQuery: string = ''; // Model to bind search input

  // private apiUrl = 'http://localhost:3000/api/';
  private apiUrl = `${environment.serverUrl}api/`;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>(this.apiUrl + 'specpdf')
      .subscribe(
        data => {
          console.log('Fetched data:', data);
          this.elevatorDetails = data;
          this.filteredDetails = data; // Initialize filteredDetails with all data
        },
        error => {
          console.error('Error fetching elevator details:', error);
        }
      );
  }

 
  searchDocument() {
    const query = this.searchQuery.trim();
    const queryAsNumber = parseInt(query, 10);
  
    if (query) {
      this.filteredDetails = this.elevatorDetails.filter(detail =>
        detail.document_id.toString().includes(query)
      );
  
      const exactMatchIndex = this.filteredDetails.findIndex(detail =>
        detail.document_id === queryAsNumber
      );
  
      if (exactMatchIndex > -1) {
        const exactMatch = this.filteredDetails.splice(exactMatchIndex, 1)[0];
        this.filteredDetails.unshift(exactMatch);
      }
    } else {
      // If the query is empty, show all details
      this.filteredDetails = this.elevatorDetails;
    }
  }
  
  
  
generatePDF(detail: any) {
    console.log("i=", detail);
    const fields = [];
    
    const doc = new jsPDF('p', 'mm', 'a4');
    doc.setFontSize(16);  // Set font size for the heading
    doc.setFont("calibri", "bold");  // Set font style for the heading
    doc.text('Brief Specification Form', 70,10);  // Add the heading at (x: 20, y: 20)

    // fields.push([`Document ID`, `${detail.document_id}`]);
    // fields.push([`Inspector Name`, `${detail.inspector_name}`]);
    // fields.push([`Inspector Name`, `${detail.elevator_number}`]);

fields.push([`Document ID`, `${detail.document_id}`]);
fields.push([`Inspector Name`, `${detail.inspector_name}`]);
fields.push([`Elevator Number`, `${detail.elevator_number}`]);
fields.push([`Capacity`, `${detail.capacity}`]);
fields.push([`Speed`, `${detail.speed}`]);
fields.push([`OEM`, `${detail.oem}`]);
fields.push([`Service Provider`, `${detail.service_provider}`]);
fields.push([`Year of Manufacture`, `${detail.year_of_manufacture}`]);
fields.push([`Type of Equipment`, `${detail.type_of_equipment}`]);
fields.push([`Type of Usage`, `${detail.type_of_usage}`]);
fields.push([`Machine Location`, `${detail.machine_location}`]);
fields.push([`No of Machine Room`, `${detail.no_of_machine_room}`]);
fields.push([`Machine Room`, `${detail.machine_room}`]);
fields.push([`Controller Driver Type`, `${detail.controller_driver_type}`]);
fields.push([`Controller Name as per OEM`, `${detail.controller_name_as_per_oem}`]);
fields.push([`Type of Operation`, `${detail.type_of_operation}`]);
fields.push([`Grouping Type`, `${detail.grouping_type}`]);
fields.push([`Name of the Group`, `${detail.name_of_the_group}`]);
fields.push([`Floor Stops`, `${detail.floor_stops}`]);
fields.push([`Floor Opening`, `${detail.floor_opening}`]);
fields.push([`Floor Designation`, `${detail.floor_designation}`]);
fields.push([`Front Opening Floors`, `${detail.front_opening_floors}`]);
fields.push([`Rear Opening Floors`, `${detail.rear_opening_floors}`]);
fields.push([`Service Floors`, `${detail.service_floors}`]);
fields.push([`Emergency Stop Floors`, `${detail.emergency_stop_floors}`]);
fields.push([`Rope Category`, `${detail.rope_category}`]);
fields.push([`Number of Rope Belt`, `${detail.number_of_rope_belt}`]);
fields.push([`Rope Size`, `${detail.rope_size}`]);
fields.push([`No of Drive Sheave Grooves`, `${detail.no_of_drive_sheave_grooves}`]);
fields.push([`Ropes Wrap Details`, `${detail.ropes_wrap_details}`]);
fields.push([`Type of Roping`, `${detail.type_of_roping}`]);
fields.push([`Machine Type`, `${detail.machine_type}`]);
fields.push([`Motor Kilowatt`, `${detail.motor_kilo_watt}`]);
fields.push([`Type of Motor`, `${detail.type_of_motor}`]);
fields.push([`Motor Voltage`, `${detail.motor_voltage}`]);
fields.push([`Motor Current Ampere`, `${detail.motor_current_in_ampere}`]);
fields.push([`Motor Frequency`, `${detail.motor_frequency}`]);
fields.push([`Motor RPM`, `${detail.motor_rpm}`]);
fields.push([`Motor Insulation Class`, `${detail.motor_insulation_class}`]);
fields.push([`Motor Ingress Protection`, `${detail.motor_ingress_protection}`]);
fields.push([`Motor Number of Poles`, `${detail.motor_no_of_poles}`]);
fields.push([`Motor ST HR`, `${detail.motor_st_hr}`]);
fields.push([`Motor Serial Number`, `${detail.motor_serial_number}`]);
fields.push([`Car Governor Rope Dia`, `${detail.car_governor_rope_dia}`]);
fields.push([`Car Governor Normal Speed`, `${detail.car_governor_normal_speed}`]);
fields.push([`Car Governor Electric Tripping Speed`, `${detail.car_governor_electric_tripping_speed}`]);
fields.push([`Car Governor Mechanical Tripping Speed`, `${detail.car_governor_mechanical_tripping_speed}`]);
// fields.push([`CWT Governor`, `${detail.cwt_governor}`]);
fields.push([`CWT Governor Rope Dia`, `${detail.cwt_governor_rope_dia}`]);
fields.push([`CWT Governor Normal Speed`, `${detail.cwt_governor_normal_speed}`]);
fields.push([`CWT Governor Electrical Tripping Speed`, `${detail.cwt_governor_electrical_tripping_speed}`]);
fields.push([`CWT Governor Mechanical Tripping Speed`, `${detail.cwt_governor_mechanical_tripping_speed}`]);
fields.push([`Door Operator`, `${detail.door_operator}`]);
fields.push([`Entrance Height`, `${detail.entrance_height}`]);
fields.push([`Entrance Width`, `${detail.entrance_width}`]);
fields.push([`Entrance Type of Opening`, `${detail.entrance_type_of_opening}`]);
fields.push([`Cabin Height`, `${detail.cabin_height}`]);
fields.push([`Cabin Width`, `${detail.cabin_width}`]);
fields.push([`Cabin Depth`, `${detail.cabin_depth}`]);
fields.push([`No of COP`, `${detail.no_of_cop}`]);
fields.push([`Car Indicator Type`, `${detail.car_indicator_type}`]);
fields.push([`Multimedia Display`, `${detail.multimedia_display}`]);
fields.push([`No of Cabin Fans`, `${detail.no_of_cabin_fans}`]);
fields.push([`Type of Cabin Fans`, `${detail.type_of_cabin_fans}`]);
fields.push([`Type of Call Buttons`, `${detail.type_of_call_buttons}`]);
fields.push([`Stop Button`, `${detail.car_stop_button}`]);
fields.push([`Service Cabinet`, `${detail.car_service_cabinet}`]);
fields.push([`Voice Announcement`, `${detail.car_voice_announcement}`]);
fields.push([`Handrails`, `${detail.car_handrail}`]);
fields.push([`Cabin Bumper`, `${detail.car_cabin_bumper}`]);
fields.push([`Auto Attendant`, `${detail.car_auto_attendant}`]);
fields.push([`Auto Independent`, `${detail.car_auto_independent}`]);
fields.push([`Non Stop`, `${detail.car_non_stop}`]);
fields.push([`Fan Switch`, `${detail.car_fan_switch}`]);
fields.push([`Hall Indicator Type`, `${detail.hall_indicator_type}`]);
fields.push([`Hall Lanterns`, `${detail.hall_lantems}`]);
fields.push([`Hall Arrival Chime`, `${detail.hall_arrival_chime}`]);
fields.push([`No of Risers at Main Lobby`, `${detail.no_of_risers_at_main_lobby}`]);
fields.push([`No of Risers at Other Floors`, `${detail.no_of_risers_at_other_floors}`]);
fields.push([`Hall Call Type at Main Lobby`, `${detail.hall_call_type_at_main_lobby}`]);
fields.push([`Hall Call Type at All Floors`, `${detail.hall_call_type_at_all_floors}`]);
fields.push([`No of Car Buffers`, `${detail.no_of_car_buffers}`]);
fields.push([`Type of Car Buffers`, `${detail.type_of_car_buffers}`]);
fields.push([`No of Counter Weight Buffer`, `${detail.no_of_counter_weight_buffer}`]);
fields.push([`Type of CWT Buffer`, `${detail.type_of_cwt_buffer}`]);
fields.push([`E Light`, `${detail.e_light}`]);
fields.push([`E Alarm`, `${detail.e_alarm}`]);
fields.push([`E Intercom`, `${detail.e_intercom}`]);
fields.push([`ARD Operation`, `${detail.ard_operation}`]);
fields.push([`ARD Audio`, `${detail.ard_audio}`]);
fields.push([`ARD Visual`, `${detail.ard_visual}`]);
fields.push([`Fireman Operation`, `${detail.fireman_operation}`]);
fields.push([`Fireman Emergency Return`, `${detail.fireman_emerg_return}`]);
fields.push([`Fireman Audio`, `${detail.fireman_audio}`]);
fields.push([`Fireman Visual`, `${detail.fireman_visual}`]);
fields.push([`Manual Rescue`, `${detail.manual_rescue}`]);
fields.push([`Passenger Overload Operation`, `${detail.passenger_overload_operation}`]);
fields.push([`Passenger Overload Audio`, `${detail.passenger_overload_audio}`]);
fields.push([`Passenger Overload Visual`, `${detail.passenger_overload_visual}`]);
fields.push([`Seismic Sensor Operation`, `${detail.seismic_sensor_operation}`]);



const columns = [
  { header: 'S.No', dataKey: 'sno' },  
  { header: 'SPECIFICATION', dataKey: 'SPECIFICATION' },
  { header: 'Value', dataKey: 'Value' }
];
const fieldsWithSerialNumber = fields.map((field, index) => ({
  sno: index + 1,         
  SPECIFICATION: field[0],     
  Value: field[1]       
  
}));

autoTable(doc, {
  columns: [
    { header: 'S.No', dataKey: 'sno' },
    { header: 'SPECIFICATION', dataKey: 'SPECIFICATION' },
    { header: 'VALUE', dataKey: 'Value' }
  ],
  body: fieldsWithSerialNumber,
  theme: 'grid',
  headStyles: {
    fillColor: [3, 161, 252],
    halign: 'center'
  },
  styles: {
    lineColor: [0, 0, 0],
    lineWidth: 0.25
  },
  bodyStyles:{
    halign: 'left'
  }
});

doc.save(`brief-spec-${detail.document_id}-${detail.unit_no}.pdf`);
}




  exportToExcel(detail: any) {
    const fields = [
      [`Document ID`, `${detail.document_id}`],
      [`Inspector Name`, `${detail.inspector_name}`],
      [`Elevator Number`, `${detail.elevator_number}`],
      [`Capacity`, `${detail.capacity}`],
      [`Speed`, `${detail.speed}`],
      [`OEM`, `${detail.oem}`],
      [`Service Provider`, `${detail.service_provider}`],
      [`Year of Manufacture`, `${detail.year_of_manufacture}`],
      [`Type of Equipment`, `${detail.type_of_equipment}`],
      [`Type of Usage`, `${detail.type_of_usage}`],
      [`Machine Location`, `${detail.machine_location}`],
      [`No of Machine Room`, `${detail.no_of_machine_room}`],
      [`Machine Room`, `${detail.machine_room}`],
      [`Controller Driver Type`, `${detail.controller_driver_type}`],
      [`Controller Name as per OEM`, `${detail.controller_name_as_per_oem}`],
      [`Type of Operation`, `${detail.type_of_operation}`],
      [`Grouping Type`, `${detail.grouping_type}`],
      [`Name of the Group`, `${detail.name_of_the_group}`],
      [`Floor Stops`, `${detail.floor_stops}`],
      [`Floor Opening`, `${detail.floor_opening}`],
      [`Floor Designation`, `${detail.floor_designation}`],
      [`Front Opening Floors`, `${detail.front_opening_floors}`],
      [`Rear Opening Floors`, `${detail.rear_opening_floors}`],
      [`Service Floors`, `${detail.service_floors}`],
      [`Emergency Stop Floors`, `${detail.emergency_stop_floors}`],
      [`Rope Category`, `${detail.rope_category}`],
      [`Number of Rope Belt`, `${detail.number_of_rope_belt}`],
      [`Rope Size`, `${detail.rope_size}`],
      [`No of Drive Sheave Grooves`, `${detail.no_of_drive_sheave_grooves}`],
      [`Ropes Wrap Details`, `${detail.ropes_wrap_details}`],
      [`Type of Roping`, `${detail.type_of_roping}`],
      [`Machine Type`, `${detail.machine_type}`],
      [`Motor Kilowatt`, `${detail.motor_kilo_watt}`],
      [`Type of Motor`, `${detail.type_of_motor}`],
      [`Motor Voltage`, `${detail.motor_voltage}`],
      [`Motor Current Ampere`, `${detail.motor_current_in_ampere}`],
      [`Motor Frequency`, `${detail.motor_frequency}`],
      [`Motor RPM`, `${detail.motor_rpm}`],
      [`Motor Insulation Class`, `${detail.motor_insulation_class}`],
      [`Motor Ingress Protection`, `${detail.motor_ingress_protection}`],
      [`Motor Number of Poles`, `${detail.motor_no_of_poles}`],
      [`Motor ST HR`, `${detail.motor_st_hr}`],
      [`Motor Serial Number`, `${detail.motor_serial_number}`],
      [`Car Governor Rope Dia`, `${detail.car_governor_rope_dia}`],
      [`Car Governor Normal Speed`, `${detail.car_governor_normal_speed}`],
      [`Car Governor Electric Tripping Speed`, `${detail.car_governor_electric_tripping_speed}`],
      [`Car Governor Mechanical Tripping Speed`, `${detail.car_governor_mechanical_tripping_speed}`],
      [`CWT Governor Rope Dia`, `${detail.cwt_governor_rope_dia}`],
      [`CWT Governor Normal Speed`, `${detail.cwt_governor_normal_speed}`],
      [`CWT Governor Electrical Tripping Speed`, `${detail.cwt_governor_electrical_tripping_speed}`],
      [`CWT Governor Mechanical Tripping Speed`, `${detail.cwt_governor_mechanical_tripping_speed}`],
      [`Door Operator`, `${detail.door_operator}`],
      [`Entrance Height`, `${detail.entrance_height}`],
      [`Entrance Width`, `${detail.entrance_width}`],
      [`Entrance Type of Opening`, `${detail.entrance_type_of_opening}`],
      [`Cabin Height`, `${detail.cabin_height}`],
      [`Cabin Width`, `${detail.cabin_width}`],
      [`Cabin Depth`, `${detail.cabin_depth}`],
      [`No of COP`, `${detail.no_of_cop}`],
      [`Car Indicator Type`, `${detail.car_indicator_type}`],
      [`Multimedia Display`, `${detail.multimedia_display}`],
      [`No of Cabin Fans`, `${detail.no_of_cabin_fans}`],
      [`Type of Cabin Fans`, `${detail.type_of_cabin_fans}`],
      [`Type of Call Buttons`, `${detail.type_of_call_buttons}`],
      [`Stop Button`, `${detail.car_stop_button}`],
      [`Service Cabinet`, `${detail.car_service_cabinet}`],
      [`Voice Announcement`, `${detail.car_voice_announcement}`],
      [`Handrails`, `${detail.car_handrail}`],
      [`Cabin Bumper`, `${detail.car_cabin_bumper}`],
      [`Auto Attendant`, `${detail.car_auto_attendant}`],
      [`Auto Independent`, `${detail.car_auto_independent}`],
      [`Non Stop`, `${detail.car_non_stop}`],
      [`Fan Switch`, `${detail.car_fan_switch}`],
      [`Hall Indicator Type`, `${detail.hall_indicator_type}`],
      [`Hall Lanterns`, `${detail.hall_lantems}`],
      [`Hall Arrival Chime`, `${detail.hall_arrival_chime}`],
      [`No of Risers at Main Lobby`, `${detail.no_of_risers_at_main_lobby}`],
      [`No of Risers at Other Floors`, `${detail.no_of_risers_at_other_floors}`],
      [`Hall Call Type at Main Lobby`, `${detail.hall_call_type_at_main_lobby}`],
      [`Hall Call Type at All Floors`, `${detail.hall_call_type_at_all_floors}`],
      [`No of Car Buffers`, `${detail.no_of_car_buffers}`],
      [`Type of Car Buffers`, `${detail.type_of_car_buffers}`],
      [`No of Counter Weight Buffer`, `${detail.no_of_counter_weight_buffer}`],
      [`Type of CWT Buffer`, `${detail.type_of_cwt_buffer}`],
      [`E Light`, `${detail.e_light}`],
      [`E Alarm`, `${detail.e_alarm}`],
      [`E Intercom`, `${detail.e_intercom}`],
      [`ARD Operation`, `${detail.ard_operation}`],
      [`ARD Audio`, `${detail.ard_audio}`],
      [`ARD Visual`, `${detail.ard_visual}`],
      [`Fireman Operation`, `${detail.fireman_operation}`],
      [`Fireman Emergency Return`, `${detail.fireman_emerg_return}`],
      [`Fireman Audio`, `${detail.fireman_audio}`],
      [`Fireman Visual`, `${detail.fireman_visual}`],
      [`Manual Rescue`, `${detail.manual_rescue}`],
      [`Passenger Overload Operation`, `${detail.passenger_overload_operation}`],
      [`Passenger Overload Audio`, `${detail.passenger_overload_audio}`],
      [`Passenger Overload Visual`, `${detail.passenger_overload_visual}`],
      [`Seismic Sensor Operation`, `${detail.seismic_sensor_operation}`]
    ];
    

    // Convert fields to a format suitable for Excel export
    const fieldsForExcel = fields.map((field) => ({
      SPECIFICATION: field[0],
      VALUE: field[1],
    }));

    // Generate Excel
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(fieldsForExcel);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Inspection Details');

    // Save the Excel file
    XLSX.writeFile(wb, `brief-spec-${detail.document_id}-${detail.unit_no}.xlsx`);

  }
}
