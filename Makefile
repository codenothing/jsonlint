#
# JSONLint [VERSION]
# [DATE]
# Corey Hart @ http://www.codenothing.com
#
.PHONY: all test clean


test:
	@node test/start.js
test-single:
	@node test/single.js
