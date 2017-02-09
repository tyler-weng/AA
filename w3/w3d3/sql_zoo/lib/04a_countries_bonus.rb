# == Schema Information
#
# Table name: countries
#
#  name        :string       not null, primary key
#  continent   :string
#  area        :integer
#  population  :integer
#  gdp         :integer

require_relative './sqlzoo.rb'

# BONUS QUESTIONS: These problems require knowledge of aggregate
# functions. Attempt them after completing section 05.

def highest_gdp
  # Which countries have a GDP greater than every country in Europe? (Give the
  # name only. Some countries may have NULL gdp values)
  execute(<<-SQL)
    SELECT
      name
    FROM
      countries
    WHERE
      gdp > (
        SELECT
          MAX(gdp)
        FROM
          countries
        WHERE
          continent = 'Europe'
      )
  SQL
end

def largest_in_continent
  # Find the largest country (by area) in each continent. Show the continent,
  # name, and area.
  execute(<<-SQL)
    SELECT
      continent, name, area
    FROM
      countries
    WHERE
      name in (
        SELECT
          name
        FROM
          countries
        WHERE
          area IN (
            SELECT
              MAX(area)
            FROM
              countries
            GROUP BY
              continent
          )
      )
  SQL
end

def large_neighbors
  # Some countries have populations more than three times that of any of their
  # neighbors (in the same continent). Give the countries and continents.
  execute(<<-SQL)
    SELECT
      countries.name, countries.continent
    FROM
      countries
    JOIN
      (
        SELECT
          continent, MAX(population) as max_pop
        FROM
          countries
        WHERE
          population NOT IN (
            SELECT
              MAX(population)
            FROM
              countries
            GROUP BY
              continent
          )
        GROUP BY
          continent
      ) AS sec on countries.continent = sec.continent
    WHERE
      countries.population >= 3 * sec.max_pop
  SQL

end

# Middle East   | 13403102
# Europe        | 23866987
# South Asia    |  4943771
# Asia-Pacific  | 28759578
# Africa        | 22550927
# North America | 21660000
# Americas      |   732240
# South America | 17740392
# (8 rows)
