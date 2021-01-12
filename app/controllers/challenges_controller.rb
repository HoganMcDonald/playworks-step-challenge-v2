class ChallengesController < ApplicationController
  before_action :authenticate_user!
  respond_to :json

  def create
    challenge = Challenge.create! description: params[:description], image: params[:image], contest: current_user.current_contest

    render json: challenge
  end
end
