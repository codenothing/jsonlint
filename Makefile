#
# JSONLint [VERSION]
# [DATE]
# Corey Hart @ http://www.codenothing.com
#
.PHONY: all test clean

all:
	@echo "\n\x1B[1;31mPC_LOAD_LETTER\x1B[0m\n"
test:
	@node test/start.js
test-single:
	@node test/single.js
