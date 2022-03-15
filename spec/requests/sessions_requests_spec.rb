require_relative '../rails_helper.rb'

describe Users::SessionsController, type: :request do
  let (:user) { create(:user) }
  describe "new user session" do
    context 'When logging in successfully' do
      before do
        login_with_api(user)
      end

      it 'returns a token' do
        expect(response.headers).to include("Authorization")
      end

      it 'returns 200' do
        expect(response.status).to eq(200)
      end
    end

    context 'When password is missing' do
      before do
        post user_session_path, params: {
          user: {
            email: user.email,
            password: ""
          }
        }
      end

      it 'returns 401' do
        expect(response.status).to eq(401)
      end
      it 'returns an error message' do
        expect(response.body).to include("Invalid Email or password")
      end
    end
  end
  describe "Logging out" do
    context 'When logging out successfully' do
      before do
        login_with_api(user)
        delete destroy_user_session_path
      end
      it "Should return status 204" do
        expect(response.status).to eq(204)
      end
    end
  end
end


