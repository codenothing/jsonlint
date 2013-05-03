.PHONY: all test clean

all:
	@echo "\n\x1B[1;31mPC_LOAD_LETTER\x1B[0m\n"

clean:
	@rm -rf build/results/

lint:
	@node build/lint.js

test: clean lint
	@node build/test.js

test-all:
	@NODE_TEST_NO_SKIP=1 make test

test-full:
	@./build/full.sh
