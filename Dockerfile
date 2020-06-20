FROM mikolaj6r/deno

WORKDIR /app

EXPOSE 8080

COPY ./src .

RUN deno cache https://deno.land/x/denjucks/src/deps/path/std/path/mod.ts
RUN deno cache --unstable mod.ts

ENTRYPOINT [""]
CMD deno run --allow-net --allow-read  --allow-write --allow-plugin --allow-env --unstable mod.ts --port=$PORT