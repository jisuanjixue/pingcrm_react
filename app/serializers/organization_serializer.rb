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
  )

  # has_one :composer, serializer: ComposerSerializer
end