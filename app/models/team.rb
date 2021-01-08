class Team < ApplicationRecord
  belongs_to :contest
  has_many :teams_users
  has_many :users, through: :teams_users
  has_many :steps, through: :teams_users

  validates_presence_of :name, :company_name

  def total_steps
    steps.sum do |step|
      step.count
    end
  end
end
