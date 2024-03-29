Debugbar.configure do |config|
  config.enabled = true
  config.buffer_adapter = :memory  # Use a memory buffer
  # config.min_log_level = ::Logger::Severity::WARN
  # config.active_record = true
  # config.cache = true
  # Ignore all requests starting with /admin
  # config.ignored_request = -> (env) { env['PATH_INFO'].start_with? '/admin' }

  # Only log request to the API
  # config.ignored_request = -> (env) { not env['PATH_INFO'].start_with? '/api/v1' }

  # Ignore requests to admin, assets and debugbar
  # config.ignored_request = -> (env) do
  #   [Debugbar.config.prefix, "/assets", "/admin"].any? do |pfx|
  #     env['PATH_INFO'].start_with? pfx
  #   end
  # end
end