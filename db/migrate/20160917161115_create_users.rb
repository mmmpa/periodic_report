class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.references :user, foreign_key: true
      t.string :name
      t.string :provider
      t.text :uid
      t.string :oauth_token

      t.timestamps
    end
  end
end
