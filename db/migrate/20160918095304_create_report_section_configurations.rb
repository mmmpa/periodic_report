class CreateReportSectionConfigurations < ActiveRecord::Migration[5.0]
  def change
    create_table :report_section_configurations do |t|
      t.references :report_configuration, foreign_key: false
      t.string :name, default: '', null: false
      t.boolean :root, default: false, null: false

      t.timestamps
    end
  end
end
