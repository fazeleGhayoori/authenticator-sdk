# Iranian Authenticator

Use Finnotech authentication .

## Getting started

### Installing and using

Install from npm:

```
npm install --save authenticator-sdk
```

```
yarn add authenticator-sdk
```

authenticator-sdk lets you authenticate your user with Finnotech services

We are developing user authentication, which we have started with Finnotech SDK,
which is a comprehensive Iranian authentication system.

## How to use

```javascript
import Finnotech from 'authenticator-sdk'

// You will have these values after creating an account in Finnotech service
const finnotech = new Finnotech({
    clientId: 'FINNOTECH_CLIENT_ID',
    clientPass: 'FINNOTECH_CLIENT_PASSWORD',
    clientNationalCode: 'FINNOTECH_CLIENT_NATIONALCODE',
})

//Returns a Boolean value indicating whether the phone number matches the national code or not
console.log(finnotech.matchPhoneNumberWithNationalCode(phoneNumber, nationalCode));

// Example response 
// {
//     "responseCode": "FN-FYKZ-20001000000",
//     "trackId": "******",
//     "result": {
//         "isValid": true
//     },
//     "status": "DONE"
// }
```



