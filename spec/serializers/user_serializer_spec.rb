require_relative '../rails_helper.rb';
require 'json'

RSpec.describe User, type: :serializer do
  describe 'budget_serializer' do
    let(:user) {create(:user)}
    let(:json) { UserSerializer.new(user).serializable_hash.to_json }       
    let(:attributes) { JSON.parse(json)["data"] }

    context 'it serializes json' do
      it "should successfully serialize name" do
        expect(attributes["attributes"]["name"]).to eq(user.name)
      end
      it "should successfully serialize email" do
        expect(attributes["attributes"]["email"]).to eq(user.email)
      end
    end
  end
end

