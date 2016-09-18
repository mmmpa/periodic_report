class CreateReportGroups < ActiveRecord::Migration[5.0]
  def change
    create_table :report_groups do |t|
      t.string :name
      t.string :timing

      t.timestamps
    end
  end
end
