class Role < ApplicationRecord
  has_many :roles_users
  has_many :users, through :roles_users

  validates_presence_of :name

  enum name: [:admin]
end
