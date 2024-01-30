# == Schema Information
#
# Table name: organizations
#
#  id          :bigint           not null, primary key
#  address     :string
#  city        :string
#  country     :string
#  deleted_at  :datetime
#  email       :string
#  name        :string           not null
#  phone       :string
#  postal_code :string
#  region      :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  account_id  :bigint           not null
#
# Indexes
#
#  index_organizations_on_account_id  (account_id)
#
# Foreign Keys
#
#  fk_rails_...  (account_id => accounts.id)
#
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
end
