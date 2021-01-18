class TeamsController < ApplicationController
  before_action :authenticate_user!
  respond_to :json

  def show
    team = current_user.teams.find params[:id]
    render json: team.serialized
  end

  def create
    team = Team.create! name: params[:name], company_name: params[:company_name], contest_id: params[:contest_id], avatar: params[:avatar], captain: current_user
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
