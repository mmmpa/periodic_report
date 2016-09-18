class CreateReportItems < ActiveRecord::Migration[5.0]
  def change
    create_table :report_items do |t|
      t.string :name, default: '', null: false
      t.references :report_group, foreign_key: false

      t.timestamps
    end
  end
end
