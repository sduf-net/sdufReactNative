#!/bin/sh
# Exit immediately if a command exits with a non-zero status.
set -e

# Create a .env file with environment variables
echo "Creating environment variables..."
echo "APP_ENV=${APP_ENV}" > .env
echo "URL=https://demo-sduf.gigalixirapp.com" >> .env
echo "SOCKET_URL=https://demo-sduf.gigalixirapp.com/socket" >> .env
echo "SOCKET_PROJECT_TOKEN=${SOCKET_PROJECT_TOKEN}" >> .env
echo "SOCKET_PROJECT_ID=${SOCKET_PROJECT_ID}" >> .env
echo "styleURL=${styleURL}" >> .env

# Check if essential environment variables are set
if [ -z "$APP_ENV" ] || [ -z "$SOCKET_PROJECT_TOKEN" ]; then
    echo "Critical environment variables are missing."
    exit 1
fi

echo "Environment variables set."

# Replace strings in all project files, avoiding the .git and other directories
echo "Replacing package names in the project..."
# Replace strings in all project files, avoiding the .git and other directories
find . -type f -not -path '*/\.git/*' -not -name 'docker-compose.yml' -exec sed -i 's/com.sdufnative/${APP_PACKAGE_NAME}/g' {} +

echo "Configuring app.json..."
# Replace string specifically in app.json
find app.json -type f -not -path '*/\.git/*' -not -name 'docker-compose.yml' -exec sed -i 's/sdufNative/${APP_NAME}/g' {} +

# Run other necessary commands
echo "Gathering environment info..."
npx envinfo

echo "Installing dependencies..."
yarn install

# Navigate to android directory and prepare for build
echo "Preparing Android build..."
cd android
chmod +x gradlew
./gradlew --no-daemon assembleRelease

# Move APK files to a shared volume
echo "Moving APK files..."
cp -r ./app/build/outputs/apk/release/*.apk /shared/

echo "Setup complete. Executing command..."
# Execute the command specified to `docker run` or docker-compose
exec "$@"
