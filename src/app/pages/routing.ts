import { Routes } from '@angular/router';

const Routing: Routes = [
  {
    path: 'dashboard2',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'builder',
    loadChildren: () =>
      import('./builder/builder.module').then((m) => m.BuilderModule),
  },
  {
    path: 'crafted/pages/profile',
    loadChildren: () =>
      import('../modules/profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'crafted/account',
    loadChildren: () =>
      import('../modules/account/account.module').then((m) => m.AccountModule),
  },

  {
    path: 'cenarios',
    loadChildren: () =>
      import('../modules/cenarios/cenarios.module').then((m) => m.CenariosModule),
  },
  {
    path: 'cenarios-risco',
    loadChildren: () =>
      import('../modules/cenarios-risco/cenarios-risco.module').then((m) => m.CenariosRiscoModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('../modules/dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'cadastros',
    loadChildren: () =>
      import('../modules/cadastros/cadastros.module').then((m) => m.CadastrosModule),
  },
  {
    path: 'crafted/pages/wizards',
    loadChildren: () =>
      import('../modules/wizards/wizards.module').then((m) => m.WizardsModule),
  },
  {
    path: 'crafted/widgets',
    loadChildren: () =>
      import('../modules/widgets-examples/widgets-examples.module').then(
        (m) => m.WidgetsExamplesModule
      ),
  },
  {
    path: 'apps/chat',
    loadChildren: () =>
      import('../modules/apps/chat/chat.module').then((m) => m.ChatModule),
  },
  {
    path: '',
    redirectTo: '/dashboard/index',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };

