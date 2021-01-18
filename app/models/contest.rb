class Contest < ApplicationRecord
  has_many :teams
  has_many :teams_users, through: :teams
  has_many :posts, through: :teams_users
  has_many :content
  has_many :challenges

  validates_presence_of :name, :start_date, :end_date
  validate :dates

  scope :active, -> { where('end_date > ?', DateTime.now) }

  def rules
    content.find_by content_type: :rules
  end

  def faq
    content.find_by content_type: :faq
  end

  def daily_challenge
    challenge = challenges.where(date: Time.now.in_time_zone('Central Time (US & Canada)').to_date).last
    challenge&.attributes&.merge({
      image: challenge.image_url
    })
  end

  def scheduled_challenges
    challenges.includes(:image_attachment, :image_blob).map do |challenge|
      challenge.attributes.merge({
        image: challenge.image_url
      })
    end
  end

  def all_posts
    posts.includes(:image_attachment, :image_blob, teams_user: :user).where(created_at: (Time.now.in_time_zone('Central Time (US & Canada)').beginning_of_day)..(Time.now.in_time_zone('Central Time (US & Canada)').end_of_day)).map do |post|
      {
        id: post.id,
        teamId: post.teams_user.team_id,
        userId: post.teams_user.user_id,
        name: post.teams_user.user.name,
        image: post.image_url,
        text: post.text,
        date: post.created_at,
        captainId: post.team.captain_id
      }
    end
  end

  def leaderboard
    teams.includes(:steps).map do |team|
      {
        id: team.id,
        name: team.name,
        sum: team.total_steps || 0
      }
    end
  end

  def top_steppers
    teams_users.includes(:user, :steps, :team).map do |tu|
      {
        username: tu.user.name,
        teamName: tu.team.name,
        sum: tu.total_steps,
        avatar: tu.user.avatar_url
      }
    end.sort_by do |steppers|
      -steppers[:sum]
    end.slice(0, 10)
  end

  private

  def dates
    if start_date > end_date
      errors.add :end_date, 'constest must end after it starts'
    end
  end
end
