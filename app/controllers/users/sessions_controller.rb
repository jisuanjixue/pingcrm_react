class Users::SessionsController < Devise::SessionsController
  # @route GET /login (new_user_session)
  def new
    render inertia: "Auth/Login", props: {}
  end

  # @route POST /login (user_session)
  def create # rubocop:disable Lint/UselessMethodDefinition
    super
  end

  # @route DELETE /logout (destroy_user_session)
  def destroy # rubocop:disable Lint/UselessMethodDefinition
    super
  end

  protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end

  # def configure_permitted_parameters
  #   devise_parameter_sanitizer.permit(:sign_in) do |user|
  #     user.permit(:username, :email)
  #   end
  # end
end
