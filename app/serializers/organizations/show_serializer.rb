class Organizations::ShowSerializer < OrganizationSerializer
  attributes(
    :id,
    :updated_at,
    :created_at,
  )
end
