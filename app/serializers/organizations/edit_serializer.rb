class Organizations::EditSerializer < OrganizationSerializer

  attributes(
    :id,
    :updated_at,
    :created_at,
  )
end
