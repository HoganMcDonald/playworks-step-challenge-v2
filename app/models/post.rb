class Post < ApplicationRecord
  belongs_to :teams_user

  has_one_attached :image

  validates_presence_of :text
end
