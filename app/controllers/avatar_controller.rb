class AvatarController < ApplicationController
  before_action :authenticate_user!
  respond_to :json

  def upload_user_avatar
    current_user.update! avatar: params[:avatar]
  end

  def upload_team_avatar
    current_user.current_team.update! avatar: params[:avatar]
  end
end
