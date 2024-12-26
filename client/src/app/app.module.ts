import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { UiElementsComponent } from './organizationadmin/ui-elements/ui-elements.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './body/body.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DashboardComponent } from './organizationadmin/organization_admin_Home/dashboard.component';
import { SublevelMenuComponent } from './sidenav/sublevel-menu.component';
import { LoginComponent } from './login/login.component';
import { NeworganizationComponent } from './neworganization/neworganization.component';
import { HttpClientModule } from '@angular/common/http';
import { AfterloginComponent } from './afterlogin/afterlogin.component';
import { OrganizationUserManagementComponent } from './organizationadmin/organization-user-management/organization-user-management.component';
import { SoftwareAdminDashboardComponent } from './softwareadmin/software-admin-dashboard/software-admin-dashboard.component';
import { WccComponent } from './inspector_dashboard/more-options/wcc/wcc.component';

import { AppHomeComponent } from './app-home/app-home.component';
import { HomeHeaderComponent } from './home-header/home-header.component';
import { HomeBodyComponent } from './home-body/home-body.component';
import { SoftwareAdminUserManageComponent } from './softwareadmin/software-admin-dashboard/software-admin-user-manage/software-admin-user-manage.component';
import { LogindetailManageComponent } from './softwareadmin/software-admin-dashboard/software-admin-user-manage/logindetail-manage/logindetail-manage.component';
import { ProfiledetailManageComponent } from './softwareadmin/software-admin-dashboard/software-admin-user-manage/profiledetail-manage/profiledetail-manage.component';
import { NgxCaptchaModule } from 'ngx-captcha';




// INF 

// import { DialogComponent } from './dialog/dialog.component';
// import { Dialog2Component } from './dialog2/dialog2.component';
// import { Dialog3Component } from './dialog3/dialog3.component';
// import { Dialog4Component } from './dialog4/dialog4.component';
// import { Dialog5Component } from './dialog5/dialog5.component';
// import {MatDividerModule} from '@angular/material/divider';
// import { Dialog6Component } from './dialog6/dialog6.component';
// import { Dialog7Component } from './dialog7/dialog7.component';
// import { Dialog8Component } from './dialog8/dialog8.component';
// import { Dialog9Component } from './dialog9/dialog9.component';
// import { Form1Component } from './form1/form1.component';
// import { SalesFormComponent } from './sales-form/sales-form.component';
// import { InspectionInfComponent } from './inspection-inf/inspection-inf.component';
// import { InspectionFormComponent } from './inspection-inf/inspection-form/inspection-form.component';
// import { DialogCComponent } from './inspection-inf/dialog-c/dialog-c.component';
// import { SalesHomeComponent } from './sales-form/sales-home/sales-home.component';
// import { SalesVComponent } from './sales-form/sales-v/sales-v.component';
// import { PlanningEngHomeComponent } from './planning-eng-home/planning-eng-home.component';
// import { PlanningEngInfComponent } from './planning-eng-home/planning-eng-inf/planning-eng-inf.component';
// import { DialogPComponent } from './planning-eng-home/dialog-p/dialog-p.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import { MatMenuModule, MatMenuTrigger} from '@angular/material/menu';
import {MatNativeDateModule} from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { SignaturePadModule } from 'angular2-signaturepad'; // Adjust the import based on the package you're using


