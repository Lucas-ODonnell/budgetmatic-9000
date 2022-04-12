require_relative '../rails_helper.rb';
require 'json'

RSpec.describe BudgetEntry, type: :serializer do
  describe 'budget_serializer' do
    let(:budget_entry) {create(:budget_entry)}
    let(:json) { BudgetEntrySerializer.new(budget_entry).serializable_hash.to_json }       
    let(:attributes) { JSON.parse(json)["data"] }

    context 'it serializes json' do
      it "should successfully serialize category" do
        expect(attributes["attributes"]["category"]).to eq(budget_entry.category)
      end
      it "should successfully serialize name" do
        expect(attributes["attributes"]["name"]).to eq(budget_entry.name)
      end
      it "should successfully serialize int price" do
        expect(attributes["attributes"]["int_price"]).to eq(budget_entry.price)
      end
      it "should successfully serialize date to the month" do
        expect(attributes["attributes"]["date"]).to eq(budget_entry.date.strftime("%B"))
      end
    end
  end
end

