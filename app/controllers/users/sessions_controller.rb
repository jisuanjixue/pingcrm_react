class Users::SessionsController < Devise::SessionsController
  # GET /login
  def new
    render inertia: "Auth/Login", props: {}
  end

  # POST /login
  def create # rubocop:disable Lint/UselessMethodDefinition
    super
  end

  # DELETE /logout
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
