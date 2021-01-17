class StepsController < ApplicationController
  before_action :authenticate_user!
  respond_to :json

  def create
    tu = TeamsUser.find_by! user: current_user, team_id: params[:team_id]
    step = Step.create! count: params[:count], date: params[:date], teams_user: tu

    render json: step
  end
end
