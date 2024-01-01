import { NgModule } from '@angular/core';
import { PreloadAllModules, PreloadingStrategy, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ResourcesComponent } from './resources/resources.component';
import { CommunityComponent } from './community/community.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const websiteName = 'Mentor Mole';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'about-us', component: AboutUsComponent, title: `${websiteName} - About Us`},
  { path: 'resources', component: ResourcesComponent, title: `${websiteName} - Resources`},
  { path: 'community', component: CommunityComponent, title: `${websiteName} - Community`},
  { path: '**', pathMatch: 'full', component: PagenotfoundComponent, title: `${websiteName} - 404`}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
