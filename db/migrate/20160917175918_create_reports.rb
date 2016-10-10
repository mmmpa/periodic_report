class CreateReports < ActiveRecord::Migration[5.0]
  def change
    create_table :reports do |t|
      t.references :user, foreign_key: false
      t.references :report_configuration, foreign_key: false
      t.string :name, default: '', null: false

      t.timestamps
    end
  end
end
