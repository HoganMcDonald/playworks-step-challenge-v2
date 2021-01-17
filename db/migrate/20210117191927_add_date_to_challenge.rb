class AddDateToChallenge < ActiveRecord::Migration[6.1]
  def change
    add_column :challenges, :date, :date
  end
end
