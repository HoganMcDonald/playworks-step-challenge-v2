class PostsController < ApplicationController
  before_action :authenticate_user!
  respond_to :json

  def create
    tu = TeamsUser.find_by! user: current_user, team_id: params[:team_id]
    post = Post.create! text: params[:text], image: params[:image], teams_user: tu

    render json: post
  end

  def destroy
    step = Post.find params[:id]
    step.destroy
  end

  def show
    posts = Contest.find(params[:id]).all_posts

    render json: posts
  end
end
