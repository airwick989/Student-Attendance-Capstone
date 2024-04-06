[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<div align="center">
  <a href="https://github.com/airwick989/Student-Attendance-Capstone">
    <img src="https://github.com/airwick989/Student-Attendance-Capstone/blob/main/instructor-app/src/app/assets/Logo.svg" alt="Logo" width="400" height="300">
  </a>

<h3 align="center">ATTEND-OT</h3>

  <p align="center">
    Student attendance and classroom map tracker.
    <br />
    <a href="https://github.com/airwick989/Student-Attendance-Capstone"><strong>Explore the docs »</strong></a>
    <br />
    <br />
  </p>
</div>


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a>
          <ul>
            <li><a href="#cloud-functions">Cloud Functions</li>
            <li><a href="#instructor-app">Instructor App</li>
            <li><a href="#student-mobile-application">Student Mobile App</li>
          </ul>
        </li>
      </ul>
    </li>
    <li> <a href="#additional-resources">Additional Resources</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

Ontario Tech University student tracking system that streamlines classroom attendance monitoring. This solution consists of a mobile application for students and a web portal for professors. Students log in through the mobile app. Inside the classroom, they scan a QR code located at their chosen seat. This action signals their presence, and the information is transmitted to a cloud database. The database updates a real-time map on the professor's web portal, displaying the students' seat locations based on the scanned QR codes. When a professor hovers over a student's marker on the map, they can access relevant student information such as name, pronouns, and student ID number.


### Built With

* [![Next][Next.js]][Next-url]
* [![React][React.js]][React-url]
* [![TailwindCSS][TailwindCSS]][tailwind-url]
* [![Google Cloud Functions][Google Cloud]][google-cloud-url]
* [![Firebase][Firebase]][firebase-url]


<!-- GETTING STARTED -->
## Getting Started

This guide can be used to set up an instance of the attendance tracker and services. 
This guide assumes that you have Node.js installed on your system and an existing Firebase project.

### Prerequisites

You will need the latest version of NPM, along with the Firebase CLI.
* npm
  ```sh
  npm install npm@latest -g
  ```
* firebase-tools
  ```sh
  npm install -g firebase-tools
  ```

For the mobile application, it is recommended that you use the [Expo Go](https://expo.dev/go) app to sideload 
the application on your device

### Installation

1. Fork this repo [here](https://github.com/airwick989/Student-Attendance-Capstone/fork).
2. Clone the repo.
   ```sh
   git clone https://github.com/github_username/repo_name.git
   ```
#### Cloud Functions

It should be noted that unless you have Firebase CLI emulator set up, Cloud Function services will run in production. 
As such, you will need to have an existing Firebase project. Details on Firebase CLI emulator can be found [here](https://firebase.google.com/docs/emulator-suite/install_and_configure). 

Hosting Cloud Functions will require an active Firebase Blaze plan for your project, more details can be found [here](https://firebase.google.com/pricing).

All files associated with the Cloud Functions can be found in the ```cloud-functions``` folder of this repo.

1. Follow the [instructions](https://firebase.google.com/docs/functions/get-started?gen=1st) for setting
   up Cloud Functions using Firebase integration.
2. Deploy your functions.
   ```sh
    firebase deploy --only functions
   ```

#### Instructor App

1. In the ```instructor-app``` folder, run ```npm install``` to load project dependencies.
2. Create an ```.env.local``` file to store the necessary environment variables. Note that these variables should never be committed to
   a public repository. Most of these variables will be found from your Firebase project.
   The remaining variables are used for NextAuth.js, which can be found [here](https://next-auth.js.org/providers/google).

   The general format of your file will include the following:
```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
FIREBASE_DATABASE_URL=your_firebase_db_url
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
FIREBASE_APP_ID=your_firebase_app_id
FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id

NEXTAUTH_URL=_your_nextauth_url
NEXTAUTH_SECRET=your_nextauth_secret
NEXT_PUBLIC_API_URL=your_next_public_api_url

```

3. Refer to the [README.md](https://github.com/airwick989/Student-Attendance-Capstone/tree/main/instructor-app) for instructions on
   running the web app locally.

4. Deploy on a platform of your choice, the easiest method would be using Vercel. Instructions can be found [here](https://vercel.com/docs/getting-started-with-vercel/import).

#### Student Mobile Application

Note that this component will require deployment through the [Apple](https://docs.expo.dev/submit/ios/) and [Google Play](https://docs.expo.dev/submit/android/) stores.

1. Clone the repo as provided.
      ```sh
   git clone https://github.com/MFrackCA/React-Mobile-Student-app.git
   ```
2. In the project directory, run ```npm install``` to load project dependencies.
3. Start the Expo server
    ```sh
    npx expo start
    ```
4. Refer to [further](https://docs.expo.dev/guides/local-app-development/) development instructions


## Additional Resources

### Next.js
https://nextjs.org/docs/app

### Firebase Cloud Functions
https://firebase.google.com/docs/functions

### Expo Go
https://expo.dev/


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/airwick989/Student-Attendance-Capstone.svg?style=for-the-badge
[contributors-url]: https://github.com/airwick989/Student-Attendance-Capstone/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/airwick989/Student-Attendance-Capstone.svg?style=for-the-badge
[forks-url]: https://github.com/airwick989/Student-Attendance-Capstone/network/members
[stars-shield]: https://img.shields.io/github/stars/airwick989/Student-Attendance-Capstone.svg?style=for-the-badge
[stars-url]: https://github.com/airwick989/Student-Attendance-Capstone/stargazers
[issues-shield]: https://img.shields.io/github/issues/airwick989/Student-Attendance-Capstone.svg?style=for-the-badge
[issues-url]: https://github.com/airwick989/Student-Attendance-Capstone/issues
[license-shield]: https://img.shields.io/github/license/airwick989/Student-Attendance-Capstone.svg?style=for-the-badge
[license-url]: https://github.com/airwick989/Student-Attendance-Capstone/blob/main/LICENSE
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Google Cloud]: https://img.shields.io/badge/Google_Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white
[google-cloud-url]: https://cloud.google.com/functions?hl=en
[TailwindCSS]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[tailwind-url]: https://tailwindcss.com/
[Firebase]: https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black
[firebase-url]: https://firebase.google.com/
