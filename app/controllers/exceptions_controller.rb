class ExceptionsController < ActionController::Base
  # Don't raise InvalidCrossOriginRequest for requesting not existing JavaScript file
  skip_after_action :verify_same_origin_request

  def show
    status = request.path_info.delete_prefix("/").to_i

    if request.format.html? || request.inertia?
      render inertia: "Error/Show", props: { status: }, status: status
    else
      head status
    end
  end
end
