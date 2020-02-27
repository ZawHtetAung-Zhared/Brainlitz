// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  enableDebug: true,
  response_type: 'code',
  grant_type: 'authorization_code',
  orgID: '5b063e2636f2e0f83cdbac88',

  // orgID: '5b063e2636f2e0f83cdbac88',
  // apiurl: 'http://192.168.1.106:8484'
  // apiurl: 'http://dev-app.brainlitz.com',
  apiurl: 'https://app-admin.brainlitz.com',
  // apiurl: ' https://dev-brainlitz.pagewerkz.com',
  // apiurl: 'https://staging-brainlitz.pagewerkz.com',
  courseTypeDisabled: false,
  livechatDisabled: false,
  environmentName: 'production'
};
