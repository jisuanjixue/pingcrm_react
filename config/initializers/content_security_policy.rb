# Be sure to restart your server when you modify this file.

# Define an application-wide content security policy.
# See the Securing Rails Applications Guide for more information:
# https://guides.rubyonrails.org/security.html#content-security-policy-header

Rails.application.configure do
  config.content_security_policy do |policy|
    policy.font_src :self
    policy.img_src(*%i[self data].compact)
    policy.object_src :none
    policy.form_action :self
    policy.manifest_src :self
    policy.default_src :none

    if Rails.env.development?
      policy.connect_src :self,
                         # Allow ActionCable connection
                         "wss://#{ENV.fetch("APP_HOST", nil)}",
                         # Allow @vite/client to hot reload CSS changes
                         "wss://#{ViteRuby.config.host}"

      policy.script_src :self,
                        # Allow Inertia.js to display error modal
                        :unsafe_inline,
                        # Allow @vite/client to hot reload JavaScript changes
                        "https://#{ViteRuby.config.host}"

      policy.style_src :self,
                       # Allow @vite/client to hot reload CSS changes
                       :unsafe_inline
    else
      policy.default_src :none
      policy.font_src(
        *[:self, :data, Rails.configuration.asset_host.presence].compact,
      )
      policy.img_src(
        *[:self, :data, Rails.configuration.asset_host.presence].compact,
      )
      policy.object_src :none
      policy.script_src(
        *[:self, Rails.configuration.asset_host.presence].compact,
      )
      policy.style_src(
        *[
          :self,
          Rails.configuration.asset_host.presence,
          # Allow @inertiajs/progress to display progress bar
          "'sha256-kCeyw5rRT2DINADvWYmAhXLhQs4dKZrnn2sofIDmprs='",
        ].compact,
      )
      policy.frame_src(
        *[:self, Rails.configuration.asset_host.presence].compact,
      )
      policy.connect_src(
        *[
          :self,
          "wss://#{ENV.fetch('APP_HOST', nil)}",
          (
            if Rails.configuration.x.honeybadger.api_key
              'https://api.honeybadger.io'
            end
          ),
          Rails.configuration.x.plausible_url.presence,
        ].compact,
      )
      policy.manifest_src :self
      policy.frame_ancestors :none
    end

    policy.base_uri :self

    # Specify URI for violation reports
    # policy.report_uri "/csp-violation-report-endpoint"
  end

  # Generate session nonces for permitted importmap and inline scripts
  #   config.content_security_policy_nonce_generator = ->(request) { request.session.id.to_s }
  #   config.content_security_policy_nonce_directives = %w(script-src)
  #
  #   # Report violations without enforcing the policy.
  #   # config.content_security_policy_report_only = true
end