import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { DialogComponent } from './INF/dialog/dialog.component';
import { Dialog2Component } from './INF/dialog2/dialog2.component';
import { Dialog3Component } from './INF/dialog3/dialog3.component';
import { Dialog4Component } from './INF/dialog4/dialog4.component';
import { Dialog5Component } from './INF/dialog5/dialog5.component';
import {MatDividerModule} from '@angular/material/divider';
import { Dialog6Component } from './INF/dialog6/dialog6.component';
import { Dialog7Component } from './INF/dialog7/dialog7.component';
import { Dialog8Component } from './INF/dialog8/dialog8.component';
import { Dialog9Component } from './INF/dialog9/dialog9.component'; 
import { Form1Component } from './INF/form1/form1.component';
import { SalesFormComponent } from './INF/sales/sales-form/sales-form.component'; 
import { InspectionInfComponent } from './INF/inspection-inf/inspection-inf.component';
import { InspectionFormComponent } from './INF/inspection-inf/inspection-form/inspection-form.component';
import { DialogCComponent } from './INF/inspection-inf/dialog-c/dialog-c.component';
import { SalesHomeComponent } from './INF/sales/sales-home/sales-home.component';
import { SalesVComponent } from './INF/sales/sales-v/sales-v.component';
import { PlanningEngHomeComponent } from './INF/planning-eng-home/planning-eng-home.component';
import { PlanningEngInfComponent } from './INF/planning-eng-home/planning-eng-inf/planning-eng-inf.component';
import { DialogPComponent } from './INF/planning-eng-home/dialog-p/dialog-p.component';

import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ServicesComponent } from './services/services.component';
import { MailComponent } from './mail/mail.component';
import { CalenderComponent } from './INF/inspection-inf/calender/calender.component';
import { MultipleInspectorComponent } from './INF/inspection-inf/multiple-inspector/multiple-inspector.component';
import { InfPdfComponent } from './INF/inf-pdf/inf-pdf.component';
import { DatePipe } from '@angular/common';
import { InspectorHomeComponent } from './inspector_dashboard/inspector-home/inspector-home.component';
import { ScheduledWorkComponent } from './scheduled-work/scheduled-work.component';
import { SchedulePageComponent } from './inspector_dashboard/schedule-page/schedule-page.component';
import { ConfirmPageComponent } from './confirm-page/confirm-page.component';
import { RejectionComponent } from './inspector_dashboard/rejection/rejection.component';
import { RescheduleRequestComponent } from './INF/inspection-inf/reschedule-request/reschedule-request.component';
import { ParseJsonPipe } from './parse-json.pipe';
import { MailResponseComponent } from './mail-response/mail-response.component';
import { BasicDateComponent } from './inspector_dashboard/basic-date/basic-date.component';
import { UnitsDetailsComponent } from './inspector_dashboard/units-details/units-details.component';
import { AuthoDetailsComponent } from './inspector_dashboard/autho-details/autho-details.component';
import { ListingUnitsComponent } from './inspector_dashboard/listing-units/listing-units.component';
import { SectionComponent } from './inspector_dashboard/section/section.component';
import { BreifSpecComponent } from './inspector_dashboard/breif-spec/breif-spec.component';
import { MatTabsModule } from '@angular/material/tabs';
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
import { NewReportComponent } from './inspector_dashboard/report-home/new-report/new-report.component';
// import { ExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

import { ExistingReportComponent } from './inspector_dashboard/report-home/existing-report/existing-report.component';





