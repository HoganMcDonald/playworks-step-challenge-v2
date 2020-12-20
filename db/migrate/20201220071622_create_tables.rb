class CreateTables < ActiveRecord::Migration[6.1]
  def change
    create_table :contests do |t|
      t.string :name
      t.datetime :start_date
      t.datetime :end_date

      t.timestamps
    end

    create_table :teams do |t|
      t.string :name
      t.string :company_name
      t.references :contest, foreign_key: true

      t.timestamps
    end

    create_join_table :users, :teams do |t|
      t.index :user_id
      t.index :team_id
    end

    create_table :challenges do |t|
      t.string :name
      t.text :description
      t.date :due_date
      t.references :contest, foreign_key: true

      t.timestamps
    end

    create_table :steps do |t|
      t.integer :count
      t.references :user, foreign_key: true

      t.timestamps
    end

    create_table :content do |t|
      t.string :content_type
      t.text :text

      t.timestamps
    end

    create_table :roles do |t|
      t.string :name

      t.timestamps
    end

    create_join_table :users, :roles do |t|
      t.index :user_id
      t.index :role_id
    end

    add_column :users, :name, :string
  end
end
