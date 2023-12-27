if Rails.env.development?
  TypesFromSerializers.config do |config|
    config.output_dir = "app/javascript/data-types"
    config.sql_to_typescript_type_mapping.default = :any
  end
end