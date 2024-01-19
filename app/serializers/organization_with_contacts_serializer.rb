class OrganizationWithContactsSerializer < OrganizationSerializer
  has_many :contacts, serializer: ModelSerializer
end
