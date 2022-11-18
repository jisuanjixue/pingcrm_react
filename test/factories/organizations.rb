# == Schema Information
#
# Table name: organizations
#
#  id          :bigint           not null, primary key
#  account_id  :bigint           not null
#  name        :string           not null
#  email       :string
#  phone       :string
#  address     :string
#  city        :string
#  region      :string
#  country     :string
#  postal_code :string
#  deleted_at  :datetime
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
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
