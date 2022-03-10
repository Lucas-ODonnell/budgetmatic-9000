require_relative '../rails_helper.rb'

RSpec.describe BudgetEntry, type: :model do
  describe "creating a budget entry" do
    before { @valid_budget_entry = create(:budget_entry) }
    context "When budget entry is properly created" do
      it "should be valid" do
        expect(@valid_budget_entry).to be_valid
      end

      it "should convert users string price value to integer" do
        @valid_budget_entry.price = "$5.34"
        expect(@valid_budget_entry.price).to eq(534)
      end
    end
    context "When budget entry is improperly created" do
      it "should be invalid if name is blank" do
        @valid_budget_entry.name = ""
        expect(@valid_budget_entry).to_not be_valid
      end
      it "should be invalid if category is blank" do
        @valid_budget_entry.category = ""
        expect(@valid_budget_entry).to_not be_valid
      end
      it "should be invalid if there is no associated budget" do
        @valid_budget_entry.budget_id = nil
        expect(@valid_budget_entry).to_not be_valid
      end
      it "should be invalid if there is no date" do
        @valid_budget_entry.date = ""
        expect(@valid_budget_entry).to_not be_valid
      end
    end
  end
  describe "budget_entry associations" do
    it "belongs to one budget" do
      budget_entry = BudgetEntry.reflect_on_association(:budget)
      expect(budget_entry.macro).to eq(:belongs_to)
    end
  end
end