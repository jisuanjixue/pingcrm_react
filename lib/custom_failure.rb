class CustomFailure < Devise::FailureApp
  def respond
    if http_auth?
      respond_to_failure_types
    elsif warden_options[:recall]
      recall
    else
      redirect
    end
  end

  def respond_to_failure_types
    message = warden_message || :unauthenticated

    # Incorrect credentials - wrong username or password
    if [:invalid, :not_found_in_database].include?(message)
      flash.now[:alert] = i18n_message(:invalid)
      flash.keep(:alert)
      redirect_to new_user_session_path
    # Account with unconfirmed email
    elsif message == :unconfirmed
      redirect_to new_user_confirmation_path({ email: params[:user][:email] })
    elsif message == :unauthenticated
      self.headers['x-inertia'] = true
      redirect_to new_user_session_path
    end
  end

  def http_auth
    self.status = 200
    self.headers["WWW-Authenticate"] = %(Basic realm=#{Devise.http_authentication_realm.inspect}) if http_auth_header?
    self.content_type = request.format.to_s
    self.response_body = http_auth_body
  end

  def recall
    header_info = if relative_url_root?
                    base_path = Pathname.new(relative_url_root)
                    full_path = Pathname.new(attempted_path)

                    { "SCRIPT_NAME" => relative_url_root,
                      "PATH_INFO" => "/#{full_path.relative_path_from(base_path)}" }
                  else
                    { "PATH_INFO" => attempted_path }
                  end

    header_info.each do |var, value|
      if request.respond_to?(:set_header)
        request.set_header(var, value)
      else
        request.env[var] = value
      end
    end

    flash.now[:alert] = i18n_message(:invalid) if is_flashing_format?
    self.response = recall_app(warden_options[:recall]).call(request.env)
  end

  def redirect
    store_location!
    if is_flashing_format?
      if flash[:timedout] && flash[:alert]
        flash.keep(:timedout)
        flash.keep(:alert)
      else
        flash[:alert] = i18n_message
      end
    end
    redirect_to redirect_url
  end

end
