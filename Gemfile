source 'https://gems.ruby-china.com/'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '~> 3.3.0'

# Full-stack web application framework. (https://rubyonrails.org)
gem 'rails', '~> 7.1.2'

# Pg is the Ruby interface to the PostgreSQL RDBMS (https://github.com/ged/ruby-pg)
gem 'pg', '~> 1.5', '>= 1.5.3'

# Puma is a simple, fast, threaded, and highly parallel HTTP 1.1 server for Ruby/Rack applications (https://puma.io)
gem 'puma', '~> 6.4'
gem 'io-console', '0.6.0'

# Use Vite in Rails and bring joy to your JavaScript experience (https://github.com/ElMassimo/vite_ruby)
gem 'vite_rails'

# Create JSON structures via a Builder-style DSL (https://github.com/rails/jbuilder)
gem 'jbuilder'

# High-level wrapper for processing images for the web with ImageMagick or libvips. (https://github.com/janko/image_processing)
gem 'image_processing', '~> 1.2'

gem 'vite_plugin_legacy', '~> 3.0', '>= 3.0.2'

# Boot large ruby/rails apps faster (https://github.com/Shopify/bootsnap)
gem 'bootsnap', require: false

gem 'honeybadger', "~> 5.0"

group :development, :test do
  # See https://guides.rubyonrails.org/debugging_rails_applications.html#debugging-with-the-debug-gem
  # Debugging functionality for Ruby (https://github.com/ruby/debug)
  gem "debug", '~> 1.6', '>= 1.6.2', platforms: [:mri, :mingw, :x64_mingw]

  # Automatic Ruby code style checking tool. (https://github.com/rubocop/rubocop)
  gem 'rubocop', require: false

  # RSpec for Rails (https://github.com/rspec/rspec-rails)
  gem 'rspec-rails'
  # Code style checking for RSpec files (https://github.com/rubocop/rubocop-rspec)
  gem 'rubocop-rspec', require: false

  # Automatic performance checking tool for Ruby code. (https://github.com/rubocop/rubocop-performance)
  gem 'rubocop-performance', require: false

  # Automatic Rails code style checking tool. (https://github.com/rubocop/rubocop-rails)
  gem 'rubocop-rails', require: false

  # factory_bot_rails provides integration between factory_bot and rails 5.0 or newer (https://github.com/thoughtbot/factory_bot_rails)
  gem 'factory_bot_rails'
    # Autoload dotenv in Rails. (https://github.com/bkeepers/dotenv)
  gem 'dotenv-rails'

end

group :development do
  gem 'guard'
  # A debugging tool for your Ruby on Rails applications. (https://github.com/rails/web-console)
  gem 'web-console'

  gem 'annotate', '~> 3.2.0'
  gem 'bullet', '~> 7.1.4'

  # Profiles loading speed for rack applications. (https://miniprofiler.com)
  gem 'rack-mini-profiler'

  # Rails application preloader (https://github.com/rails/spring)
  gem 'spring'

  # Brings Rails named routes to javascript (http://github.com/railsware/js-routes)
  gem 'js-routes', '~> 2.2', '>= 2.2.8'
    # Guard gem for RSpec (https://github.com/guard/guard-rspec)
  gem 'guard-rspec', require: false

  # prettier plugin for the Ruby programming language (https://github.com/prettier/plugin-ruby#readme)
  gem 'prettier'
end

group :test do
  # Capybara aims to simplify the process of integration testing Rack applications, such as Rails, Sinatra or Merb (https://github.com/teamcapybara/capybara)
  gem 'capybara'

  # Selenium is a browser automation tool for automated testing of webapps and more (https://selenium.dev)
  gem 'selenium-webdriver'

  # Easy download and use of browser drivers. (https://github.com/titusfortner/webdrivers)
  gem 'webdrivers'

  # Code coverage for Ruby (https://github.com/simplecov-ruby/simplecov)
  gem 'simplecov', require: false
end

# Timezone Data for TZInfo (https://tzinfo.github.io)
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]

# Inertia adapter for Rails (https://github.com/inertiajs/inertia-rails)
gem 'inertia_rails', '~> 3.0.0'

# Easily generate fake data (https://github.com/faker-ruby/faker)
gem 'faker', require: false

# The kick-ass pagination ruby gem (https://github.com/ddnexus/pagy)
gem 'pagy'

# Flexible authentication solution for Rails with Warden (https://github.com/heartcombo/devise)
gem 'devise'

# A fast JSON parser and serializer. (http://www.ohler.com/oj)
gem 'oj'

# Faster JSON serialization for Ruby on Rails. Easily migrate away from Active Model Serializers (https://github.com/ElMassimo/oj_serializers)
gem 'oj_serializers'

# Simple authorization solution for Rails. (https://github.com/CanCanCommunity/cancancan)
gem 'cancancan'

# Automatically generate TypeScript interfaces from your JSON serializers.
gem 'types_from_serializers'

gem 'request_store_rails'

group :production do
  # Error reports you can be happy about. (https://github.com/honeybadger-io/honeybadger-ruby)

end

gem "ransack", "~> 4.1"
