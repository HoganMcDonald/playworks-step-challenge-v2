class Contest < ApplicationRecord
  has_many :teams

  validates_presence_of :name, :start_date, :end_date
  validate :dates

  private

  def dates
    if start_date > end_date
      errors.add :end_date, 'constest must end after it starts'
    end
  end
end
