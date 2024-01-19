class ModelSerializer < BaseSerializer
  object_as :model, types_from: :AnyModel

  attributes(
    :id,
    :name,
  )
end
