.PHONY: all test clean

all:
	@echo "\n\x1B[1;31mPC_LOAD_LETTER\x1B[0m\n"

test: lint
	@node test/start.js

test-single:
	@node test/single.js

lint:
	@build/bin/nodelint .
