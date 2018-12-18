import { RouterModule, Routes } from '@angular/router';

import { ModuleWithProviders } from "@angular/core";

import { AllStoriesComponent } from './all-stories/all-stories.component';
import { NewStoryComponent } from './new-story/new-story.component';
import { SigninComponent } from './signin/signin.component';
import { MyNavComponent } from './my-nav/my-nav.component';
import { AboutComponent } from './about/about.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'signin'},
  { path: 'signin', component: SigninComponent },
  // { path: '', redirectTo: '/signin'},
  { path: 'home', component: MyNavComponent,
  children : [
    { path: 'all-stories', component: AllStoriesComponent },
    { path: 'new-story', component: NewStoryComponent },
    { path: 'about', component: AboutComponent }
  ]
}];

export const routingModule: ModuleWithProviders = RouterModule.forRoot(appRoutes,  { enableTracing: true });
