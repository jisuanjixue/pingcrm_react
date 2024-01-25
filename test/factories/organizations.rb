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
require 'faker'

FactoryBot.define do
  factory :organization do
    account
    name { Faker::Company.name }
    email { Faker::Internet.unique.email }
    phone { Faker::PhoneNumber.phone_number }
    address { Faker::Address.street_address }
    city { Faker::Address.city }
    region { Faker::Address.state }
    country { 'US' }
    postal_code { Faker::Address.postcode }
  end
end
