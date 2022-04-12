require_relative '../rails_helper.rb';
require 'json'

RSpec.describe Budget, type: :serializer do
  describe 'budget_serializer' do
    let(:budget) {create(:budget)}
    let(:json) { BudgetSerializer.new(budget).serializable_hash.to_json }       
    let(:attributes) { JSON.parse(json)["data"] }

    context 'it serializes json' do
      it "successfully serializes name" do
        expect(attributes["attributes"]["name"]).to eq(budget.name)
      end
      it "successfully serializes monthly_budget" do
        expect(attributes["attributes"]["monthly_budget"]).to eq(ApplicationHelper.number_to_currency(budget.monthly_budget/100.0))
      end
      it "successfully serializes id" do
        expect(attributes["id"]).to eq(budget.id.to_s)
      end
      it "serializes int_monthly_budget" do
        expect(attributes["attributes"]["int_monthly_budget"]).to eq(budget.monthly_budget)
      end
    end
  end
end

