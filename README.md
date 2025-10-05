# Explanation

There was no further info what are possible supported date formats, so I build function that tries to understand the pattern from the data.

## Test data

There are several files part of this repo that can be used for testing purposes:

- **test1.csv** - Comprehensive test data with 25 employee records across multiple projects, testing various collaboration scenarios
- **test2.csv** - Test case with 3 pairs having the same top collaboration result (365 days each), testing tie-breaking scenarios
- **test3.csv** - Test case with no overlapping pairs, testing edge case where no employees worked together
- **test1-different-date-format.csv** - Same data as test1.csv but with DD-MM-YYYY date format to test date parsing
- **test1-null.csv** - Test data with NULL values in date fields to test null handling