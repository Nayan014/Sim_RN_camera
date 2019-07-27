# Custome Camera [Link]
- Auto focus
- Tap to focus
- Image preview
- Flash
- Rotate Camera

# Native Camera/Gallery [Link]
- Take Image from camera [Native] 
- Pic image from gallary [Native]

# Image View [Without Link :)]
- Image Preview
- Zoom in & out
- Slide down to close
- Image count on top


# Need to fix
- react-native-image-picker
    - taking image in android takes time. :(


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

- react-native-image-viewer [Without Link :)]
    - npm i react-native-image-zoom-viewer --save