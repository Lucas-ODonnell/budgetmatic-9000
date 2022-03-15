class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  private

  def sign_up_params
    params.require(:user).permit(:name, :email,:password,:password_confirmation)
  end

  def account_update_params
    params.require(:user).permit(:name, :email,:password,:password_confirmation, :current_password)
  end

  def respond_with(resource, _opts = {})
    if resource.persisted?
      render json: {
        status: {code: 200, message: "Signed up successfully."},
        data: UserSerializer.new(resource).serializable_hash[:data][:attributes]
      }
      else
      render json: {
        status: {message: "User couldn't be created. #{resource.errors.full_messages.to_sentence}"}
      }, status: :unprocessable_entity
    end
  end
end
