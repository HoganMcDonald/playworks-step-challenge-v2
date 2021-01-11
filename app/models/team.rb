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

  def serialized
    {
      id: id,
      name: name,
      companyName: company_name,
      contestId: contest_id,
      leaderboard: teams_users.includes(:user, :steps).map do |tu|
          {
            id: tu.user_id,
            name: tu.user.name,
            sum: tu.total_steps
          }
        end.sort_by { |tu| -tu[:sum] }
    }
  end
end
