class CreateReportPageChips < ActiveRecord::Migration[5.0]
  def change
    create_table :report_page_chips do |t|
      t.references :report_page, foreign_key: true
      t.string :name, default: '', null: false
      t.text :raw, default: '', null: false
      t.text :html, default: '', null: false

      t.timestamps
    end
  end
end
