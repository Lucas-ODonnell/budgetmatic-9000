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
          price: "3.50"
        }
      }
    end
    context "POST /create" do
      it "should redirect if user is not logged in" do
        post api_v1_budget_entries_path, params: budget_entries_params
        expect(response).to have_http_status(302)
      end

      it "should cause an error if params are invalid" do
        headers = { 'Accept' => 'application/json' }
        auth_headers = Devise::JWT::TestHelpers.auth_headers(headers, @user)
        post api_v1_budget_entries_path, params: { budget_entry: { category: "Food", name: "", price:"$5"} }, headers: auth_headers
        expect(response).to have_http_status(422)
      end

      it "should be valid otherwise" do
        headers = { 'Accept' => 'application/json' }
        auth_headers = Devise::JWT::TestHelpers.auth_headers(headers, @user)
        post api_v1_budget_entries_path, headers: auth_headers, params: budget_entries_params       
        expect(response).to have_http_status(200)
      end
    end
    context "PUT /update" do
      before(:each) do
        @budget_entry = create(:budget_entry)
      end
      it "should cause an error if params are invalid" do
        headers = { 'Accept' => 'application/json' }
        auth_headers = Devise::JWT::TestHelpers.auth_headers(headers, @user)
        put api_v1_budget_entry_path(@budget_entry.id), headers: auth_headers, params: { budget_entry: { category: "Utilities", name: "", price: "$3.43" } }
        expect(response).to have_http_status(422)
      end
      it "should pass of params are valid" do
        headers = { 'Accept' => 'application/json' }
        auth_headers = Devise::JWT::TestHelpers.auth_headers(headers, @user)
        put api_v1_budget_entry_path(@budget_entry.id), headers: auth_headers, params: { budget_entry: { category: "Utilities", name: "Electric", price: "$79.89" } }
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
