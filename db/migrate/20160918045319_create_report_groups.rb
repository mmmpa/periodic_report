class CreateReportGroups < ActiveRecord::Migration[5.0]
  def change
    create_table :report_groups do |t|
      t.string :name, default: '', null: false
      t.string :timing, null: false

      t.timestamps
    end
  end
end
