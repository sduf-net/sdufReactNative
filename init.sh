#!/bin/sh
# Exit immediately if a command exits with a non-zero status.
set -e

# Check if essential environment variables are set before creating .env file
if [ -z "$APP_ENV" ] || [ -z "$URL" ] || [ -z "$SOCKET_PROJECT_TOKEN" ] || [ -z "$SOCKET_PROJECT_ID" ] || [ -z "$styleURL" ]; then
    echo "Critical environment variables are missing."
    exit 1
fi

# Create a .env file with environment variables
echo "Creating environment variables..."
{
    echo "APP_ENV=${APP_ENV}"
    echo "URL=${URL}"
    echo "SOCKET_PROJECT_TOKEN=${SOCKET_PROJECT_TOKEN}"
    echo "SOCKET_PROJECT_ID=${SOCKET_PROJECT_ID}"
    echo "styleURL=${styleURL}"
} > .env

echo "Environment variables set."

# Replace strings in all project files, avoiding the .git and other directories
echo "Replacing package names in the project..."
# Replace strings in all project files, avoiding the .git and other directories
find . -type f -not -path '*/\.git/*' -not -name 'docker-compose.yml' -exec sed -i "s/com.sdufnative/${APP_PACKAGE_NAME}/g" {} +

echo "Configuring app.json..."
# Replace string specifically in app.json
find app.json -type f -not -path '*/\.git/*' -not -name 'docker-compose.yml' -exec sed -i "s/sdufNative/${APP_NAME}/g" {} +
find android/app/src/main/res/values -name "strings.xml" -type f -exec sed -i "s/sdufNative/${APP_NAME}/g" {} +

# Gather environment info
echo "Gathering environment info..."
npm install -g envinfo
if command -v envinfo >/dev/null; then
    envinfo
else
    echo "envinfo is not installed. Please install it globally using 'npm install -g envinfo'."
    exit 1
fi

echo "Installing dependencies..."
yarn install
chmod +x node_modules/.bin/

export APP_ENV=${APP_ENV}
export URL=${URL}
export SOCKET_PROJECT_TOKEN=${SOCKET_PROJECT_TOKEN}
export SOCKET_PROJECT_ID=${SOCKET_PROJECT_ID}
export styleURL=${styleURL}

# Navigate to android directory and prepare for build
echo "Preparing Android build..."
cd android
chmod +x gradlew
./gradlew assembleRelease --max-workers=3 --no-daemon

# Move APK files to a shared volume
echo "Moving APK files..."
# Loop through each APK file found in the release directory
for apk in ./app/build/outputs/apk/release/*.apk; do
    # Construct the new file name with SOCKET_PROJECT_ID
    new_filename="${SOCKET_PROJECT_ID}_$(basename "$apk")"
    
    # Copy the APK file to the shared directory with the new name
    cp "$apk" "/shared/${new_filename}"
done
echo "Files moved successfully."

echo "Setup complete. Executing command..."
# Execute the command specified to `docker run` or docker-compose
exec "$@"
