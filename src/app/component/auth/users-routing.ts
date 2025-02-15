import { Route } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { UsersAuthComponent } from "./users-auth.component";

export const USERS_ROUTES: Route[] = [
    {
      path: '',
      component: UsersAuthComponent,
      children: [
        {
          path: 'login',
          component: LoginComponent,
        },
        {
          path: 'signup',
          component: SignupComponent,
        },
        { path: 'forgot-password', component: ForgotPasswordComponent },
        { path: 'auth/reset-password', component: ResetPasswordComponent },
        // {
        //   path: 'dashboard',
        //   component: TripsComponent,
        //   canActivate: [AuthGuard],
        // },
        // {
        //   path: 'trips/:tripId',
        //   component: RequestedTripComponent,
        //   canActivate: [AuthGuard],
        // },
        // {
        //   path: 'trips/:tripId/quotes',
        //   component: QuotesComponent,
        // },
        // {
        //   path: 'trips/compare-quotes/:leadId',
        //   component: ComparisonComponent,
        // },
        // {
        //   path: 'invoice/:invoiceId',
        //   component: InvoiceComponent,
        // },
        // {
        //   path: 'profile',
        //   component: EditProfileComponent,
        // },
        // {
        //   path: 'edit-profile',
        //   component: EditProfileComponent,
        // },
      ],
    },
  ];