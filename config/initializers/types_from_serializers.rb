if Rails.env.development?
  TypesFromSerializers.config do |config|
    config.output_dir = "app/javascript/data-types"
    config.native_types = ["Record"]
  end
end