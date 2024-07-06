class Contacts::ShowSerializer < ContactSerializer
  attributes(
    :id,
    :updated_at,
    :created_at,
  )
end
