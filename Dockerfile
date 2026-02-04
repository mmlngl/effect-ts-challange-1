FROM debian:bookworm-slim

RUN apt-get update && apt-get install -y curl git ca-certificates

# install Node 20
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

WORKDIR /app

RUN git clone https://github.com/mmlngl/effect-ts-challange-1.git .

COPY . .
