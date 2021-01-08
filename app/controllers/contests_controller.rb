class ContestsController < ApplicationController
  before_action :authenticate_user!

  def index
    render json: Contest.all
  end
end
