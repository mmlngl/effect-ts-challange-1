FROM debian:bookworm

RUN apt-get update && apt-get install -y git curl nodejs npm
RUN npm install -g pnpm

WORKDIR /app
RUN git clone https://github.com/yourname/effect-gemini-task.git .

COPY . .
