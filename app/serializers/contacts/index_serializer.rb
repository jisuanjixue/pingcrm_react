class Contacts::IndexSerializer < ContactSerializer
  attributes(
    :id,
    :updated_at,
    :created_at,
  )
end
