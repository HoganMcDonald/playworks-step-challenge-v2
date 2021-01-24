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
    posts = contest.posts.includes(:image_attachment, :image_blob, teams_user: :user).page params[:page]

    response = {
      posts: posts.map do |post|
        {
          id: post.id,
          teamId: post.teams_user.team_id,
          userId: post.teams_user.user_id,
          avatar: post.teams_user.user.avatar_url,
          name: post.teams_user.user.name,
          image: post.image_url,
          text: post.text,
          date: post.created_at,
          captainId: post.team.captain_id
        }
      end,
      lastPage: posts.total_pages,
      page: posts.current_page
    }

    render json: response
  end
end
