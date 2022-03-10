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
    register_success && return if resource.persisted?
    register_failed
  end

  def register_success
    render json: { message: 'Signed up sucessfully.' }
  end

  def register_failed
    render json: { message: "Email is already registered." }, status: 200
  end
end
