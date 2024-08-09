# SDUF React Native Application

This repository contains the SDUF React Native application. Follow the instructions below to set up and run the project.

## Installation

1. Set Up Your Environment

[Doc here](https://reactnative.dev/docs/next/set-up-your-environment)

2. Clone the repository:

   ```sh
   git clone git@github.com:Dimakoua/sdufReactNative.git
   ```

3. Navigate to the project directory:

   ```sh
   cd sdufReactNative
   ```

4. Install the dependencies:
   ```sh
   npm install
   ```

## Configuration

1. Register an account [here](http://144.126.138.185).

2. Create a new project on the registration platform.

3. Edit the \`.env\` file in the project directory with the project ID and token you received after creating the project.

4. In order to use maps, register and get an API key from [Maptiler](https://www.maptiler.com/)

5. Inside the project, you can create a screen. **Note:** An 'index' screen is mandatory.

6. Open a screen and use the drag and drop feature available on the platform to set up one.

## Running the Application

To run the application on an Android device or emulator, execute the following command:

```sh
npx react-native run-android
```

## Prettier

format all files with Prettier:

```sh
npm run prettierFixAll
```

More details [here](https://prettier.io/docs/en/install)

## Notes

- This application currently supports only Android devices.
- This is the initial version of the application.

Enjoy!
