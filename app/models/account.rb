# == Schema Information
#
# Table name: accounts
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Account < ApplicationRecord
  has_many :organizations, dependent: :destroy
  has_many :contacts, dependent: :destroy
  has_many :users, dependent: :destroy

  validates :name, presence: true
end
