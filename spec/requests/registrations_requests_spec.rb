require_relative '../rails_helper.rb'

describe Users::RegistrationsController, type: :request do
  let(:user) { create(:user) }
  let(:user2) { create(:user) }
  describe "registering a new user" do
    context "When the request goes through" do
      before do
        post user_registration_path, params: {
          user: {
            name: "Bob",
            email: "test@gmail.com",
            password: "aardvark"
          }
        }
      end
      it "should return status 200" do
        expect(response.status).to eq(200)
      end
      it "should return an authentication token" do
        expect(response.headers).to include("Authorization")
      end
    end
    context "When the request fails" do
      before do
        post user_registration_path, params: {
          user: {
            name: "Jim",
            email: user2.email,
            password: "rhinocerous"
          }
        }
      end
      it "should return 200 if email is already in use" do
        expect(response.status).to eq(200)
      end
      it "should return an error message if email is already in use" do
        expect(response.body).to include("Email is already registered")
      end
    end
  end
end
