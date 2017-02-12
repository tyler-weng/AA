require_relative 'db_connection'
require 'active_support/inflector'
# NB: the attr_accessor we wrote in phase 0 is NOT used in the rest
# of this project. It was only a warm up.

class SQLObject
  def self.columns
    @columns ||= (DBConnection.execute2(<<-SQL)
      SELECT
        *
      FROM
        #{table_name}
    SQL
    ).first.map(&:to_sym)

  end

  def self.finalize!
    self.columns.each do |col|

      define_method(col) do
        self.attributes[col]
      end

      define_method("#{col}=") do |val|
        self.attributes[col] = val
      end

    end

  end

  def self.table_name=(table_name)
    @table_name = table_name
  end

  def self.table_name
    @table_name = "#{itself.to_s.downcase}s"
  end

  def self.all
    results = DBConnection.execute(<<-SQL)
      SELECT
        #{table_name}.*
      FROM
        #{table_name}
    SQL

    self.parse_all(results)
  end

  def self.parse_all(results)
    results.map { |result| self.new(result) }
  end

  def self.find(id)
    results = DBConnection.execute(<<-SQL, id)
      SELECT
        #{table_name}.*
      FROM
        #{table_name}
      WHERE
        #{table_name}.id = ?
    SQL

    self.parse_all(results).first
  end

  def initialize(params = {})
    params.each do |attr_name, value|
      name = attr_name.to_sym
      if self.class.columns.include?(name)
        self.send("#{name}=", value)
      else
        raise "unknown attribute '#{name}'"
      end
    end
  end

  def attributes
    @attributes ||= {}
  end

  def attribute_values
    self.class.columns.map { |attr| self.send(attr) }
  end

  def insert
    cols = self.class.columns[1..-1]
    col_names = cols.map(&:to_s).join(", ")
    question_marks = (["?"] * cols.count).join(", ")
    DBConnection.execute(<<-SQL, *attribute_values[1..-1])
      INSERT INTO
        #{self.class.table_name} (#{col_names})
      VALUES
        (#{question_marks})
    SQL

    self.id = DBConnection.last_insert_row_id
  end

  def update
    cols = self.class.columns
    set_str = cols.map{ |col| "#{col} = ?"}.join(", ")
    DBConnection.execute(<<-SQL, *attribute_values, id)
      UPDATE
        #{self.class.table_name}
      SET
        #{set_str}
      WHERE
        #{self.class.table_name}.id = ?
    SQL
  end

  def save
    self.id.nil? ? self.insert : self.update
  end
end
