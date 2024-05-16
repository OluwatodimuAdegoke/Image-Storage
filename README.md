# Photo and Video Gallery App

This is a React Native application that allows users to upload images and videos from their device's media library to a Firebase storage bucket. The uploaded files are then displayed in a gallery view within the app.

## Features

- Upload images and videos from the device's media library
- Display uploaded images and videos in a grid layout
- Progress bar for tracking upload progress
- Firebase integration for file storage and database

## Prerequisites

Before running the app, make sure you have the following installed:

- Node.js
- Expo CLI
- Firebase account and project set up

## Installation

1. Clone the repository:
2. Install the dependencies:
		npx expo install expo-av - allows us to have medid (video,sound,image...)
		npx expo install firebase - firebase...
		npx expo install expo-dev-client - required for the community blur
		npx expo install react-native-svg - for svg files
		npx expo install expo-image-picker - to open images
		npm install @react-native-community/blur - blur background

4. Set up Firebase:

- Create a new Firebase project in the Firebase console.
- Enable the Firebase Storage and Firestore services.
- Create a `firebaseConfig.js` file in the root directory of the project and add your Firebase configuration:

```javascript
import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

const firebaseConfig = {
  // Your Firebase configuration object
};

firebase.initializeApp(firebaseConfig);

export const storage = firebase.storage();
export const db = firebase.firestore();

``````
## Template: https://www.youtube.com/watch?v=cq5TGA6sBQQ&t=191s
