module Api
  module V1
    class UsersController < ApplicationController
      before_action :authenticate_user!
      def show
        render json: { message: "If you this this it's working" }
      end
    end
  end
end
