namespace :types do
  desc "Annotate models and fixtures with database schema"
  task :generate => [:environment] do
    system("rails types_from_serializers:generate")
    system("rails annotate:models")
  end
end
