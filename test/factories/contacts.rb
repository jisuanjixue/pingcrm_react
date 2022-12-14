# == Schema Information
#
# Table name: contacts
#
#  id              :bigint           not null, primary key
#  account_id      :bigint           not null
#  organization_id :bigint
#  first_name      :string           not null
#  last_name       :string           not null
#  email           :string
#  phone           :string
#  address         :string
#  city            :string
#  region          :string
#  country         :string
#  postal_code     :string
#  deleted_at      :datetime
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
require 'faker'

FactoryBot.define do
  factory :contact do
    organization
    last_name { Faker::Name.last_name }
    first_name { Faker::Name.first_name }
    email { Faker::Internet.unique.email }
    phone { Faker::PhoneNumber.phone_number }
    address { Faker::Address.street_address }
    city { Faker::Address.city }
    region { Faker::Address.state }
    country { 'US' }
    postal_code { Faker::Address.postcode }
  end
end
