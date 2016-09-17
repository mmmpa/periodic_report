class CreateMemos < ActiveRecord::Migration[5.0]
  def change
    create_table :memos do |t|
      t.references :report, foreign_key: true
      t.text :raw, default: '', null: false
      t.text :html, default: '', null: false
      t.boolean :concreted, default: false, null: false

      t.timestamps
    end
  end
end
