import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyNavComponent } from './my-nav/my-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule } from "@angular/forms"

import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClientXsrfModule, HTTP_INTERCEPTORS  } from '@angular/common/http';

import { MatFormFieldModule, MatInputModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatCardModule } from '@angular/material';
import { AllStoriesComponent } from './all-stories/all-stories.component';
import { NewStoryComponent } from './new-story/new-story.component';
import { SigninComponent } from './signin/signin.component';
import { AboutComponent } from './about/about.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { KonvaModule } from 'ng2-konva';

import { routingModule } from './app.routing'

import { HttpXsrfInterceptor } from './app-interceptor';

// const appRoutes: Routes = [
//   {
//     path: 'home', component: MyNavComponent,
//     children: [
//       { path: 'all-stories', component: AllStoriesComponent },
//       { path: 'new-story', component: NewStoryComponent }
//     ]
//   }
// ];

@NgModule({
  declarations: [
    AppComponent,
    MyNavComponent,
    AllStoriesComponent,
    NewStoryComponent,
    SigninComponent,
    AboutComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    //RouterModule.forRoot(appRoutes),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    KonvaModule,
    HttpModule,
    HttpClientModule,
    HttpClientXsrfModule,
    routingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpXsrfInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
