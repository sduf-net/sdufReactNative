# Use Ubuntu 22.04 as the base image
FROM ubuntu:22.04 AS builder

LABEL Description="React Native Android Docker Environment for Linux & Mac"

ENV DEBIAN_FRONTEND=noninteractive

# Build arguments
ARG SDK_VERSION=commandlinetools-linux-11076708_latest.zip
ARG ANDROID_BUILD_VERSION=35
ARG ANDROID_TOOLS_VERSION=35.0.0
ARG NDK_VERSION=27.1.12297006
ARG NODE_VERSION=20.0
ARG CMAKE_VERSION=3.22.1

# Set environment variables
ENV ADB_INSTALL_TIMEOUT=10
ENV ANDROID_HOME=/opt/android
ENV ANDROID_SDK_ROOT=${ANDROID_HOME}
ENV ANDROID_NDK_HOME=${ANDROID_HOME}/ndk/$NDK_VERSION
ENV PATH="${ANDROID_HOME}/cmdline-tools/latest/bin:${ANDROID_HOME}/platform-tools:${ANDROID_HOME}/emulator:${ANDROID_HOME}/tools:${ANDROID_HOME}/tools/bin:${PATH}"

# ✅ Install system dependencies in ONE layer to enable caching
RUN apt update -qq && apt install -qq -y --no-install-recommends \
        curl file gcc git g++ gnupg2 libc++1-11 libgl1 libtcmalloc-minimal4 \
        make openjdk-17-jdk openssh-client patch python3 python3-distutils rsync \
        ruby ruby-dev tzdata unzip sudo ninja-build zip ccache jq shellcheck \
        libicu-dev \
    && gem install bundler \
    && rm -rf /var/lib/apt/lists/*

# ✅ Install Node.js and Yarn
RUN curl -L https://raw.githubusercontent.com/tj/n/master/bin/n -o n \
    && bash n $NODE_VERSION \
    && rm n \
    && npm install -g n yarn

# ✅ Install Android SDK & tools (FIXED PATH)
RUN mkdir -p ${ANDROID_HOME}/cmdline-tools \
    && curl -sS https://dl.google.com/android/repository/${SDK_VERSION} -o /tmp/sdk.zip \
    && unzip -q -d ${ANDROID_HOME}/cmdline-tools /tmp/sdk.zip \
    && mv ${ANDROID_HOME}/cmdline-tools/cmdline-tools ${ANDROID_HOME}/cmdline-tools/latest \
    && rm /tmp/sdk.zip 

# ✅ Set correct permissions and accept licenses
RUN chmod +x ${ANDROID_HOME}/cmdline-tools/latest/bin/sdkmanager \
    && yes | ${ANDROID_HOME}/cmdline-tools/latest/bin/sdkmanager --licenses \
    && yes | ${ANDROID_HOME}/cmdline-tools/latest/bin/sdkmanager "platform-tools" \
        "platforms;android-${ANDROID_BUILD_VERSION}" \
        "build-tools;${ANDROID_TOOLS_VERSION}" \
        "cmake;${CMAKE_VERSION}" \
        "ndk;${NDK_VERSION}" \
    && rm -rf ${ANDROID_HOME}/.android

# ✅ Set Git safe directory
RUN git config --global --add safe.directory '*'

# Set working directory
WORKDIR /app

# Copy project files
COPY . /app

# ✅ Installing dependencies...
RUN yarn install

# Copy init script
COPY init.sh /usr/local/bin/init.sh
RUN chmod +x /usr/local/bin/init.sh

# Final entrypoint with bash
ENTRYPOINT ["/bin/bash", "/usr/local/bin/init.sh"]
