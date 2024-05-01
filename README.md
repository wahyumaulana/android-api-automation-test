# android-api-automation-test
This repository is used for Mobile app and API automation using Appium WebdriverIO and JavaScript. This repository is implemented using the Page Object Model (POM) design pattern

### Installation

1. Clone this repository to your local machine

2. Navigate to the project directory:
```sh
$ cd android-api-automation-test
```
3. Install the dependencies:
```sh
$ npm install
```

### Running the Tests

Before running the test, you need to create file .env, you can copy from env.example,
and for user credential you can create new one or for evaluation I already attached on email

To run the mobile tests, use the following command

- To run the tests with specific tags, example for `@transaction` tag
```sh
$ npm run test @transaction
```
- To run the tests on specific file, example for `transaction` spec file
```sh
$ npx wdio run ./wdio.conf.js --spec ./test/android/specs/transactions.spec.js
```

To run the API tests, use the following command
- To run the tests with specific tags, example for `@GET` tag
```sh
$ npm run api-test @API_1
```
- To run All API test
```sh
$ npm run api
```

### Test Result
- Mobile
  ![Mobile](https://github.com/wahyumaulana/android-api-automation-test/blob/master/reports/report.png)
- API
  ![API](https://github.com/wahyumaulana/android-api-automation-test/blob/master/reports/api-report.png)