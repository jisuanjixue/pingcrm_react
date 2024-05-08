# == Route Map
#
require "sidekiq/web"

Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # if Rails.configuration.x.cypress
  #   namespace :cypress do
  #     delete 'cleanup', to: 'cleanup#destroy'
  #   end
  # end

  if defined? Debugbar
    mount Debugbar::Engine => Debugbar.config.prefix
  end

  devise_for :users, skip: %i[sessions passwords registrations]
  as :user do
    get "login", to: "users/sessions#new", as: :new_user_session
    post "login", to: "users/sessions#create", as: :user_session
    match "logout", to: "users/sessions#destroy", as: :destroy_user_session, via: Devise.mappings[:user].sign_out_via
  end

  resources :reports, only: [:index]
  resources :users, except: [:show] do
    member { put "restore" }
  end
  resources :organizations  do
    member { put "restore" }
  end
  resources :contacts  do
    member { put "restore" }
  end

  root "dashboard#index"

#   在Ruby on Rails中，draw(:api) 是一个用于加载和执行路由文件的方法。这里的 :api 是一个符号，它指向一个特定的路由文件，通常是 config/routes/api.rb。这个文件包含了API相关的路由定义。
# 当你在主路由文件（通常是 config/routes.rb）中调用 draw(:api) 时，Rails会尝试加载并执行 config/routes/api.rb 文件中定义的路由。这样做的好处是可以将API路由与其他类型的路由（如Web路由）分开管理，使得路由文件更加清晰和组织有序。
# 例如，如果你的应用同时提供Web界面和API接口，你可以在 config/routes.rb 中定义Web路由，然后通过 draw(:api) 加载API路由。这样，你的API路由就会被添加到应用的路由表中，而且可以通过URL访问。
# 总之，draw(:api) 是一个方便的方法，用于在Rails应用中组织和加载不同类型的路由文件。

  # draw(:api)
end
