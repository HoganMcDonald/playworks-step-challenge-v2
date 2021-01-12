class Challenge < ApplicationRecord
  belongs_to :contest

  has_one_attached :image

  validates_presence_of :description

  def image_url
    image.attached? ?
      Rails.application.routes.url_helpers.rails_blob_url(image, only_path: true) :
      nil
  end
end
