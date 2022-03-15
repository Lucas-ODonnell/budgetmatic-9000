class UserSerializer
  include JSONAPI::Serializer
  attributes  :id, :email, :name

  attribute :user_budget do |object|
    object.budget.name
  end

  attribute :budget_id do |object|
    object.budget.id
  end

end
