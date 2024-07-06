class Organizations::IndexSerializer < OrganizationSerializer
  attributes(
    :id,
    :updated_at,
    :created_at,
  )
end
