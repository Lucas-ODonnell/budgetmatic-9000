require_relative "../rails_helper.rb"
require 'devise/jwt/test_helpers'

RSpec.describe "Users", type: :request do
  describe "users_controller" do
    let(:user) { create(:user) }
    context "GET /show valid" do
      before do
        headers = { 'Accept' => 'application/json' }
        auth_headers = Devise::JWT::TestHelpers.auth_headers(headers, user)
        get api_v1_user_path(user.id), headers: auth_headers
      end
      it "should return a status 200" do
        expect(response).to have_http_status(200)
      end
      it "should return a name" do
        expect(response.body).to include(user.name, user.email)
      end
    end
    context "GET /show invalid" do
      before do
        headers = { 'Accept' => 'application/json' }
        get api_v1_user_path(user.id)
      end
      it "should reroute if user can't be authenticated" do
        expect(response).to have_http_status(302)
      end
    end
    context "PUT /update valid" do
      before do
        headers = { 'Accept' => 'application/json' }
        auth_headers = Devise::JWT::TestHelpers.auth_headers(headers, user)
        put api_v1_user_path(user.id), params: { user: { email: user.email, name: "Billy Bob", password: user.password} }, headers: auth_headers     
      end
      it "should return a status 200" do
        expect(response).to have_http_status(200)
      end
      it "should have the name Billy Bob" do
        expect(response.body).to include("Billy Bob")
      end
    end
    context "PUT /update invalid" do
      before do
        put api_v1_user_path(user.id), params: { user: { email: user.email, name: "Billy Bob", password: user.password} }
      end
      it "should reroute if user can't be authenticated" do
        expect(response).to have_http_status(302)
      end
    end
    context "Delete /destroy" do
      it "should delete a user" do
        headers = { 'Accept' => 'application/json' }
        auth_headers = Devise::JWT::TestHelpers.auth_headers(headers, user)
        delete api_v1_user_path(user.id), headers: auth_headers
        expect(response).to have_http_status(204)
      end
      it "should redirect if user isn't logged in" do
        delete api_v1_user_path(user.id)
        expect(response).to have_http_status(302)
      end
    end
  end
end
