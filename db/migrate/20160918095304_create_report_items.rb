class CreateReportItems < ActiveRecord::Migration[5.0]
  def change
    create_table :report_items do |t|
      t.references :report_group, foreign_key: false
      t.string :name, default: '', null: false
      t.boolean :root, default: false, null: false

      t.timestamps
    end
  end
end
