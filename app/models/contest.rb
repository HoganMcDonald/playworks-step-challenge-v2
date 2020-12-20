class Contest < ApplicationRecord
  has_many :teams

  validates_presence_of :name, :start_date, :end_date
  validates :dates

  private

  def dates
    if start_date > end_date
      errors.add :end_date, 'constest must end after it starts'
    end

    if start_date < DateTime.now
      errors.add :start_date, 'constests must take place in the future'
    end
  end
end
