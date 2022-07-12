echo ' --- Get git version and write to file'
git_log_file='src/assets/json//git_curr_version.json'
git_log_dir="${git_log_file%/*}"

# сhecking the existence of a directory before write to it.
([[ -d $git_log_dir ]] || mkdir -p $git_log_dir) && git log --format=medium --pretty='{"hash": "%H","author":"%an", "date": "%cd"}' -1 > $git_log_file


warn () { echo -e "\033[37;43;1m Warning \033[0m $1"; }

warn "run command like bash build.sh type='alexander/production/sales/test' isVpp='true/false' build='release'"

echo '---Begin build'

rm -r www
rm -r platforms/android/app/build
mkdir www

#ionic cordova build ios --release

ionic cordova build android --prod
#ionic cordova build android --prod -- -- --gradleArg=-PcdvBuildMultipleApks=true
