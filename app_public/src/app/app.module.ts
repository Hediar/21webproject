import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing/app-routing.module';

import { HomeListComponent } from './home-list/home-list.component';
import { DistancePipe } from './distance.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FrameworkComponent } from './framework/framework.component';
import { AboutComponent } from './about/about.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HtmlLineBreaksPipe } from './html-line-breaks.pipe';
import { LocationDetailsComponent } from './location-details/location-details.component';
import { DetailsPageComponent } from './details-page/details-page.component';
import { RatingStarsComponent } from './rating-stars/rating-stars.component';
import { MostRecentFirstPipe } from './most-recent-first.pipe';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    HomeListComponent,
    DistancePipe,
    FrameworkComponent,
    AboutComponent,
    HomepageComponent,
    PageHeaderComponent,
    SidebarComponent,
    HtmlLineBreaksPipe,
    LocationDetailsComponent,
    DetailsPageComponent,
    RatingStarsComponent,
    MostRecentFirstPipe,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [FrameworkComponent]
})
export class AppModule { }
