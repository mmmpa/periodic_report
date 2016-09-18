class CreateReportPages < ActiveRecord::Migration[5.0]
  def change
    create_table :report_pages do |t|
      t.references :report, foreign_key: false

      t.timestamps
    end
  end
end
