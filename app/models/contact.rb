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
class Contact < ApplicationRecord
  belongs_to :account
  belongs_to :organization, optional: true

  validates :first_name, :last_name, presence: true

  include SoftDelete

  scope :order_by_name, -> { order(:last_name, :first_name) }

  def self.ransackable_attributes(auth_object = nil)
    %w(first_name last_name name email phone address city region country postal_code created_at updated_at)
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
