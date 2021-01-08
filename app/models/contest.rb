class Contest < ApplicationRecord
  has_many :teams

  validates_presence_of :name, :start_date, :end_date
  validate :dates

  scope :active, -> { where('end_date > ?', DateTime.now) }

  def leaderboard
    teams.map do |team|
      {
        name: team.name,
        sum: team.total_steps || 0
      }
    end
  end

  private

  def dates
    if start_date > end_date
      errors.add :end_date, 'constest must end after it starts'
    end
  end
end