import { AgreementPageComponent } from './inspector_dashboard/agreement-page/agreement-page.component';
import { SiteRiskAssessmentComponent } from './inspector_dashboard/site-risk-assessment/site-risk-assessment.component';
import { PreInspectionComponent } from './inspector_dashboard/pre-inspection/pre-inspection.component';
import { MailAutomationInspComponent } from './inspector_dashboard/mail-automation-insp/mail-automation-insp.component';
import { UnitselectionforReportComponent } from './inspector_dashboard/report-home/unitselectionfor-report/unitselectionfor-report.component';
import { ListCertificateComponent } from './inspector_dashboard/list-certificate/list-certificate.component';
import { CertificateComponent } from './inspector_dashboard/certificate/certificate.component';
import { CertificateOComponent } from './certificate-o/certificate-o.component';
import { CertificateHomeComponent } from './inspector_dashboard/certificate-home/certificate-home.component';
import { DownloadCertificateComponent } from './inspector_dashboard/certificate-home/download-certificate/download-certificate.component';
import { UploadCertificateComponent } from './inspector_dashboard/certificate-home/upload-certificate/upload-certificate.component';
import { ViewCertificateComponent } from './inspector_dashboard/certificate-home/view-certificate/view-certificate.component';
import { UploadPdfComponent } from './inspector_dashboard/certificate-home/upload-pdf/upload-pdf.component';
import { ViewofcertificateComponent } from './inspector_dashboard/certificate-home/viewofcertificate/viewofcertificate.component';
import { SafeUrlPipe } from './Data/safe-url.pipe';
import { MoreOptionsComponent } from './inspector_dashboard/more-options/more-options.component';
import { ClosingMeetingComponent } from './inspector_dashboard/more-options/closing-meeting/closing-meeting.component';
import { CloseoutComponent } from './inspector_dashboard/more-options/closeout/closeout.component';
import { FeedBackFormComponent } from './inspector_dashboard/more-options/feed-back-form/feed-back-form.component';
import { KeyAbstractUnitsComponent } from './inspector_dashboard/more-options/key-abstract-units/key-abstract-units.component';
import { KeyAbstractComponent } from './inspector_dashboard/more-options/key-abstract/key-abstract.component';
import { ArrayJoinPipe } from './array-join.pipe';
import { FeedBackFillComponent } from './inspector_dashboard/more-options/feed-back-fill/feed-back-fill.component';
import { KeyAbstractListComponent } from './inspector_dashboard/more-options/key-abstract-list/key-abstract-list.component';
import { ShutdownComponent } from './inspector_dashboard/shutdown/shutdown.component';
import { StyledAlertDialogComponent } from './styled-alert-dialog/styled-alert-dialog.component';
import { ApprovalComponent } from './organizationadmin/approval/approval.component';
import { PdfViewerComponent } from './inspector_dashboard/certificate-home/pdf-viewer/pdf-viewer.component';
import { UploadReportComponent } from './inspector_dashboard/report-home/upload-report/upload-report.component';
import { ViewReportComponent } from './inspector_dashboard/report-home/view-report/view-report.component';
import { UploadPdfReportComponent } from './inspector_dashboard/report-home/upload-pdf-report/upload-pdf-report.component';
import { ReportPdfViewerComponent } from './inspector_dashboard/report-pdf-viewer/report-pdf-viewer.component';
import { RejectedReportsComponent } from './inspector_dashboard/report-home/rejected-reports/rejected-reports.component';
import { AboutComponent } from './about/about.component';
import { VideoTutorialComponent } from './video-tutorial/video-tutorial.component';
import { ContactComponent } from './contact/contact.component';
import { TeamComponent } from './team/team.component';
import { WccListComponent } from './inspector_dashboard/more-options/wcc/wcc-list/wcc-list.component';
import { WccViewComponent } from './wcc-view/wcc-view.component';
import { HomePageComponent } from './INF/sales/home-page/home-page.component';
import { SalesListComponent } from './INF/sales/sales-list/sales-list.component';
import { InfHistoryComponent } from './INF/sales/inf-history/inf-history.component';
import { StatusOneEditComponent } from './INF/sales/status-one-edit/status-one-edit.component';
import { DialogDComponent } from './INF/sales/dialog-d/dialog-d.component';
import { MapViewComponent } from './inspector_dashboard/map-view/map-view.component';
import { InspectionScheduledComponent } from './INF/inspection-inf/inspection-scheduled/inspection-scheduled.component';
import { ActiveScheduleComponent } from './INF/inspection-inf/active-schedule/active-schedule.component';
import { ScheduledInfComponent } from './INF/inspection-inf/scheduled-inf/scheduled-inf.component';
import { ReportDashviewComponent } from './INF/inspection-inf/report-dashview/report-dashview.component';
import { KeyAbstractDashviewComponent } from './INF/inspection-inf/key-abstract-dashview/key-abstract-dashview.component';
import { WccDashviewComponent } from './INF/inspection-inf/wcc-dashview/wcc-dashview.component';
import { CertificateDashviewComponent } from './INF/inspection-inf/certificate-dashview/certificate-dashview.component';
import { InspectionAnalysisComponent } from './INF/inspection-inf/inspection-analysis/inspection-analysis.component';
import { CertificateAnalysisComponent } from './INF/inspection-inf/certificate-analysis/certificate-analysis.component';
import { DataBankComponent } from './databank/databank.component';
import { DataPreProcessComponent } from './data-pre-process/data-pre-process.component';
import { DialogFComponent } from './INF/sales/dialog-f/dialog-f.component';
import { SignaturePad } from 'angular2-signaturepad';
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
import { ExcelReportComponent } from './inspector_dashboard/more-options/excel-report/excel-report.component';
import { QrCodeComponent } from './inspector_dashboard/inspector-home/qr-code/qr-code.component';
import { ReportImagesComponent } from './organizationadmin/report-images/report-images.component';
import { RescheduleUpdateComponent } from './INF/inspection-inf/reschedule-update/reschedule-update.component';
import { ClientDefaultCcComponent } from './organizationadmin/client-default-cc/client-default-cc.component';
import { ApprovalMailInspComponent } from './organizationadmin/approval-mail-insp/approval-mail-insp.component';
import { ApprovedScheduleMailComponent } from './organizationadmin/approved-schedule-mail/approved-schedule-mail.component';


