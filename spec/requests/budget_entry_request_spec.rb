require_relative "../rails_helper.rb"
require 'devise/jwt/test_helpers'

RSpec.describe "BudgetEntries", type: :request do
  describe "controller methods" do
    before(:each) do
      @user = create(:user)
      @budget = create(:budget, user_id: @user.id)
    end
    let(:budget_entries_params) do
      {
        budget_entry: {
          category: "Food",
          name: "cabbage",
          price: "3.50",
          budget_id: @budget.id
        }
      }
    end
    context "GET /index" do
      it "should return unauthorized if user is not logged in" do
        get api_v1_budget_entries_path
        expect(response).to have_http_status(401)
      end
      it "should return 200 if user is logged in" do
        headers = { 'Accept' => 'application/json' }
        auth_headers = Devise::JWT::TestHelpers.auth_headers(headers, @user)
        get api_v1_budget_entries_path, headers: auth_headers, params: { id: @budget.id }
        expect(response).to have_http_status(200)
      end
    end
    context "POST /create" do
      it "should return unauthorized if user is not logged in" do
        post api_v1_budget_entries_path, params: budget_entries_params
        expect(response).to have_http_status(401)
      end

      it "should cause an error if params are invalid" do
        headers = { 'Accept' => 'application/json' }
        auth_headers = Devise::JWT::TestHelpers.auth_headers(headers, @user)
        post api_v1_budget_entries_path, params: { budget_entry: { category: "Food", name: "", price:"$5", budget_id: @budget.id}}, headers: auth_headers
        expect(response).to have_http_status(422)
      end

      it "should be valid otherwise" do
        headers = { 'Accept' => 'application/json' }
        auth_headers = Devise::JWT::TestHelpers.auth_headers(headers, @user)
        post api_v1_budget_entries_path, headers: auth_headers, params: budget_entries_params       
        expect(response).to have_http_status(200)
      end
    end
    context "Delete /Destroy" do
      it "should delete a budget entry" do
        @budget_entry = create(:budget_entry)
        headers = { 'Accept' => 'application/json' }
        auth_headers = Devise::JWT::TestHelpers.auth_headers(headers, @user)
        delete api_v1_budget_entry_path(@budget_entry.id), headers: auth_headers
        expect(response).to have_http_status(204)
      end
    end
  end
end
