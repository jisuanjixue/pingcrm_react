class ApplicationController < ActionController::Base
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

  inertia_share auth: -> { { user: current_user.as_json(only: %i[id first_name last_name], include: { account: { only: %i[id name] } }) } }
end
