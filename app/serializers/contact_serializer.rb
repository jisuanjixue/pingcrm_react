# == Schema Information
#
# Table name: contacts
#
#  id              :bigint           not null, primary key
#  address         :string
#  city            :string
#  country         :string
#  deleted_at      :datetime
#  email           :string
#  first_name      :string           not null
#  last_name       :string           not null
#  phone           :string
#  postal_code     :string
#  region          :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  account_id      :bigint           not null
#  organization_id :bigint
#
# Indexes
#
#  index_contacts_on_account_id       (account_id)
#  index_contacts_on_organization_id  (organization_id)
#
# Foreign Keys
#
#  fk_rails_...  (account_id => accounts.id)
#  fk_rails_...  (organization_id => organizations.id)
#
class ContactSerializer < ApplicationSerializer
  object_as :contact

  attributes(
    :account_id,
    :organization_id,
    :first_name,
    :last_name,
    :email,
    :phone,
    :address,
    :city,
    :region,
    :country,
    :postal_code,
    :deleted_at,
  )
end
