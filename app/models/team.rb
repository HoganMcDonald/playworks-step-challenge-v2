class Team < ApplicationRecord
  belongs_to :contest
  has_many :teams_users
  has_many :users, through: :teams_users
  has_many :steps, through: :teams_users

  has_one_attached :avatar

  validates_presence_of :name, :company_name

  def avatar_url
    avatar.attached? ?
      Rails.application.routes.url_helpers.rails_blob_url(avatar, only_path: true) :
      nil
  end

  def total_steps
    steps.sum do |step|
      step.count
    end
  end

  def serialized
    {
      id: id,
      name: name,
      companyName: company_name,
      contestId: contest_id,
      avatar: avatar_url,
      leaderboard: teams_users.includes(:user, :steps).map do |tu|
          {
            id: tu.user_id,
            name: tu.user.name,
            sum: tu.total_steps,
            avatar: tu.user.avatar_url
          }
        end.sort_by { |tu| -tu[:sum] },
      steps: steps.includes(:user).all.map do |step|
          {
            id: step.id,
            name: step.user.name,
            userId: step.user.id,
            sum: step.count,
            createdAt: created_at
          }
        end
    }
  end
end
