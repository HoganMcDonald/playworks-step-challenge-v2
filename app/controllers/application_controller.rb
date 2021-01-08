class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token
  respond_to :json
  before_action :configure_permitted_parameters, if: :devise_controller?

  rescue_from ActiveRecord::RecordInvalid do |exception|
    error = {message:exception.message}
    render json: error, status: 422
  end

  rescue_from ActiveRecord::RecordNotFound do |exception|
    error = {message:exception.message}
    render json: error, status: 404
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
  end

  def authenticate_user!
    if user_signed_in?
      super
    else
      redirect_to login_path, :notice => 'if you want to add a notice'
    end
  end
end
