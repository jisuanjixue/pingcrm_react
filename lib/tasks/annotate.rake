namespace :annotate do
  desc "Annotate models and fixtures with database schema"
  task :models => [:environment] do
    system("rails annotate_models")
  end

  desc "Annotate controllers with route information"
  task :routes => [:environment] do
    system("rails js:routes:typescript")
    system("chusaku")
  end

  task :all => [:routes, :models]
end
