import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'login',
        children: [
          {
            path: '',
            loadChildren: '../login/login.module#LoginPageModule'
          }
        ]
      },
      {
        path: 'register',
        children: [
          {
            path: '',
            loadChildren: '../register/register.module#RegisterPageModule'
          }
        ]
      },
      {
        path: 'category',
        children: [
          {
            path: '',
            loadChildren: '../category/category.module#CategoryPageModule'
          }
        ]
      },
      {
        path: 'service',
        children: [
          {
            path: '',
            loadChildren: '../service/service.module#ServicePageModule'
          }
        ]
      },
      {
        path: 'option',
        children: [
          {
            path: '',
            loadChildren: '../option/option.module#OptionPageModule'
          }
        ]
      },
      {
        path: 'form',
        children: [
          {
            path: '',
            loadChildren: '../form/form.module#FormPageModule'
          }
        ]
      },
      {
        path: 'job',
        children: [
          {
            path: '',
            loadChildren: '../job/job.module#JobPageModule'
          }
        ]
      },
      {
        path: 'jobview',
        children: [
          {
            path: '',
            loadChildren: '../jobview/jobview.module#JobviewPageModule'
          }
        ]
      },
      {
        path: 'inbox',
        children: [
          {
            path: '',
            loadChildren: '../inbox/inbox.module#InboxPageModule'
          }
        ]
      },
      {
        path: 'quotation',
        children: [
          {
            path: '',
            loadChildren: '../quotation/quotation.module#QuotationPageModule'
          }
        ]
      },
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: '../home/home.module#HomePageModule'
          }
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: '../profile/profile.module#ProfilePageModule'
          }
        ]
      },
      {
        path: 'help',
        children: [
          {
            path: '',
            loadChildren: '../help/help.module#HelpPageModule'
          }
        ]
      },
      {
        path: 'hero',
        children: [
          {
            path: '',
            loadChildren: '../hero/hero.module#HeroPageModule'
          }
        ]
      },
      {
        path: 'summary',
        children: [
          {
            path: '',
            loadChildren: '../summary/summary.module#SummaryPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
