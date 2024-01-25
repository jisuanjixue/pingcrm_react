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
class Organization < ApplicationRecord
  belongs_to :account
  has_many :contacts, dependent: :destroy

  validates :name, presence: true

  include SoftDelete

  def self.ransackable_attributes(auth_object = nil)
    %w(name email phone address city region country postal_code created_at updated_at)
  end

  # scope :search, ->(query) { query.present? ? where("organizations.name ILIKE ?", "%#{query}%") : all }
end
