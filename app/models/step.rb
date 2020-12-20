class Step < ApplicationRecord
  belongs_to :teams_user
  has_one :user, through: :teams_user

  validates :count, numericality: {
    greater_than: 0
  }
end
