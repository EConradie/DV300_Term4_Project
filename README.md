# Terpreter README

![Terpreter_readme](https://github.com/EConradie/DV300_Term4_Project/blob/main/assets/Banner.png?raw=true)

## Terpreter Overview

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React Native](https://img.shields.io/badge/React_Native-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)

## Overview

Terpreter is a contextualized translator app designed to provide both direct translations and additional context around each translation. Developed using Expo and TypeScript, Terpreter integrates Google’s services for translation, text-to-speech, and speech-to-text functionalities. It also uses OpenAI’s API to enhance translations with contextual insights, delivering more meaningful translations tailored to each user. Firebase handles backend services, including authentication and database management for saved translations.

## Features

- **Contextualized Translations**: Users receive translations with additional context, enhancing understanding.
- **Save Translations**: Users can save specific translations for easy reference.
- **Text-to-Speech and Speech-to-Text**: Google’s services enable spoken translations and transcription of spoken input.
- **User Authentication**: Firebase Authentication allows secure user login and registration.

## Tech Stack

- **Frontend**: Expo, TypeScript
- **Backend**: Firebase (Authentication, Firestore Database)
- **APIs**: Google Cloud (Translation, Text-to-Speech, Speech-to-Text), OpenAI (Contextual Translation)

## Database Structure

![Data structure](https://github.com/EConradie/DV300_Term4_Project/blob/main/assets/database.png?raw=true)

## Mockups

![Mockup](https://github.com/EConradie/DV300_Term4_Project/blob/main/assets/mockup1.png?raw=true)
![Mockup](https://github.com/EConradie/DV300_Term4_Project/blob/main/assets/mockup2.png?raw=true)

## Demonstration Video

https://drive.google.com/file/d/1sFK3pPXHia7ievcHFCaDtWfsMf_SikJE/view?usp=sharing

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- Expo CLI
- Firebase account
- Google Cloud API keys (Translation, Text-to-Speech, Speech-to-Text)
- OpenAI API key

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/YourUsername/Terpreter.git
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

### Running the App

3. **Configure Firebase and API Keys**:
    - Create a file named `firebase.js` inside a `config` directory in your project.
    - Open `config/firebase.js` and enter your Firebase configuration:
      ```typescript
      import { initializeApp } from "firebase/app";
      import { getAuth } from "firebase/auth";
      import { getFirestore } from "firebase/firestore";

      const firebaseConfig = {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_AUTH_DOMAIN",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_STORAGE_BUCKET",
        messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
        appId: "YOUR_APP_ID"
      };

      const app = initializeApp(firebaseConfig);

      export const auth = getAuth(app);
      export const db = getFirestore(app);
      ```
      - Replace placeholders with actual Firebase project details.

4. **Add Google Cloud and OpenAI API keys**:
    - Configure Google Cloud and OpenAI services in the project within the .env file to enable translation, text-to-speech, and context generation.

5. **Start the Expo development server**:
    ```bash
    expo start
    ```

6. **Open the app on a physical device or emulator**:
    - Scan the QR code with the Expo Go app or run it on an emulator for testing.

## Challenges Encountered

- **API Integration**: Balancing multiple APIs to handle translation, speech functionalities, and contextual generation.
- **Contextual Accuracy**: Ensuring OpenAI responses are relevant and tailored to users' needs.

## Future Enhancements

- Support for additional languages and dialects.
- Expanded context options, allowing users to customize context depth.
- Improved saving and categorization of translations for better organization.

## Peer Review Summary

As part of the development process, Terpreter underwent a peer review where three users provided valuable feedback on the app's features, usability, and performance.

### Review Participants

- **Hannah Naidoo** - Intermediate familiarity with translation apps
- **Christian Krahtz** - Intermediate familiarity with translation apps
- **Cameron Godwin** - Advanced familiarity with translation apps

### Key Findings

- **User Interface**: The app's interface received positive feedback, with ratings of 4 and 5 out of 5, and users found it easy to navigate. Suggested improvements included enhancing clarity for language-switching options and refining the layout of translation information.

- **Navigation and Usability**: Users appreciated the ease of navigation but highlighted minor issues with scrolling. Some found the scrolling to be "stuck" at times, impacting the overall experience.

- **App Responsiveness and Speed**: Rated as responsive, with ratings of 3, 4, and 5, users noted that the app handled translations and other actions efficiently.

- **Translation Accuracy and Context**: All users rated the accuracy and context of translations as excellent (5/5). They appreciated the added context provided by OpenAI’s API, which helped in learning more about language nuances.

- **Most Enjoyable Features**:
  - High accuracy of translations.
  - Quick switching between languages.
  - Voice-to-text functionality and in-depth contextual explanations for translations.

- **Least Enjoyable Features**:
  - Layout of translation information, which some found overwhelming.
  - Scrolling issues, as multiple users experienced difficulty scrolling to the bottom.

### Suggested Improvements

- **Scrolling Improvements**: Address issues with page scrolling for smoother navigation.
- **Visual Indications for Recording**: Provide clearer visual feedback for when recording starts and stops during voice input.
- **Automatic Language Detection**: Implement a feature to detect the spoken language automatically, enhancing usability for multilingual contexts.

### Overall Impressions

Reviewers expressed enthusiasm about Terpreter, noting its user-friendly design and extensive functionality compared to other translation apps. They described the app as "very user-friendly," "extremely impressive," and “the best I’ve ever seen” in comparison to Google Translate.

### Additional Comments

- **Hannah Naidoo**: "I really enjoyed using the app. If you just tweak the app slightly it will definitely be something I can see being used in the future. Well done Erik!"
- **Christian Krahtz**: "Really awesome functionality, I'm blown away!"

This feedback will guide future improvements, ensuring Terpreter meets users’ needs and expectations as a powerful translation tool.


## Contributing

Contributions are welcome! For major changes, please open an issue first to discuss.

## License

[MIT](LICENSE) © Erik Conradie
