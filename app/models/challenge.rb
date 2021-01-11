class Challenge < ApplicationRecord
  belongs_to :contest

  has_one_attached :image

  validates_presence_of :name, :description, :due_date
end
