class ApplicationSerializer < Oj::Serializer
  include TypesFromSerializers::DSL

  identifier

end
