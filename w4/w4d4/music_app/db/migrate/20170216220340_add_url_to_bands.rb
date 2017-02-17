class AddUrlToBands < ActiveRecord::Migration[5.0]
  def change
    add_column :bands, :url, :string, default: "https://www.reddit.com/r/The_Donald"
  end
end
