if Rails.env.development?
  TypesFromSerializers.config do |config|
    config.output_dir = "app/javascript/data-types"
    config.native_types = ["Record"]
    config.sql_to_typescript_type_mapping.default = :any
  end
end