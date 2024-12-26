import { NgModule, importProvidersFrom } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NeworganizationComponent } from './neworganization/neworganization.component';
import { AfterloginComponent } from './afterlogin/afterlogin.component';
import { OrganizationUserManagementComponent } from './organizationadmin/organization-user-management/organization-user-management.component';
import { DashboardComponent } from './organizationadmin/organization_admin_Home/dashboard.component';
import { SoftwareAdminDashboardComponent } from './softwareadmin/software-admin-dashboard/software-admin-dashboard.component';
import { UiElementsComponent } from './organizationadmin/ui-elements/ui-elements.component';
import { AppHomeComponent } from './app-home/app-home.component';
import { LogindetailManageComponent } from './softwareadmin/software-admin-dashboard/software-admin-user-manage/logindetail-manage/logindetail-manage.component';
import { ProfiledetailManageComponent } from './softwareadmin/software-admin-dashboard/software-admin-user-manage/profiledetail-manage/profiledetail-manage.component';
import { SalesFormComponent } from './INF/sales/sales-form/sales-form.component';
import { SoftwareAdminUserManageComponent } from './softwareadmin/software-admin-dashboard/software-admin-user-manage/software-admin-user-manage.component';
import { InspectionInfComponent } from './INF/inspection-inf/inspection-inf.component';
import { InspectionFormComponent } from './INF/inspection-inf/inspection-form/inspection-form.component';
import { SalesHomeComponent } from './INF/sales/sales-home/sales-home.component';
import { SalesVComponent } from './INF/sales/sales-v/sales-v.component';
import { PlanningEngHomeComponent } from './INF/planning-eng-home/planning-eng-home.component';
import { PlanningEngInfComponent } from './INF/planning-eng-home/planning-eng-inf/planning-eng-inf.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ServicesComponent } from './services/services.component';
import { MailComponent } from './mail/mail.component';
import { InfPdfComponent } from './INF/inf-pdf/inf-pdf.component';
import { InspectorHomeComponent } from './inspector_dashboard/inspector-home/inspector-home.component';
import { ScheduledWorkComponent } from './scheduled-work/scheduled-work.component';
//import { SchedulePageComponent } from './inspector_dashboard/schedule-page/schedule-page.component';
import { MailAutomationInspComponent } from './inspector_dashboard/mail-automation-insp/mail-automation-insp.component';
import { ConfirmPageComponent } from './confirm-page/confirm-page.component';
import { SchedulePageComponent } from './inspector_dashboard/schedule-page/schedule-page.component';
import { RescheduleRequestComponent } from './INF/inspection-inf/reschedule-request/reschedule-request.component';
import { MailResponseComponent } from './mail-response/mail-response.component';
import { BasicDateComponent } from './inspector_dashboard/basic-date/basic-date.component';
import { UnitsDetailsComponent } from './inspector_dashboard/units-details/units-details.component';
import { AuthoDetailsComponent } from './inspector_dashboard/autho-details/autho-details.component';
import { ListingUnitsComponent } from './inspector_dashboard/listing-units/listing-units.component';
import { SectionComponent } from './inspector_dashboard/section/section.component';
import { BreifSpecComponent } from './inspector_dashboard/breif-spec/breif-spec.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { PitComponent } from './inspector_dashboard/pit/pit.component';
import { PitcheckpointsComponent } from './inspector_dashboard/pit/pitcheckpoints/pitcheckpoints.component';
import { CabinComponent } from './inspector_dashboard/cabin/cabin.component';
import { OutBoxComponent } from './out-box/out-box.component';
import { CartopComponent } from './inspector_dashboard/cartop/cartop.component';
import { MachineroomComponent } from './inspector_dashboard/machineroom/machineroom.component';
import { FloorlandingComponent } from './inspector_dashboard/floorlanding/floorlanding.component';
import { CabincheckpointsComponent } from './inspector_dashboard/cabin/cabincheckpoints/cabincheckpoints.component';
import { CartopcheckpointComponent } from './inspector_dashboard/cartop/cartopcheckpoint/cartopcheckpoint.component';
import { FloorlandingcheckpointComponent } from './inspector_dashboard/floorlanding/floorlandingcheckpoint/floorlandingcheckpoint.component';
import { MachinroomcheckpointComponent } from './inspector_dashboard/machineroom/machinroomcheckpoint/machinroomcheckpoint.component';
import { ReportForElevComponent } from './inspector_dashboard/report-home/report-for-elev/report-for-elev.component';
import { ReportHomeComponent } from './inspector_dashboard/report-home/report-home.component';
import { AgreementPageComponent } from './inspector_dashboard/agreement-page/agreement-page.component';
import { SiteRiskAssessmentComponent } from './inspector_dashboard/site-risk-assessment/site-risk-assessment.component';
import { PreInspectionComponent } from './inspector_dashboard/pre-inspection/pre-inspection.component';
import { ListCertificateComponent } from './inspector_dashboard/list-certificate/list-certificate.component';
import { CertificateComponent } from './inspector_dashboard/certificate/certificate.component';
import { CertificateOComponent } from './certificate-o/certificate-o.component';
import { CertificateHomeComponent } from './inspector_dashboard/certificate-home/certificate-home.component';
import { UploadCertificateComponent } from './inspector_dashboard/certificate-home/upload-certificate/upload-certificate.component';
import { UploadPdfComponent } from './inspector_dashboard/certificate-home/upload-pdf/upload-pdf.component';
import { ViewofcertificateComponent } from './inspector_dashboard/certificate-home/viewofcertificate/viewofcertificate.component';
import { MoreOptionsComponent } from './inspector_dashboard/more-options/more-options.component';
import { ClosingMeetingComponent } from './inspector_dashboard/more-options/closing-meeting/closing-meeting.component';
import { CloseoutComponent } from './inspector_dashboard/more-options/closeout/closeout.component';
import { FeedBackFormComponent } from './inspector_dashboard/more-options/feed-back-form/feed-back-form.component';
import { KeyAbstractUnitsComponent } from './inspector_dashboard/more-options/key-abstract-units/key-abstract-units.component';
import { KeyAbstractComponent } from './inspector_dashboard/more-options/key-abstract/key-abstract.component';
import { UnitselectionforReportComponent } from './inspector_dashboard/report-home/unitselectionfor-report/unitselectionfor-report.component';
import { ShutdownComponent } from './inspector_dashboard/shutdown/shutdown.component';
import { ApprovalComponent } from './organizationadmin/approval/approval.component';
import { PdfViewerComponent } from './inspector_dashboard/certificate-home/pdf-viewer/pdf-viewer.component';
import { UploadPdfReportComponent } from './inspector_dashboard/report-home/upload-pdf-report/upload-pdf-report.component';
import { ReportPdfViewerComponent } from './inspector_dashboard/report-pdf-viewer/report-pdf-viewer.component';
import { AboutComponent } from './about/about.component';
import { TeamComponent } from './team/team.component';
import { ContactComponent } from './contact/contact.component';
import { VideoTutorialComponent } from './video-tutorial/video-tutorial.component';
import { WccComponent } from './inspector_dashboard/more-options/wcc/wcc.component';
import { WccViewComponent } from './wcc-view/wcc-view.component';
import { SalesListComponent } from './INF/sales/sales-list/sales-list.component';
import { HomePageComponent } from './INF/sales/home-page/home-page.component';
import { InfHistoryComponent } from './INF/sales/inf-history/inf-history.component';
import { StatusOneEditComponent } from './INF/sales/status-one-edit/status-one-edit.component';
import { MapViewComponent } from './inspector_dashboard/map-view/map-view.component';
import { InspectionScheduledComponent } from './INF/inspection-inf/inspection-scheduled/inspection-scheduled.component';
import { ScheduledInfComponent } from './INF/inspection-inf/scheduled-inf/scheduled-inf.component';
import { ActiveScheduleComponent } from './INF/inspection-inf/active-schedule/active-schedule.component';
import { KeyAbstractDashviewComponent } from './INF/inspection-inf/key-abstract-dashview/key-abstract-dashview.component';
import { InspectionAnalysisComponent } from './INF/inspection-inf/inspection-analysis/inspection-analysis.component';
import { ReportDashviewComponent } from './INF/inspection-inf/report-dashview/report-dashview.component';
import { CertificateDashviewComponent } from './INF/inspection-inf/certificate-dashview/certificate-dashview.component';
import { WccDashviewComponent } from './INF/inspection-inf/wcc-dashview/wcc-dashview.component';
import { CertificateAnalysisComponent } from './INF/inspection-inf/certificate-analysis/certificate-analysis.component';
import { ExcelUploadComponent } from './organizationadmin/excel-upload/excel-upload.component';
import { OrganizationMasterComponent } from './organizationadmin/organization-master/organization-master.component';
import { TypeMasterComponent } from './organizationadmin/type-master/type-master.component';
import { ProductMasterComponent } from './organizationadmin/product-master/product-master.component';
import { SubProductMasterComponent } from './organizationadmin/sub-product-master/sub-product-master.component';
import { LastSubProductMasterComponent } from './organizationadmin/last-sub-product-master/last-sub-product-master.component';
import { SendWhatsAppComponent } from './organizationadmin/send-whats-app/send-whats-app.component';
import { ProjectManageDataComponent } from './project-manage-data/project-manage-data.component';
import { OemDetailsComponent } from './oem-details/oem-details.component';
import { VendorDetailsComponent } from './vendor-details/vendor-details.component';
import { TypeOfBuildingComponent } from './type-of-building/type-of-building.component';
import { TravelAccomodationComponent } from './travel-accomodation/travel-accomodation.component';
import { RegionDetailsComponent } from './region-details/region-details.component';
import { InspectorTypeComponent } from './inspector-type/inspector-type.component';
import { InspectionTypeComponent } from './inspection-type/inspection-type.component';
import { InspectionTimeShiftComponent } from './inspection-time-shift/inspection-time-shift.component';
import { InspectionTimeComponent } from './inspection-time/inspection-time.component';
import { InspectionMasterComponent } from './organizationadmin/inspection-master/inspection-master.component';
import { CheckListComponent } from './organizationadmin/check-list/check-list.component';
import { Msf24Component } from './organizationadmin/msf24/msf24.component';
import { InspectorCvComponent } from './organizationadmin/inspector-cv/inspector-cv.component';
import { inspector } from './sidenav/nav-data';
import { SignatureComponent } from './organizationadmin/signature/signature.component';
import { DefaultComponent } from './organizationadmin/default/default.component';
import { SpecPdfComponent } from './organizationadmin/spec-pdf/spec-pdf.component';
import { SpecCrudComponent } from './organizationadmin/spec-crud/spec-crud.component';
import { ApprovalReportComponent } from './organizationadmin/approval-report/approval-report.component';
import { NotApproveReportComponent } from './organizationadmin/not-approve-report/not-approve-report.component';
import { FeedbackPdfComponent } from './organizationadmin/feedback-pdf/feedback-pdf.component';
import { OrganizationDepartmentComponent } from './organizationadmin/organization-department/organization-department.component';
import { OrganizationRoleComponent } from './organizationadmin/organization-role/organization-role.component';
import { MailResponseCrudComponent } from './organizationadmin/mail-response-crud/mail-response-crud.component';
import { ExcelDashviewComponent } from './INF/inspection-inf/excel-dashview/excel-dashview.component';
import { QrCodeComponent } from './inspector_dashboard/inspector-home/qr-code/qr-code.component';
import { ReportImagesComponent } from './organizationadmin/report-images/report-images.component';
import { RescheduleUpdateComponent } from './INF/inspection-inf/reschedule-update/reschedule-update.component';
import { ClientDefaultCcComponent } from './organizationadmin/client-default-cc/client-default-cc.component';
import { ApprovalMailInspComponent } from './organizationadmin/approval-mail-insp/approval-mail-insp.component';
import { ApprovedScheduleMailComponent } from './organizationadmin/approved-schedule-mail/approved-schedule-mail.component';
// import { OutBoxComponent } from './out-box/out-box.component';
// import { UnitDetailsComponent } from './inspector_dashboard/unit-details/unit-details.component';
const routes: Routes = [

  { path: '', redirectTo: '/app-home', pathMatch: 'full' },
  {path:'map_view',component:MapViewComponent},
  {path:'excel',component:ExcelUploadComponent},
  {path:'organization_master',component:OrganizationMasterComponent},
  {path:'type_master',component:TypeMasterComponent},
  {path:'product_master',component:ProductMasterComponent},
  {path:'sub_product_master',component:SubProductMasterComponent},
  {path:'last_sub_product_master',component:LastSubProductMasterComponent},
  {path:'excel_upload',component:ExcelUploadComponent},
  {path:'excel',component:ExcelUploadComponent},
  {path:'whatsapp',component:SendWhatsAppComponent},

  
  {path:'app-home',component:AppHomeComponent,},
  {path:'pdf/:c_no',component:InfPdfComponent},
  {path:'pdf_c/:id/:unit',component:PdfViewerComponent},
  {path:'pdf_r/:id/:unit',component:ReportPdfViewerComponent},
  {path:"about",component:AboutComponent},
  {path:"team",component:TeamComponent},


  {path:"contact",component:ContactComponent},

  {path:"video_run",component:VideoTutorialComponent},

  {path:'certificate/:unit/:document_id',component:CertificateComponent},
 
  {path:'shut_down/:c_no/:document_id/:unit',component:ShutdownComponent},


  {path:'view_c/:unit/:document_id/:id/:contract',component:ViewofcertificateComponent},

  // {path:"",redirectTo:"app-home",pathMatch:'full'},
  {path: "services",component:ServicesComponent}, 
  {path:"login",component:LoginComponent},
  {path:"Mail_Response",component:MailResponseComponent},
  {path:"neworganization", component:NeworganizationComponent},
  {path:"forgotpassword",component:ForgotpasswordComponent},
  {path:"reset",component:ResetPasswordComponent},
  { path: 'Report_View/:contractNumber/:documentid_For_Url/:report_id', component: ReportForElevComponent },

  {path:'key_abstract/:unit/:document_id/:contract_no',component:KeyAbstractComponent},
  { path: 'ReportElevator1/:contractNumber/:documentid_For_Url', component: ReportForElevComponent },
  { path: 'unit_selection', component: UnitselectionforReportComponent },
  // '/afterlogin/software_admin_dashboard_user_manage/organization_admin_login_details'
  {path: 'afterlogin',component: AfterloginComponent,
    children: [
      {path:"qrcode",component:QrCodeComponent},
      
   
        {path:'mail',component:MailComponent},
        {path:'confirm-page',component:ConfirmPageComponent},
        {path:'software_admin_dashboard', component:SoftwareAdminDashboardComponent},
        {path:'software_admin_dashboard_user_manage', component:SoftwareAdminUserManageComponent,
        
        children:[
          {path:'organization_admin_login_details', component:LogindetailManageComponent},
          {path:'',redirectTo:'organization_admin_login_details',pathMatch:'full'},
          
          
        ]},
        // organization admin
        {path: 'dashboard', component: DashboardComponent},//home
        {path:'organization_adminUI', component:UiElementsComponent},// add elements
        {path:'app-organization-user-management',component:OrganizationUserManagementComponent},
        {path:'approval',component:ApprovalComponent},

        {path:'profile-manage',component:ProfiledetailManageComponent},


        // Inspector
        {path:"inspectorHome",component:InspectorHomeComponent},
        {path:'schedule_page',component:SchedulePageComponent},
        {path:'scheduledWork', component:ScheduledWorkComponent},
        {path:"mail_automation",component:MailAutomationInspComponent},
        {path:"ReportHome",component:ReportHomeComponent},
        {path:"ReportElevator",component:ReportForElevComponent},
        { path: 'Report_unitSelection/:contractNumber/:documentid_For_Url/:report_id', component: UnitselectionforReportComponent },
        {path:"outbox",component:OutBoxComponent},
        {path:"Wcc_View",component:WccViewComponent},
         //////admin dashboard prasanna//////////
         {path:"manage_data",component:ProjectManageDataComponent},
         { path: 'oem_details',component: OemDetailsComponent}, // Ensure the route matches
        { path: 'vendor-details',component: VendorDetailsComponent }, // Ensure the route matches
        { path: 'type-of-building', component: TypeOfBuildingComponent }, // Ensure the route matches
        { path: 'travel-accomodation', component: TravelAccomodationComponent}, // Ensure the route matches
        { path: 'region-details', component: RegionDetailsComponent }, // Ensure the route matches
        { path: 'inspector-type', component: InspectorTypeComponent }, // Ensure the route matches
        { path: 'inspection-type', component: InspectionTypeComponent }, // Ensure the route matches
        { path: 'inspection-time-shift', component: InspectionTimeShiftComponent }, // Ensure the route matches
        { path: 'inspection-time', component: InspectionTimeComponent }, // Ensure the route matches
        {path:'inspection_master',component:InspectionMasterComponent},
        {path:'check_list',component:CheckListComponent},
        {path:"msf-24",component:Msf24Component},
        {path: "inspector-cv",component:InspectorCvComponent},
        {path:"inspector_sign",component:SignatureComponent},
        {path:"default_cc",component:DefaultComponent},
        {path:"organization_department",component:OrganizationDepartmentComponent},
        {path:"organization_role",component:OrganizationRoleComponent},
        {path:"response",component:MailResponseCrudComponent},
        {path:"report_images",component:ReportImagesComponent},
        {path:"client_default_cc",component:ClientDefaultCcComponent},
        {path:"approval_mail_insp",component:ApprovalMailInspComponent},
        {path:"approved_schedule_mail",component:ApprovedScheduleMailComponent},



        ////////mugesh////
        {path:"spec-pdf",component:SpecPdfComponent},
        {path:"spec-crud",component:SpecCrudComponent},
        {path:"approval-report",component:ApprovalReportComponent},
        {path:"not-approve-report",component:NotApproveReportComponent},
        {path:"feedback-pdf",component:FeedbackPdfComponent},







        
         {path:'inspection_home', component:InspectionInfComponent},
         {path:'RescheduleRequest',component:RescheduleRequestComponent},

         {path:'inspection_inf/:c_no',component:InspectionFormComponent},
         {path:'sales_home',component:HomePageComponent},
         {path:'sales_inf/:selectedOption', component:SalesFormComponent},
         {path:'sales_list',component:SalesListComponent},
         {path:'inf_history',component:InfHistoryComponent},
         {path:'home_page',component:SalesHomeComponent},
         {path:'status_one/:c_no',component:StatusOneEditComponent},
         {path:'sales_v/:selectedOption',component:SalesVComponent},
         {path:'plan_eg_home',component:PlanningEngHomeComponent },
         {path:'plan_eng_inf/:c_no',component:PlanningEngInfComponent},
         {path:'pdf/:c_no',component:InfPdfComponent},
         {path:'more_options',component:MoreOptionsComponent},
         {path:'basic_data/:c_no',component:BasicDateComponent},
         {path:'unit_details/:c_no',component:UnitsDetailsComponent},
         {path:'auth/:c_no',component:AuthoDetailsComponent},
         {path:'unit/:c_no',component:ListingUnitsComponent},
         {path:'section/:c_no',component:SectionComponent},
         {path:'spec/:c_no',component:BreifSpecComponent},
         {path:'agreement/:c_no',component:AgreementPageComponent},
         {path:'risk/:c_no',component:SiteRiskAssessmentComponent},
         {path:'pre_ins/:c_no',component:PreInspectionComponent},
         {path:'upload_certificate/:c_no',component:UploadPdfComponent},
         {path:'upload_report/:c_no',component:UploadPdfReportComponent},

         //mugesh
         {path:'insp_schedule_page',component:InspectionScheduledComponent},
         {path:'scheduled_inf',component:ScheduledInfComponent},
         {path:'schedule_status',component:ActiveScheduleComponent},
         {path:"reschedule_update/:c_no",component:RescheduleUpdateComponent},
         {path:'wcc-view',component:WccViewComponent},
        //  {path:'inspection_count',component:InspectionCountComponent},
         {path:'key-abstract-dashview/:c_no',component:KeyAbstractDashviewComponent},
         {path:'inspection_analysis',component:InspectionAnalysisComponent},
         {path:'report_dashview/:c_no',component:ReportDashviewComponent},
         {path:'certificate_dashview/:c_no',component:CertificateDashviewComponent},
         {path:'wcc_dashview/:c_no',component:WccDashviewComponent},
         {path:'certificate_analysis',component:CertificateAnalysisComponent},
         {path:'excel_reports/:c_no',component:ExcelDashviewComponent},
         

         {path:'list_certificate',component:ListCertificateComponent},
         {path:'certificate_home',component:CertificateHomeComponent},
         
         {path:'closing_meeting/:c_no',component:CloseoutComponent},
         {path:'feedback/:c_no',component:FeedBackFormComponent},
         {path:'key_abstract_units/:c_no/:document_id',component:KeyAbstractUnitsComponent},

        
         {path:'pit/:c_no',component:PitComponent},
         {path:'wcc-list/:c_no/:document_id',component:WccComponent},

         { path: 'pitcheckpoint/:id/:documentid/:unitno/:inspectorname/:section', component: PitcheckpointsComponent },
         
         {path:'cabin/:c_no',component:CabinComponent},
        { path: 'cabincheckpoint/:id/:documentid/:unitno/:inspectorname/:section', component: CabincheckpointsComponent },
        
         {path:'cartop/:c_no',component:CartopComponent},
         { path: 'carcheckpoint/:id/:documentid/:unitno/:inspectorname/:section', component: CartopcheckpointComponent },
         
         {path:'machineroom/:c_no',component:MachineroomComponent},
         { path: 'machineroomcheckpoint/:id/:documentid/:unitno/:inspectorname/:section', component: MachinroomcheckpointComponent },
         
         
         {path:'floorlanding/:c_no',component:FloorlandingComponent},
         { path: 'floorcheckpoint/:id/:documentid/:unitno/:inspectorname/:section', component: FloorlandingcheckpointComponent },
         
         
    ],
  },
 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }