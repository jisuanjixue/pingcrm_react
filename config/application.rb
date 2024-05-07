require_relative "boot"

require "rails"
# Pick the frameworks you want:
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "active_storage/engine"
require "action_controller/railtie"
require "action_mailer/railtie"
# require "action_mailbox/engine"
# require "action_text/engine"
require "action_view/railtie"
require "action_cable/engine"
# require "sprockets/railtie"
require "rails/test_unit/railtie"
require "nilify_blanks/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Pingcrm
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.0

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")

    # config.active_storage.variant_processor = :vips

    config.active_job.queue_adapter = :sidekiq

    config.x.git.commit_version = ENV.fetch("COMMIT_VERSION") { `git describe --always`.chomp }

    config.x.git.commit_time = ENV.fetch("COMMIT_TIME") { `git show -s --format=%cI`.chomp }

    config.x.honeybadger.api_key = ENV['HONEYBADGER_API_KEY'].presence

    # To allow Inertia.js handle backend exceptions, we need to register an
    # exceptions_app to show the exceptions via the `Error` React component.
    # This app needs to be a middleware. To keep things simple we define an
    # anonymous controller with a `show` method. This allows us to use
    # `render inertia: ...`

     # 21: 这行代码将应用程序的lib目录添加到自动加载路径中。这意味着Rails将自动加载lib目录下的所有Ruby文件，无需显式require它们。这对于自定义的库或模块非常有用。
     config.autoload_paths += %W(#{config.root}/lib)

# 这部分配置了Rails生成器的默认行为。生成器是Rails用来快速创建模型、控制器、视图等资源的工具。这里的配置指定了：
# 使用RSpec作为测试框架（g.test_framework :rspec）。
# 禁用视图和路由规格（g.view_specs false和g.routing_specs false）。
# 使用TSX作为模板引擎（g.template_engine :tsx），这通常用于React组件。
# 禁用脚手架样式表、样式表、JavaScript文件、资产和帮助器（g.scaffold_stylesheet false、g.stylesheets false、g.javascripts false、g.assets false和g.helper false）。
     config.generators do |g|
       g.test_framework      :rspec
       g.view_specs          false
       g.routing_specs       false

       g.template_engine     :tsx
       g.scaffold_stylesheet false
       g.stylesheets         false
       g.javascripts         false
       g.assets              false
       g.helper              false
     end

     config.active_storage.service = :local
    #  配置Active Record允许在YAML列中使用的类。这是一个安全措施，确保只有指定的类可以被序列化和反序列化，防止潜在的安全问题。
     config.active_record.yaml_column_permitted_classes = [Symbol, Hash, Array, Time, Date, ActiveRecord::Base, ActiveSupport::HashWithIndifferentAccess]
    #  配置Rails凭据的密钥路径和内容路径。Rails凭据是一种安全地存储敏感信息（如API密钥）的方法，它使用加密的YAML文件。这里指定了密钥文件和加密凭据文件的路径。
     config.credentials.key_path = Rails.root.join("config/secrets/master.key")
     config.credentials.content_path = Rails.root.join("config/secrets/credentials.yml.enc")

     # Establish db connection upon entering rails console
    #  这部分代码确保了每次进入Rails控制台时都会建立数据库连接。这对于在控制台中直接操作数据库非常有用，因为它确保了数据库连接的可用性。
     console do
       ActiveRecord::Base.connection
     end
    #
    # The exception app will be used if `consider_all_requests_local` is set to false,
    # which is by default in production only
    #
    # More details about exceptions_app:
    # https://guides.rubyonrails.org/configuring.html#rails-general-configuration
    # https://github.com/rails/rails/blob/6-0-stable/actionpack/lib/action_dispatch/middleware/public_exceptions.rb
    #

    # config.x.cypress =
    # (Rails.env.development? || Rails.env.test?) &&
    #   ActiveModel::Type::Boolean.new.cast(ENV.fetch('CYPRESS', false))

    # To allow Inertia.js handle backend exceptions, we need to register an
    # exceptions_app to show the exceptions via the `Error` Vue component.
    # This app needs to be a middleware. To keep things simple we define an
    # anonymous controller with a `show` method. This allows us to use
    # `render inertia: ...`
    #
    # The exception app will be used if `consider_all_requests_local` is set to false,
    # which is by default in production only
    #
    # More details about exceptions_app:
    # https://guides.rubyonrails.org/configuring.html#rails-general-configuration
    # https://github.com/rails/rails/blob/6-0-stable/actionpack/lib/action_dispatch/middleware/public_exceptions.rb
    #
    config.exceptions_app = ->(env) do
        Class.new(ActionController::Base) do # rubocop:disable Rails/ApplicationController
          layout "application"

          def show
            # Get the status code from the path, which is /500 or /404 etc.
            status = request.path_info.delete_prefix("/").to_i

            render inertia: "error",
              props: {status: status}, # Make the status code available to the Vue component
              status: status             # Return the same status code in the request header
          end
        end.action(:show).call(env)
    end
  end
end
