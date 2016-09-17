class CreateReportPages < ActiveRecord::Migration[5.0]
  def change
    create_table :report_pages do |t|
      t.references :report, foreign_key: false
      t.text :raw, default: '', null: false
      t.text :html, default: '', null: false

      t.timestamps
    end
  end
end
