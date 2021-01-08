class TeamsController < ApplicationController
  before_action :authenticate_user!

  def index
    teams = Team.where contest_id: params[:contest_id]
    render json: teams
  end

  def update
    team = Team.find! params[:team_id]
    team.users << current_user
  end
end
