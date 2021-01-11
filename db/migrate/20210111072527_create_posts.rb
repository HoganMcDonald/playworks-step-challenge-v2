class CreatePosts < ActiveRecord::Migration[6.1]
  def change
    create_table :posts do |t|
      t.text :text
      t.references :teams_user

      t.timestamps
    end
  end
end
