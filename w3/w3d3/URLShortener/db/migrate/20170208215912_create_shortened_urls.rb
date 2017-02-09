class CreateShortenedUrls < ActiveRecord::Migration
  def change
    create_table :shortened_urls do |t|
      t.string :long_url, null: false, unique: true
      t.string :short_url, unique: true
      t.integer :user_id, null: false
    end

    add_index :shortened_urls, [:long_url, :short_url, :user_id]
  end
end
