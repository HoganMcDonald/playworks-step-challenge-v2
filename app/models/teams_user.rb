class TeamsUser < ApplicationRecord
  belongs_to :user
  belongs_to :team
  has_many :steps
  has_many :posts

  def total_steps
    steps.sum {|step| step.count}
  end
end
