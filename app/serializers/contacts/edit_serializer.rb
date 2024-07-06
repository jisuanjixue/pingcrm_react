class Contacts::EditSerializer < ContactSerializer

  attributes(
    :id,
    :updated_at,
    :created_at,
  )
end
