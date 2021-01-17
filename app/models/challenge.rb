class Challenge < ApplicationRecord
  belongs_to :contest

  has_one_attached :image

  validates_presence_of :description
  validates_presence_of :date
  validate :within_contest

  def image_url
    image.attached? ?
      Rails.application.routes.url_helpers.rails_blob_url(image, only_path: true) :
      nil
  end

  private

  def within_contest
    return if date <= contest.end_date && date > contest.start_date - 1.day

    errors.add(:date, "This contest starts on #{contest.start_date.strftime("%m/%d/%Y")} and ends on #{contest.end_date.strftime("%m/%d/%Y")}. You can only schedule challenges between those dates.")
  end
end
