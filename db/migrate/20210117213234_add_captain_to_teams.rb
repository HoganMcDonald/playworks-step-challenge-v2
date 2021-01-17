class AddCaptainToTeams < ActiveRecord::Migration[6.1]
  def change
    add_reference :teams, :captain, index: true, foreign_key: { to_table: :users }
  end
end
