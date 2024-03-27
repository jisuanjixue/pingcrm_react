unless defined?(REDIS)
  REDIS = if Rails.env.test?
            Redis.new(url: ENV["REDIS_URL"])
          else
            Redis.new(url: ENV["REDIS_URL"], ssl_params: { verify_mode: OpenSSL::SSL::VERIFY_NONE })
          end
end

