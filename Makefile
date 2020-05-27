ENTRY_POINT := mod.ts
GO_TO_SOURCE := cd src

default:
	make dev

dev:
	$(GO_TO_SOURCE); denon run --allow-net --allow-read --allow-env $(ENTRY_POINT)

format:
	$(GO_TO_SOURCE); deno fmt

install:
	$(GO_TO_SOURCE); deno install --unstable --allow-read --allow-write --allow-run -f https://deno.land/x/denon/denon.ts;

run:
	$(GO_TO_SOURCE); deno run $(ENTRY_POINT) --allow-net

test:
	$(GO_TO_SOURCE); deno test

test/watch:
	$(GO_TO_SOURCE); denon --test --config denon.json