import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from './app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { SampleModule } from 'app/main/sample/sample.module';
import { LoginModule } from './main/page/login/login.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpInterceptorBaseAuthService } from './services/http-interceptor-base-auth.service';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AgmCoreModule } from '@agm/core';
import {MatSortModule} from '@angular/material/sort';

//API SERVICE 
import { ApiserviceService } from './services/apiservice.service';
import { AppSettings } from './app.constant';
import { AuthGuardGuard } from './auth-guard.guard';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule, NgxUiLoaderConfig, SPINNER, POSITION, PB_DIRECTION, } from "ngx-ui-loader";
import { ForgotPasswordComponent } from './main/page/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './main/page/reset-password/reset-password.component';
import { UserService } from "./main/page/login/user.service";


const ngxUiLoaderConfig: NgxUiLoaderConfig = {
    bgsColor: 'rgba(12,80,219,0.98)',
    bgsPosition: POSITION.bottomCenter,
    fgsColor: '#4caf50',
    bgsSize: 40,
    bgsType: SPINNER.rectangleBounce, // background spinner type
    fgsType: SPINNER.chasingDots, // foreground spinner type
    pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
    pbThickness: 5, // progress bar thickness
};

const appRoutes: Routes = [
    { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
    { path: '', loadChildren: './main/page/page.module#PageModule', canActivate: [AuthGuardGuard] },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'reset-password/:id', component: ResetPasswordComponent, },
];

@NgModule({
    declarations: [AppComponent],
    imports: [
        // BrowserModule, 
        CommonModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes, { useHash: false }),
        NgxUiLoaderHttpModule.forRoot({ showForeground: true }),
        NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
        TranslateModule.forRoot(),
        MatSnackBarModule,
        MatSortModule,
        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatDatepickerModule,
        MatRadioModule,
        MatCheckboxModule,
        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        ReactiveFormsModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        SampleModule,
        LoginModule,
        AgmCoreModule.forRoot({
            // apiKey: 'GOOGLE API KEY',
            // libraries: ['places']
        }),
    ],
    bootstrap: [
        AppComponent
    ],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorBaseAuthService, multi: true }, ApiserviceService, AppSettings, UserService]
})
export class AppModule {
}