// import { RejectionComponent } from './inspector_dashboard/rejection/rejection.component';





@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    SidenavComponent,
    DashboardComponent,
    SublevelMenuComponent,
    LoginComponent,
    UiElementsComponent,
    MailAutomationInspComponent,
    SafeUrlPipe,
  
   
    NeworganizationComponent,
         AfterloginComponent,
         OrganizationUserManagementComponent,
         SoftwareAdminDashboardComponent,
        
         AppHomeComponent,
         HomeHeaderComponent,
         HomeBodyComponent,
       
         SoftwareAdminUserManageComponent,
         LogindetailManageComponent,
         ProfiledetailManageComponent,
             
        //  INF
        DialogComponent,
        SalesFormComponent,
        DialogPComponent,
      
        SalesHomeComponent,
        SalesVComponent,
        
       


        Dialog2Component,
        Dialog3Component,
        Dialog4Component,
        Dialog5Component,
        Dialog6Component,
        Dialog7Component,
        Dialog8Component,
        Dialog9Component,
        Form1Component,
        
        InspectionInfComponent,
        InspectionFormComponent,
        DialogCComponent,
       
        PlanningEngHomeComponent,
        PlanningEngInfComponent,
        ForgotpasswordComponent,
        ServicesComponent,
        MailComponent,
        CalenderComponent,
        MultipleInspectorComponent,
        InfPdfComponent,
        InspectorHomeComponent,
        ScheduledWorkComponent,
        SchedulePageComponent,
        ConfirmPageComponent,
        RejectionComponent,
        RescheduleRequestComponent,
        ParseJsonPipe,
        MailResponseComponent,
        BasicDateComponent,
        UnitsDetailsComponent,
        AuthoDetailsComponent,
        ListingUnitsComponent,
        SectionComponent,
        BreifSpecComponent,
     
        ResetPasswordComponent,
               PitComponent,
               PitcheckpointsComponent,
               CabinComponent,
               OutBoxComponent,
               CartopComponent,
               MachineroomComponent,
               FloorlandingComponent,
               CabincheckpointsComponent,
               CartopcheckpointComponent,
               FloorlandingcheckpointComponent,
               MachinroomcheckpointComponent,
               ReportForElevComponent,
               ReportHomeComponent,
               NewReportComponent,
               ExistingReportComponent,
               AgreementPageComponent,
               SiteRiskAssessmentComponent,
               PreInspectionComponent,
               UnitselectionforReportComponent,
               ListCertificateComponent,
               CertificateComponent,
               CertificateOComponent,
               CertificateHomeComponent,
               DownloadCertificateComponent,
               UploadCertificateComponent,
               ViewCertificateComponent,
               UploadPdfComponent,
               ViewofcertificateComponent,
               MoreOptionsComponent,
               ClosingMeetingComponent,
               CloseoutComponent,
               FeedBackFormComponent,
               KeyAbstractUnitsComponent,
               KeyAbstractComponent,
               ArrayJoinPipe,
               FeedBackFillComponent,
               KeyAbstractListComponent,
               ShutdownComponent,
               StyledAlertDialogComponent,
               ApprovalComponent,
               PdfViewerComponent,
               UploadReportComponent,
               ViewReportComponent,
               UploadPdfReportComponent,
               ReportPdfViewerComponent,
               RejectedReportsComponent,
               AboutComponent,
               VideoTutorialComponent,
               ContactComponent,
               TeamComponent,
               WccComponent,
               WccListComponent,
               WccViewComponent,
               HomePageComponent,
               SalesListComponent,
               InfHistoryComponent,
               StatusOneEditComponent,
               DialogDComponent,
               MapViewComponent,
               InspectionScheduledComponent,
               ActiveScheduleComponent,
               ScheduledInfComponent,
               ReportDashviewComponent,
               KeyAbstractDashviewComponent,
               WccDashviewComponent,
               CertificateDashviewComponent,
               InspectionAnalysisComponent,
               CertificateAnalysisComponent,
               DataPreProcessComponent,
               DataBankComponent,
               DialogFComponent,
               ExcelUploadComponent,
               OrganizationMasterComponent,
               TypeMasterComponent,
               ProductMasterComponent,
               SubProductMasterComponent,
               LastSubProductMasterComponent,
               SendWhatsAppComponent,
               ProjectManageDataComponent,
               OemDetailsComponent,
               VendorDetailsComponent,
               TypeOfBuildingComponent,
               TravelAccomodationComponent,
               RegionDetailsComponent,
               InspectorTypeComponent,
               InspectionTypeComponent,
               InspectionTimeShiftComponent,
               InspectionTimeComponent,
               InspectionMasterComponent,
               CheckListComponent,
               Msf24Component,
               InspectorCvComponent,
               SignatureComponent,
               DefaultComponent,
               SpecPdfComponent,
               SpecCrudComponent,
               ApprovalReportComponent,
               NotApproveReportComponent,
               FeedbackPdfComponent,
               OrganizationDepartmentComponent,
               OrganizationRoleComponent,
               MailResponseCrudComponent,
               ExcelDashviewComponent,
               ExcelReportComponent,
               QrCodeComponent,
               ReportImagesComponent,
               RescheduleUpdateComponent,
               ClientDefaultCcComponent,
               ApprovalMailInspComponent,
               ApprovedScheduleMailComponent,
             
        // RejectionComponent,
        

        
  
  
        
      
  ],
  imports: [
    SignaturePadModule,
    // ExtendedPdfViewerModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxCaptchaModule,
    FormsModule,
    
    
    
    



    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSelectModule,
    MatNativeDateModule,
    NgxMatIntlTelInputComponent,
    MatMenuModule,
    MatCheckboxModule,
    MatDialogModule,
    MatTabsModule,
    
    MatIconModule,
    MatDividerModule,
    MatDatepickerModule,
    

  ],
  providers: [DatePipe,  { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }, // Set locale to 'en-GB' for 'DD/MM/YYYY' format
  { provide: MAT_DATE_FORMATS,
     useValue: { parse: { dateInput: 'DD/MM/YYYY' }, display: { dateInput: 'DD/MM/YYYY', monthYearLabel: 'MMM YYYY', dateA11yLabel: 'LL', monthYearA11yLabel: 'MMMM YYYY' } } },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
