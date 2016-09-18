class CreatePeriodTypes < ActiveRecord::Migration[5.0]
  def change
    create_table :period_types do |t|
      t.string :name, defalt: '', null: false
      t.string :timing, default: '0'

      t.timestamps
    end
  end
end
