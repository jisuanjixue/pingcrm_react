# require 'types_from_serializers'
# class BaseSerializer < Oj::Serializer
#   include TypesFromSerializer::DSL
# end

OjSerializers::Serializer::ALLOWED_INSTANCE_VARIABLES |= ['scope']

class BaseSerializer < Oj::Serializer
  private

  # Backwards Compatibility: Allows to access the controller in the same way
  # than ActiveModel::Serializers.
  def scope
    @scope ||= RequestLocals[:current_controller]
  end

  include TypesFromSerializers::DSL
end