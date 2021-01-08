class TeamsController < ApplicationController
  before_action :authenticate_user!
  respond_to :json

  def create
    team = Team.create! name: params[:name], company_name: params[:company_name], contest_id: params[:contest_id]
    team.users << current_user

    render json: team
  end

  def index
    teams = Team.where contest_id: params[:contest_id]
    render json: teams
  end

  def update
    team = Team.find params[:id]
    team.users << current_user
  end
end
