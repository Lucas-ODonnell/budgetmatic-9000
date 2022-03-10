require_relative '../rails_helper.rb'

RSpec.describe Budget, type: :model do
  describe "creating a new budget" do
    before { @valid_budget = create(:budget) }
    context "When budget is properly created" do
      example "valid budget" do
        expect(@valid_budget).to be_valid
      end
    end
    context "When budget is improperly created" do
      it "is an invalid budget when name is nil" do
        @valid_budget.name = nil
        expect(@valid_budget).to_not be_valid
      end
      it "is invalid when name is blank" do
        @valid_budget.name = ""
        expect(@valid_budget).to_not be_valid
      end
    end
  end
  describe "budget associations" do
    it "can have many budget entries" do
      budget = Budget.reflect_on_association(:budget_entries)
      expect(budget.macro).to eq(:has_many)
    end
  end

end
