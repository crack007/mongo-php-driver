.PHONY: coverage

DATE=`date +%Y-%m-%d--%H-%M-%S`

mv-coverage:
	@if test -e $(top_srcdir)/coverage; then \
		echo "Moving previous coverage run to coverage-$(DATE)"; \
		mv coverage coverage-$(DATE); \
	fi

lcov-coveralls:
	lcov --gcov-tool $(top_srcdir)/.llvm-cov.sh --capture --directory . --output-file .coverage.lcov --no-external

lcov-local:
	lcov --gcov-tool $(top_srcdir)/.llvm-cov.sh --capture --derive-func-data --directory . --output-file .coverage.lcov --no-external

coverage: mv-coverage lcov-local
	genhtml .coverage.lcov --legend --title "phongo code coverage" --output-directory coverage


coveralls: mv-coverage lcov-coveralls
	coveralls --exclude lib --exclude tests
