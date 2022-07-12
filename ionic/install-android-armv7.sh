
(
    adb uninstall io.ionic.starter
    
    #cd platforms/android/app/build/outputs/apk/armv7/release/
    #cd platforms/android/app/build/outputs/apk/armv7/debug/
    cd platforms/android/app/build/outputs/apk/debug/

    #adb install app-armv7-release.apk
    #adb install app-armv7-debug.apk
    adb install app-debug.apk

    adb shell am start -n io.ionic.starter/io.ionic.starter.MainActivity
)