class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  include Devise::JWT::RevocationStrategies::JTIMatcher
  devise :database_authenticatable, :jwt_authenticatable,
    :registerable, jwt_revocation_strategy: JwtDenylist
  has_one :budget, dependent: :destroy

  validates :name, :password, :email, presence: true, allow_blank: false
  validates :email, uniqueness: true
  validates_format_of :email, :with => /\A[^@,\s]+@[^@,\s]+\.[^@,\s]+\z/
  validates :password, length: { minimum: 6 }
  
  end
