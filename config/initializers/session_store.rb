Rails.application.config.session_store :cookie_store, key: "#{Rails.configuration.force_ssl ? "__Host-" : "_"}pingcrm_session", same_site: :strict, secure: Rails.configuration.force_ssl
