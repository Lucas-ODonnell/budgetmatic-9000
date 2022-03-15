module Api
  module V1
    class Users::SessionsController < Devise::SessionsController
      respond_to :json

      private

      def respond_with(resource, _opts = {})
        if resource.persisted?
          render json: {
            status: {code: 200, message: 'Logged in successfully.'},
            data: UserSerializer.new(resource).serializable_hash[:data][:attributes]
          }, status: :ok
          else
          render json: {
            status: {message: "Sign in failed. #{resource.errors.full_messages.to_sentence}"}
          }, status: :unprocessable_entity
        end
      end

      def respond_to_on_destroy
        if current_user
          render json: {
            status: 200,
            message: "logged out successfully"
          }, status: :ok
          else
          render json: {
            status: 401,
            message: "Couldn't find an active session."
          }, status: :unauthorized
        end
      end
    end
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
