require_relative '../rails_helper.rb'

RSpec.describe User, type: :model do
  describe "creating a new user" do
    before { @user = create(:user) }
    context "when successful" do
      it "should create a valid user" do
        expect(@user).to be_valid
      end
    end
    context "when unsuccessful" do
      it "should not be valid if name is blank" do
        @user.name = ""
        expect(@user).to_not be_valid
      end
      it "should not be valid if email is blank" do
        @user.email = ""
        expect(@user).to_not be_valid
      end
      it "should not be valid if email isn't an email" do
        @user.email = "tacos.tacos.com"
        expect(@user).to_not be_valid
      end
      it "should not be valid if password is blank" do
        @user.password = ""
        expect(@user).to_not be_valid
      end
      it "should not be valid if password is too short" do
        @user.password = "moo"
        expect(@user).to_not be_valid
      end
    end
  end
  describe "user associations" do
    it "can have one budgets" do
      user = User.reflect_on_association(:budget)
      expect(user.macro).to eq(:has_one)
    end
  end
end
