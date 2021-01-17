class Step < ApplicationRecord
  belongs_to :teams_user
  has_one :user, through: :teams_user
  has_one :team, through: :teams_user
  has_one :contest, through: :team

  validates :count, numericality: {
    greater_than: 0
  }

  validates_presence_of :date
  validate :within_contest

  private

  def within_contest
    return if date <= contest.end_date && date > contest.start_date - 1.day

    errors.add(:date, "This contest starts on #{contest.start_date.strftime("%m/%d/%Y")} and ends on #{contest.end_date.strftime("%m/%d/%Y")}. You can only add steps between those dates.")
  end
end
