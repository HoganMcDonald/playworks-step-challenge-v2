class AddDateToSteps < ActiveRecord::Migration[6.1]
  def change
    add_column :steps, :date, :date
  end
end
