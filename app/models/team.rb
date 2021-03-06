class Team < ApplicationRecord
  belongs_to :contest
  belongs_to :captain, class_name: 'User'
  has_many :teams_users
  has_many :users, through: :teams_users
  has_many :steps, through: :teams_users
  has_many :posts, through: :teams_users

  has_one_attached :avatar

  validates_presence_of :name, :company_name

  def avatar_url
    avatar.attached? ?
      Rails.application.routes.url_helpers.rails_blob_url(avatar, only_path: true) :
      nil
  end

  def total_steps
    teams_users.sum do |tu|
      tu.total_steps
    end
  end

  def serialized
    {
      id: id,
      name: name,
      companyName: company_name,
      contestId: contest_id,
      avatar: avatar_url,
      captain: captain,
      leaderboard: teams_users.includes(:steps, :posts, user: { avatar_attachment: :blob }).map do |tu|
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
            captainId: captain_id,
            createdAt: created_at,
            date: step.date
          }
        end
    }
  end
end
