class ContentController < ApplicationController
  before_action :authenticate_user!

  def create
    content = Content.where(contest_id: params[:contest_id], content_type: params[:content_type]).first_or_initialize.update!(text: params[:text], content_type: params[:content_type])

    render json: content
  end
end
