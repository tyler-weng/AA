require_relative 'db_connection'
require_relative '01_sql_object'

module Searchable
  def where(params)
    where_arr = []
    params.each do |k, v|
      where_arr << "#{k} = ?"
    end
    where_line = where_arr.join(" AND ")
    results = DBConnection.execute(<<-SQL, *params.values)
      SELECT
        #{table_name}.*
      FROM
        #{table_name}
      WHERE
        #{where_line}
    SQL

    self.parse_all(results)
  end
end

class SQLObject
  # Mixin Searchable here...
  extend Searchable
end
