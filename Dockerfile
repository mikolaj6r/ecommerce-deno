FROM hayd/alpine-deno:1.0.0

WORKDIR /app

EXPOSE 8080

# Prefer not to run as root.

# These steps will be re-run upon each file change in your working directory:
COPY ./src .

# Added to ENTRYPOINT of base image.
CMD ["run", "--allow-net", "--allow-read", "--allow-write", "--allow-plugin", "--allow-env", "--unstable", "mod.ts", "--port=8080"]