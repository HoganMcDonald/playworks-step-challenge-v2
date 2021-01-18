class ContestsController < ApplicationController
  before_action :authenticate_user!

  def show
    contest = current_user.contests.find params[:id]
    render json: contest.serialized
  end

  def index
    render json: Contest.active
  end
end
