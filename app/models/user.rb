class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  include Devise::JWT::RevocationStrategies::JTIMatcher
  devise :database_authenticatable, :jwt_authenticatable,
    :registerable, jwt_revocation_strategy: self
  has_one :budget, dependent: :destroy
  has_many :budget_entries, through: :budget, dependent: :destroy
  validates :name, :password, :email, presence: true, allow_blank: false
  validates :email, uniqueness: true
  validates_format_of :email, :with => /\A[^@,\s]+@[^@,\s]+\.[^@,\s]+\z/
  validates :password, length: { minimum: 6 }

  after_create :create_budget

  def create_budget
    id = self.id
    name = self.name
    Budget.create(name: "#{name}'s budget", user_id: id)
  end
  
  end

#how the jti token is revoked
#module Devise
  #module JWT
  #  module RevocationStrategies
  #    # This strategy must be included in the user model, and requires that it
  #    # has a `jti` column. It adds the value of the `jti` column as the `jti`
  #    # claim in dispatched tokens.
  #    #
  #    # In order to tell whether a token is revoked, it just compares both `jti`
  #    # values. On revocation, it changes column value so that the token is no
  #    # longer valid.
  #    module JTIMatcher
  #      extend ActiveSupport::Concern

  #      included do
  #        before_create :initialize_jti

  #        # see Warden::JWTAuth::Interfaces::RevocationStrategy#jwt_revoked?
  #        def self.jwt_revoked?(payload, user)
  #          payload['jti'] != user.jti
  #        end

  #        # see Warden::JWTAuth::Interfaces::RevocationStrategy#revoke_jwt
  #        def self.revoke_jwt(_payload, user)
  #          user.update_column(:jti, generate_jti)
  #        end

  #        # Generates a random and unique string to be used as jti
  #        def self.generate_jti
  #          SecureRandom.uuid
  #        end
  #      end

  #      # Warden::JWTAuth::Interfaces::User#jwt_payload
  #      def jwt_payload
  #        { 'jti' => jti }
  #      end

  #      private

  #      def initialize_jti
  #        self.jti = self.class.generate_jti
  #      end
  #    end
  #  end
  #end
#end
