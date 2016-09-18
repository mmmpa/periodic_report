class CreatePeriods < ActiveRecord::Migration[5.0]
  def change
    create_table :periods do |t|
      t.references :report, foreign_key: false
      t.references :report_page, foreign_key: false

      t.timestamps
    end
  end
end
