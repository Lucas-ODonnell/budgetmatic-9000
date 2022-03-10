module Api
  module V1
    class Users::SessionsController < Devise::SessionsController
      respond_to :json

      private

      def respond_with(resource, _opts = {})
        if resource.persisted?
          render json: { message: 'You are logged in.' }, status: 200
          else
          render json: { message: "Something went wrong" }, status: 401
        end
      end

      def respond_to_on_destroy
        log_out_success && return 
      end

      def log_out_success
        render json: { message: "You are logged out." }, status: 205
      end
    end
  end
end
