# Use the base image from the React Native community
FROM reactnativecommunity/react-native-android

# Increase the number of inotify watches
# RUN echo fs.inotify.max_user_watches=524288 | tee -a /etc/sysctl.conf && sysctl -p
# Set the working directory inside the container
WORKDIR /app

# Copy the local code to the container
COPY . /app

RUN apt-get update -yq \
&& apt-get install curl gnupg -yq \
&& curl -sL https://deb.nodesource.com/setup_20.x | bash \
&& apt-get install nodejs -yq

# Copy the initialization script into the container and set permissions
COPY init.sh /usr/local/bin/init.sh
RUN chmod +x /usr/local/bin/init.sh

# Set the initialization script as the entry point
ENTRYPOINT ["/usr/local/bin/init.sh"]