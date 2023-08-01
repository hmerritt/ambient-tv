FROM node:20.4.0

WORKDIR /
RUN npm -g i eas-cli sharp-cli
RUN apt update && apt install -y wget unzip android-sdk
RUN corepack enable && corepack prepare yarn@stable --activate && yarn set version stable
RUN wget https://dl.google.com/android/repository/commandlinetools-linux-9477386_latest.zip && unzip commandlinetools-linux-9477386_latest.zip
RUN mkdir -p android-sdk && mv ./cmdline-tools ./android-sdk/cmdline-tools
ENV PATH /android-sdk/cmdline-tools/latest/bin:$PATH
ENV EAS_NO_VCS 1

WORKDIR /project
WORKDIR /project/app
VOLUME ["/project/app"]

CMD ["tail", "-f", "/dev/null"]
