class User < ApplicationRecord
  has_many :teams_users
  has_many :teams, through: :teams_users
  has_many :steps, through: :teams_users

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  def current_team
    teams.joins(:contest).where('contests.end_date > ?', DateTime.now).last
  end
end
