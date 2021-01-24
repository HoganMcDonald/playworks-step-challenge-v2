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
    contest = Contest.find(params[:id])
    posts = contest.posts.includes(:image_attachment, :image_blob, teams_user: :user).page(params[:page]).per(5)

    response = {
      posts: posts.map(&:serialized),
      lastPage: posts.total_pages,
      page: posts.current_page
    }

    render json: response
  end
end
