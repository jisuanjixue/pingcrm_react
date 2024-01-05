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
class Organization < ApplicationRecord
  belongs_to :account
  has_many :contacts, dependent: :destroy

  validates :name, presence: true

  include SoftDelete

  def self.ransackable_attributes(auth_object = nil)
    %w(name email phone address city region country postal_code created_at)
  end

  # scope :search, ->(query) { query.present? ? where("organizations.name ILIKE ?", "%#{query}%") : all }
end
