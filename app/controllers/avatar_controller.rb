class AvatarController < ApplicationController
  before_action :authenticate_user!
  respond_to :json

  def upload_avatar
    current_user.update! avatar: params[:avatar]
  end
end
