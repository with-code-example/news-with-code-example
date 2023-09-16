import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthService } from './modules/auth/auth.service';
import { QuicklinkModule, QuicklinkStrategy } from 'ngx-quicklink';



const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/home/home.module').then(mod => mod.HomeModule),
    data: {
      preload: true
    }
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(mod => mod.AuthModule),
    data: {
      preload: true
    }
  },
  // {
  //   path: 'user',
  //   loadChildren: () => import('./modules/user/user.module').then(mod => mod.UserModule),
  //   canActivate: [AuthService]
  // },
  // { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // initialNavigation: 'enabledBlocking',
    preloadingStrategy: QuicklinkStrategy 
  }),
  QuicklinkModule
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }