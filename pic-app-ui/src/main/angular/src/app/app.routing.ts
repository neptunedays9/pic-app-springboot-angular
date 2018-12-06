import { RouterModule, Routes } from '@angular/router';

import { ModuleWithProviders } from "@angular/core";

import { AllStoriesComponent } from './all-stories/all-stories.component';
import { NewStoryComponent } from './new-story/new-story.component';
import { LoginComponent } from './login/login.component';
import { MyNavComponent } from './my-nav/my-nav.component';
import { AboutComponent } from './about/about.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: MyNavComponent,
      children : [
        { path: 'all-stories', component: AllStoriesComponent },
        { path: 'new-story', component: NewStoryComponent },
        { path: 'about', component: AboutComponent }
      ]
  },
  { path: '**', component: PageNotFoundComponent }
];

export const routingModule: ModuleWithProviders = RouterModule.forRoot(appRoutes);
