class CreatePeriodics < ActiveRecord::Migration[5.0]
  def change
    create_table :periodics do |t|
      t.references :report, foreign_key: false
      t.references :period_type, foreign_key: false

      t.timestamps
    end
  end
end
