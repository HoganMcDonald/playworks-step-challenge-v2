class User < ApplicationRecord
  has_many :teams_users
  has_many :teams, through: :teams_users
  has_many :contests, through: :teams
  has_many :steps, through: :teams_users
  has_many :contests, through: :teams

  enum role: { standard: 0, admin: 2 }

  has_one_attached :avatar

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  def current_contest
    contests.active.last
  end

  def current_team
    teams.joins(:contest).where('contests.end_date > ?', DateTime.now).last
  end

  def avatar_url
    avatar.attached? ?
      Rails.application.routes.url_helpers.rails_blob_url(avatar, only_path: true) :
      nil
  end

  def serialized
    {
      id: id,
      email: email,
      name: name,
      avatar: avatar_url,
      role: role,
      currentTeamId: current_team&.id,
      currentContestId: current_contest&.id,
      completedContests: contests.not_active.pluck(:id, :name),
      steps: steps.all.map do |step|
          {
            id: step.id,
            name: name,
            sum: step.count,
            userId: id,
            date: step.date
          }
        end
    }
  end

  def remember_me
    true
  end
end
