class TeamsUser < ApplicationRecord
  belongs_to :user
  belongs_to :team
  has_many :steps
  has_many :posts

  def total_steps
    steps.sum {|step| step.count} + bonus_steps
  end

  def bonus_steps
    posts.map { |p| p.created_at.to_date }.uniq.count * 2000
  end
end
