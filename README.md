# lfs-course-eval-server
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![Cypress.io tests](https://img.shields.io/badge/cypress.io-tests-green.svg?style=flat-square)](https://cypress.io)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Responsible for two tasks: aggregating raw CSV data into a Mongo database, and acting as the REST endpoint for requests from lfs-course-eval-client. 


### Dispersion Index
Dispersion index is a measure used to quantify whether a set of observed occurrences are clustered or dispersed compared to a standard statistical model. The dispersion index is calculated as the ratio of the variance to the mean (D = Variance/Mean).

### Percentile Ranking
Percentile rank is the percentage of the scores that fall at or below a given score.
For example, if we have N instructors in a department, school or faculty and we have the percentile rank of instructor Joe. First we count how many instructors scored below Joe, let us call that number “B for below”. Now, we count how many scored at Joe level (including Joe score), let us call that number “A for At Joe score”. The formula for percentile rank will be:

((B+(0.5*A))/N)*100

So, if out of 20 instructors, 13 scored below Joe and no one scored the same (only Joe scored 4.3), then B=13 and A=1 (only Joe)

Joe’s Percentile rank = ((13+(0.5*1))/20)*100 = (13.5/20)*100 = 68th percentile

Furthermore, percentile ranks are rounded to the nearest one. But, please note that percentiles less than 1 round up to the 1st percentile, i.e. there should be no zero percentile. For example both 0.2 and 0.8 round up to the 1st percentile.

Also, percentiles greater than the 99th round down to the 99th percentile rank, e.g. 99.4 or 99.9 round down to the 99th, i.e. there should be no 100th percentile.

### Response Rate
The response rate is found by dividing the number of students that completed the survey with the number of students enrolled in the class.
RR = (# of students that completed survey)/(# of students enrolled in the class)

### Meets Minimum
The UBC Centre for Teaching and Learning Technology (CTLT) has developed a table of minimum response rates by class size. If the response rate of a given evaluation is above the minimum recommended, then the evaluation meets minimum.

| Class Size | Recommended Minimum Response Rates based on 80% confidence & ±10% margin |
| :--------: | :----------------------------------------------------------------------: |
| <= 10 | 75% |
| 11 - 19 | 65% |
| 20 - 34 | 55% |
| 35 - 49 | 40% |
| 50 - 74 | 35% |
| 75 - 99 | 25% |
| 100 - 149 | 20% |
| 150 - 299 | 15% |
| 300 - 499 | 10% |
| >= 500 | 5% |

### Average
The average is calculated with the raw data of the entire faculty.
