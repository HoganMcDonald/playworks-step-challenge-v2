class Post < ApplicationRecord
  belongs_to :teams_user

  has_one_attached :image

  validates_presence_of :text

  def image_url
    image.attached? ?
      Rails.application.routes.url_helpers.rails_blob_url(image, only_path: true) :
      nil
  end
end
