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
        head :no_content
      end
    end
  end
end
