# Custome Camera
- Auto focus
- Tap to focus
- Image preview
- Flash
- Rotate Camera

# Native Camera/Gallery
- react-native-image-picker


# Plugins

- RNCamera
    - $ npm install react-native-camera --save
    - $ react-native link react-native-camera
        - android/app/src/main/AndroidManifest.xml
            - <uses-permission android:name="android.permission.CAMERA" />
            - <uses-permission android:name="android.permission.RECORD_AUDIO"/>
            - <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
            - <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
        - android/app/build.gradle
            -  defaultConfig {
                    applicationId "com.cameraexample"
                    minSdkVersion rootProject.ext.minSdkVersion
                + missingDimensionStrategy 'react-native-camera', 'general'
                    targetSdkVersion rootProject.ext.targetSdkVersion
                    versionCode 1
                    versionName "1.0"

- react-native-image-picker [Awsome] [Take Image & Pick Image NATIVE]
    - npm i react-native-image-picker
    - react-native link react-native-image-picker
        - Refer doc for installaction (especially for IOS)
        - https://github.com/react-native-community/react-native-image-picker/blob/master/docs/Install.md