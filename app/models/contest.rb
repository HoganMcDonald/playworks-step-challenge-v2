class Contest < ApplicationRecord
  has_many :teams
  has_many :teams_users, through: :teams
  has_many :content

  validates_presence_of :name, :start_date, :end_date
  validate :dates

  scope :active, -> { where('end_date > ?', DateTime.now) }

  def rules
    content.find_by content_type: :rules
  end

  def faq
    content.find_by content_type: :faq
  end

  def leaderboard
    teams.includes(:steps).map do |team|
      {
        name: team.name,
        sum: team.total_steps || 0
      }
    end
  end

  def top_steppers
    teams_users.includes(:user, :steps, :team).map do |tu|
      {
        username: tu.user.name,
        teamName: tu.team.name,
        sum: tu.total_steps,
        avatar: tu.user.avatar_url
      }
    end.sort_by do |steppers|
      -steppers[:sum]
    end.slice(0, 10)
  end

  private

  def dates
    if start_date > end_date
      errors.add :end_date, 'constest must end after it starts'
    end
  end
end
