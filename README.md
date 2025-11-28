# MSE343 Endings 4: Omega

## Build Instructions
You'll need Node.js installed on your computer for this. Any LTS version from here should do: https://nodejs.org/en/download

From the root of the repository, run:
```
npm i
```

### Web Build
After, to run the application on your local machine on the web, run:
```
npm start
```
Then press `w` to open the app in web mode. 

### iOS Build
1. Download [Expo Go](https://apps.apple.com/us/app/expo-go/id982107779) from the App Store.
2. Install this dependency for network tunneling: `npm i -g @expo/ngrok`
3. Run `npx expo start --tunnel`
4. Press `s` on your keyboard to switch to Expo Go.
5. Scan the QR code from your terminal with your iOS device.
6. Click on the button below:

<img width="1381" height="120" alt="image" src="https://github.com/user-attachments/assets/0502ff76-3985-446d-890c-4ce890cbc84a" />

7. Click on the **3 dots**.
8. Click on **Request Mobile Website**
9. Finally, click on **Expo Go**, then **Open** to open the app.
Once the app finishes building, you should see the main home page.
