InertiaRails.configure do |config|
  # set the current version for automatic asset refreshing. A string value should be used if any.
  config.version = ViteRuby.digest
  # enable default inertia rendering (warning! this will override rails default rendering behavior)
  config.default_render = false

  # ssr specific options
  config.ssr_enabled = false
  config.ssr_url = ''
end
