require_relative '02_searchable'
require 'active_support/inflector'

# Phase IIIa
class AssocOptions
  attr_accessor(
    :foreign_key,
    :class_name,
    :primary_key
  )

  def model_class
    class_name.constantize
  end

  def table_name
    self.model_class.table_name
  end
end

class BelongsToOptions < AssocOptions
  def initialize(name, options = {})
    defaults = {
      foreign_key: "#{name}_id".to_sym,
      class_name: "#{name.to_s.camelcase}",
      primary_key: :id
    }

    defaults.keys.each do |k|
      self.send("#{k}=", options[k] || defaults[k] )
    end
  end
end

class HasManyOptions < AssocOptions
  def initialize(name, self_class_name, options = {})
    defaults = {
      foreign_key: "#{self_class_name.downcase}_id".to_sym,
      class_name: "#{name.to_s.singularize.capitalize}",
      primary_key: :id
    }

    defaults.keys.each do |k|
      self.send("#{k}=", options[k] || defaults[k] )
    end
  end
end

module Associatable
  # Phase IIIb
  def belongs_to(name, options = {})
    self.assoc_options[name] = BelongsToOptions.new(name, options)

    define_method(name) do
      options = self.class.assoc_options[name]
      fkey_val = self.send(options.foreign_key)
      options
        .model_class
        .where(options.primary_key => fkey_val)
        .first
    end
  end

  def has_many(name, options = {})
    options = HasManyOptions.new(name, self.to_s, options)

    define_method(name) do
      pkey_val = self.send(options.primary_key)
      options
        .model_class
        .where(options.foreign_key => pkey_val)
    end
  end

  def assoc_options
    @assoc_options ||= {}
    @assoc_options
  end
end

class SQLObject
  # Mixin Associatable here...
  extend Associatable
end
