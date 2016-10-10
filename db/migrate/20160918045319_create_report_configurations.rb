class CreateReportConfigurations < ActiveRecord::Migration[5.0]
  def change
    create_table :report_configurations do |t|
      t.string :name, default: '', null: false
      t.string :timing, null: false

      t.timestamps
    end
  end
end
