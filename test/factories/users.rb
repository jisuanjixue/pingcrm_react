# == Schema Information
#
# Table name: users
#
#  id                     :bigint           not null, primary key
#  account_id             :bigint           not null
#  first_name             :string           not null
#  last_name              :string           not null
#  email                  :string           not null
#  owner                  :boolean          default(FALSE), not null
#  deleted_at             :datetime
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  encrypted_password     :string           default(""), not null
#  reset_password_token   :string
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#
FactoryBot.define do
  factory :user do
    first_name { 'John' }
    last_name { 'Doe' }
    email { Faker::Internet.unique.email }
    password { 'secret' }
  end
end
