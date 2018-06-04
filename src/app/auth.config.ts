import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
     
  issuer: 'https://dev-brainlitz.pagewerkz.com/dialog/authorize/5b063e2636f2e0f83cdbac88/',  
  redirectUri: 'http://localhost:4200/#/',
  clientId: 'weblocal',
  dummyClientSecret: 'weblocal',
  scope: 'openid profile email voucher',
  oidc: false,
  requestAccessToken: true,
  responseType: 'code',
  showDebugInformation: true,
  requireHttps: true

}