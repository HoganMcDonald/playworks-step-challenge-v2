class Post < ApplicationRecord
  belongs_to :teams_user
  has_one :team, through: :teams_user

  has_one_attached :image

  def image_url
    image.attached? ?
      Rails.application.routes.url_helpers.rails_blob_url(image, only_path: true) :
      nil
  end

  def serialized
    {
      id: id,
      teamId: teams_user.team_id,
      userId: teams_user.user_id,
      avatar: teams_user.user.avatar_url,
      name: teams_user.user.name,
      image: image_url,
      text: text,
      date: created_at,
      captainId: team.captain_id
    }
  end
end
