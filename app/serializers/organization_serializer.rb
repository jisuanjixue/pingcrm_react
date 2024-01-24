class OrganizationSerializer < BaseSerializer
  attributes(
    :id,
     :account_id,
     :name,
     :email,
     :phone,
     :address,
     :city,
     :region,
     :country,
     :postal_code,
     :created_at
  )

  # has_one :composer, serializer: ComposerSerializer
end