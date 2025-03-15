#!/bin/sh
set -e  # Exit immediately if a command fails

trap 'echo "Error occurred in command: $BASH_COMMAND"; exit 1' ERR
# Detect system architecture and set JAVA_HOME dynamically
arch=$(uname -m)
if [ "$arch" = "x86_64" ]; then
    echo "Setting JAVA_HOME for x86_64"
    export JAVA_HOME="/usr/lib/jvm/java-17-openjdk-amd64"
elif [ "$arch" = "aarch64" ]; then
    echo "Setting JAVA_HOME for ARM64"
    export JAVA_HOME="/usr/lib/jvm/java-17-openjdk-arm64"
else
    echo "Unknown architecture: $arch"
    exit 1
fi

echo "JAVA_HOME is set to: $JAVA_HOME"
export PATH="$JAVA_HOME/bin:$PATH"

# Define the path to the Hermes executable
# HERMES_COMMAND_PATH="./node_modules/hermes-engine/dest/bin/hermes-cli"

# # Check if Hermes is installed and update gradle.properties
# if [ -f "$HERMES_COMMAND_PATH" ]; then
#     echo "Hermes found at $HERMES_COMMAND_PATH. Updating gradle.properties..."
#     # Dynamically set project.react.hermesCommand in gradle.properties
#     echo "project.react.hermesCommand=$HERMES_COMMAND_PATH" >> android/gradle.properties
# else
#     echo "Hermes not found. Please install Hermes."
#     # Optionally install Hermes here if not found
#     yarn add hermes-engine --dev
#     echo "Hermes installed. Updating gradle.properties..."
#     # Re-check after installation
#     echo "project.react.hermesCommand=$HERMES_COMMAND_PATH" >> android/gradle.properties
# fi

# Check if essential environment variables are set
required_vars=("APP_ENV" "URL" "SOCKET_PROJECT_TOKEN" "SOCKET_PROJECT_ID" "styleURL")
for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ]; then
        echo "Missing required environment variable: $var"
        exit 1
    fi
done

# Create .env file
cat <<EOF > .env
APP_ENV=${APP_ENV}
URL=${URL}
SOCKET_PROJECT_TOKEN=${SOCKET_PROJECT_TOKEN}
SOCKET_PROJECT_ID=${SOCKET_PROJECT_ID}
styleURL=${styleURL}
EOF
echo "Environment variables set."

# macOS/Linux compatibility for `sed`
if [[ "$OSTYPE" == "darwin"* ]]; then
    sed_command="sed -i ''"
else
    sed_command="sed -i"
fi

# Replace package names
find . -type f -not -path '*/\.git/*' -not -name 'docker-compose.yml' -exec $sed_command "s/com.sdufnative/${APP_PACKAGE_NAME}/g" {} +
find . -name "app.json" -exec $sed_command "s/sdufNative/${APP_NAME}/g" {} +
find android/app/src/main/res/values -name "strings.xml" -exec $sed_command "s/sdufNative/${APP_NAME}/g" {} +

# Check if envinfo is available globally, and if not, use yarn dlx to run it
if ! yarn dlx envinfo --help >/dev/null 2>&1; then
    echo "envinfo not found. Installing via yarn..."
    yarn add envinfo
else
    echo "envinfo is already installed."
fi
# Run envinfo to gather environment info
yarn dlx envinfo

# Prepare Android build
echo "Preparing Android build..."
cd android
chmod +x gradlew
./gradlew assembleRelease --max-workers=3 --no-daemon

# Move APK files
echo "Moving APK files..."
apk_directory="./app/build/outputs/apk/release"
if [ -d "$apk_directory" ]; then
    for apk in "$apk_directory"/*.apk; do
        new_filename="${SOCKET_PROJECT_ID}_$(basename "$apk")"
        cp "$apk" "/shared/${new_filename}"
    done
    echo "Files moved successfully."
else
    echo "No APK files found. Exiting."
    exit 1
fi

echo "Setup complete. Executing command..."
exec "$@" || exec /bin/bash  # Fallback to bash if no command is provided
