require_relative "../rails_helper.rb"
require 'devise/jwt/test_helpers'

RSpec.describe "Budgets", type: :request do
  describe "controller methods" do
    before { @user = create(:user) }
    let(:budget_params) do
      {
        budget: {
          name: "My Budget"
        }
      }
    end
    context "GET /index" do
      it "should return unauthorized if user is not logged in" do
        get api_v1_budgets_path
        expect(response).to have_http_status(401)
      end
      it "should show the index if user is logged in" do
        headers = { 'Accept' => 'application/json', 'Content-Type' => 'application/json' }
        auth_headers = Devise::JWT::TestHelpers.auth_headers(headers, @user)
        get api_v1_budgets_path, headers: auth_headers
        expect(response).to have_http_status(200)
      end
    end
    context "POST /create" do
      it "should return unauthorized if user is not logged in" do
        post api_v1_budgets_path, params: budget_params
        expect(response).to have_http_status(401)
      end

      it "should cause an error if params are invalid" do
        headers = { 'Accept' => 'application/json' }
        auth_headers = Devise::JWT::TestHelpers.auth_headers(headers, @user)
        post api_v1_budgets_path, params: { budget: { name: "" } }, headers: auth_headers
        expect(response).to have_http_status(422)
      end

      it "should be valid otherwise" do
        headers = { 'Accept' => 'application/json' }
        auth_headers = Devise::JWT::TestHelpers.auth_headers(headers, @user)
        post api_v1_budgets_path, headers: auth_headers, params: budget_params       
        expect(response).to have_http_status(200)
      end
    end
    context "PUT /update" do
      before(:each) do
        @budget = create(:budget)
      end
      it "should cause an error if params are invalid" do
        headers = { 'Accept' => 'application/json' }
        auth_headers = Devise::JWT::TestHelpers.auth_headers(headers, @user)
        put api_v1_budget_path(@budget.id), headers: auth_headers, params: { budget: { name: "" } }
        expect(response).to have_http_status(422)
      end
      it "should pass of paramas are valid" do
        headers = { 'Accept' => 'application/json' }
        auth_headers = Devise::JWT::TestHelpers.auth_headers(headers, @user)
        put api_v1_budget_path(@budget.id), headers: auth_headers, params: { budget: { name: "My budget new name" } }
        expect(response).to have_http_status(200)
      end
    end
    context "Delete /Destroy" do
      it "should delete a budget" do
        @budget = create(:budget)
        headers = { 'Accept' => 'application/json' }
        auth_headers = Devise::JWT::TestHelpers.auth_headers(headers, @user)
        delete api_v1_budget_path(@budget.id), headers: auth_headers
        expect(response).to have_http_status(204)
      end
    end
  end
end
