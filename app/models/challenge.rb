class Challenge < ApplicationRecord
  belongs_to :contest

  validates_presence_of :name, :description, :due_date
end
