class ApplicationController < ActionController::Base
  before_action :generate_types

  include Auth

  include Pagy::Backend

  include InertiaCsrf
  include InertiaFlash
  include InertiaJson
  include InertiaErrors

  rescue_from ActiveRecord::RecordInvalid do |exception|
    raise exception unless request.inertia?
    session[:errors] = exception.record.errors
    redirect_back(fallback_location: root_path)
  end

  rescue_from ActionController::BadRequest do |exception|
    flash[:error] = exception.message
    redirect_back(fallback_location: root_path)
  end

  inertia_share auth: -> {
 { user: current_user.as_json(only: %i[id first_name last_name], include: { account: { only: %i[id name] } }) } }

 private

 def generate_types
  TypesFromSerializers.generate if Rails.env.development?
 end

end
