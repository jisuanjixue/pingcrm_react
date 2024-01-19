# require 'types_from_serializers'
# class BaseSerializer < Oj::Serializer
#   include TypesFromSerializer::DSL
# end

class BaseSerializer < Oj::Serializer
  include TypesFromSerializers::DSL
end