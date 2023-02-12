# add the authorization component to the app.component.html
<app-authorization></app-authorization>


# provider to the app.module.ts
{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },

# declarations of Authorization Component
AuthorizationComponent
