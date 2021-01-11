class PostsController < ApplicationController
  before_action :authenticate_user!
  respond_to :json

  def create
    tu = TeamsUser.find_by! user: current_user, team_id: params[:team_id]
    post = Post.create! text: params[:text], image: params[:image], teams_user: tu

    render json: post
  end
end
