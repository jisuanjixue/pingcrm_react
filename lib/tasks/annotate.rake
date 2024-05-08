namespace :annotate do
  # run rake annotate:models
  desc "Annotate models and fixtures with database schema"
  task :models => [:environment] do
    system("rails annotate_models")
  end

  # run rake annotate:routes
  desc "Annotate controllers with route information"
  task :routes => [:environment] do
    system("rails js:routes:typescript")
    system("chusaku")
  end

  task :all => [:routes, :models]
end
