class AddContestToContent < ActiveRecord::Migration[6.1]
  def change
    add_reference :content, :contest, index: true
  end
end
