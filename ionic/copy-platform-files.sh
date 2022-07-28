rm -R platforms/android/app/src/main/res/drawable-land-hdpi/
rm -R platforms/android/app/src/main/res/drawable-land-ldpi/
rm -R platforms/android/app/src/main/res/drawable-land-mdpi/
rm -R platforms/android/app/src/main/res/drawable-land-xhdpi/
rm -R platforms/android/app/src/main/res/drawable-land-xxhdpi/
rm -R platforms/android/app/src/main/res/drawable-land-xxxhdpi/

rm -r platforms/android/app/src/main/res/mipmap-hdpi-v26
rm -r platforms/android/app/src/main/res/mipmap-ldpi-v26
rm -r platforms/android/app/src/main/res/mipmap-mdpi-v26
rm -r platforms/android/app/src/main/res/mipmap-xhdpi-v26
rm -r platforms/android/app/src/main/res/mipmap-xxhdpi-v26
rm -r platforms/android/app/src/main/res/mipmap-xxxhdpi-v26

rm -R platforms/android/res/mipmap-hdpi/icon.png
cp -R custom_platforms/android/res/mipmap-hdpi/icon.png platforms/android/app/src/main/res/mipmap-hdpi/icon.png
cp -R custom_platforms/android/res/mipmap-hdpi/icon.png platforms/android/app/src/main/res/mipmap-hdpi/ic_launcher.png
cp -R custom_platforms/android/res/mipmap-hdpi/icon.png platforms/android/app/src/main/res/mipmap-hdpi/ic_launcher_background.png

rm -R platforms/android/app/src/main/res/mipmap-ldpi/icon.png
cp -R custom_platforms/android/res/mipmap-ldpi/icon.png platforms/android/app/src/main/res/mipmap-ldpi/icon.png
cp -R custom_platforms/android/res/mipmap-ldpi/icon.png platforms/android/app/src/main/res/mipmap-ldpi/ic_launcher.png
cp -R custom_platforms/android/res/mipmap-ldpi/icon.png platforms/android/app/src/main/res/mipmap-ldpi/ic_launcher_background.png

rm -R platforms/android/app/src/main/res/mipmap-mdpi/icon.png
cp -R custom_platforms/android/res/mipmap-mdpi/icon.png platforms/android/app/src/main/res/mipmap-mdpi/icon.png
cp -R custom_platforms/android/res/mipmap-mdpi/icon.png platforms/android/app/src/main/res/mipmap-mdpi/ic_launcher.png
cp -R custom_platforms/android/res/mipmap-mdpi/icon.png platforms/android/app/src/main/res/mipmap-mdpi/ic_launcher_background.png

rm -R platforms/android/app/src/main/res/mipmap-xhdpi/icon.png
cp -R custom_platforms/android/res/mipmap-xhdpi/icon.png platforms/android/app/src/main/res/mipmap-xhdpi/icon.png
cp -R custom_platforms/android/res/mipmap-xhdpi/icon.png platforms/android/app/src/main/res/mipmap-xhdpi/ic_launcher.png
cp -R custom_platforms/android/res/mipmap-xhdpi/icon.png platforms/android/app/src/main/res/mipmap-xhdpi/ic_launcher_background.png

rm -R platforms/android/app/src/main/res/mipmap-xxhdpi/icon.png
cp -R custom_platforms/android/res/mipmap-xxhdpi/icon.png platforms/android/app/src/main/res/mipmap-xxhdpi/icon.png
cp -R custom_platforms/android/res/mipmap-xxhdpi/icon.png platforms/android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png
cp -R custom_platforms/android/res/mipmap-xxhdpi/icon.png platforms/android/app/src/main/res/mipmap-xxhdpi/ic_launcher_background.png

rm -R platforms/android/app/src/main/res/mipmap-xxxhdpi/icon.png
cp -R custom_platforms/android/res/mipmap-xxxhdpi/icon.png platforms/android/app/src/main/res/mipmap-xxxhdpi/icon.png
cp -R custom_platforms/android/res/mipmap-xxxhdpi/icon.png platforms/android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png
cp -R custom_platforms/android/res/mipmap-xxxhdpi/icon.png platforms/android/app/src/main/res/mipmap-xxxhdpi/ic_launcher_background.png

rm -R platforms/android/app/src/main/res/drawable-port-hdpi/screen.png
rm -R platforms/android/app/src/main/res/drawable-port-ldpi/screen.png
rm -R platforms/android/app/src/main/res/drawable-port-mdpi/screen.png
rm -R platforms/android/app/src/main/res/drawable-port-xhdpi/screen.png
rm -R platforms/android/app/src/main/res/drawable-port-xxhdpi/screen.png
rm -R platforms/android/app/src/main/res/drawable-port-xxxhdpi/screen.png

cp -R custom_platforms/android/res/drawable-port-hdpi/screen.9.png platforms/android/app/src/main/res/drawable-port-hdpi/screen.9.png
cp -R custom_platforms/android/res/drawable-port-ldpi/screen.9.png platforms/android/app/src/main/res/drawable-port-ldpi/screen.9.png
cp -R custom_platforms/android/res/drawable-port-mdpi/screen.9.png platforms/android/app/src/main/res/drawable-port-mdpi/screen.9.png
cp -R custom_platforms/android/res/drawable-port-xhdpi/screen.9.png platforms/android/app/src/main/res/drawable-port-xhdpi/screen.9.png
cp -R custom_platforms/android/res/drawable-port-xxhdpi/screen.9.png platforms/android/app/src/main/res/drawable-port-xxhdpi/screen.9.png
cp -R custom_platforms/android/res/drawable-port-xxxhdpi/screen.9.png platforms/android/app/src/main/res/drawable-port-xxxhdpi/screen.9.png

rm -r platforms/ios/MyApp/Images.xcassets;
cp -R custom_platforms/ios/Images.xcassets platforms/ios/MyApp/Images.xcassets

#rm -r platforms/android/keystore;
#mkdir platforms/android/keystore;
#cp -R custom_platforms/android/keystore/key-for-visit-tula.keystore platforms/android/keystore/key-for-visit-tula.keystore
#cp -R custom_platforms/android/release-signing.properties platforms/android/release-signing.properties

#cp -R custom_platforms/google-services.json platforms/android/app/google-services.json
#cp -R custom_platforms/google-services.json platforms/android/google-services.json
#cp -R custom_platforms/google-services.json platforms/android/app/src/main/google-services.json