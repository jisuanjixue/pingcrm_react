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
class Contact < ApplicationRecord
  belongs_to :account
  belongs_to :organization, optional: true

  validates :first_name, :last_name, presence: true

  include SoftDelete

  scope :order_by_name, -> { order(:last_name, :first_name) }

  def self.ransackable_attributes(auth_object = nil)
    %w(first_name last_name name email phone address city region country postal_code created_at)
  end


  # scope :search, ->(query) do
  #   if query.present?
  #     left_joins(:organization).
  #       where("contacts.first_name ILIKE :query OR
  #              contacts.last_name  ILIKE :query OR
  #              contacts.email      ILIKE :query OR
  #              organizations.name  ILIKE :query",
  #             query: "%#{query}%")
  #   else
  #     all
  #   end
  # end

  def name
    "#{last_name}, #{first_name}"
  end
end
