class TeamsUser < ApplicationRecord
  belongs_to :user
  belongs_to :team
  has_many :steps
end
