class BudgetSerializer
  include JSONAPI::Serializer
  attributes :name, :total_cost
  has_many :budget_entries

  attributes :total_cost do |object|
    cost = object.total_cost/100.0
    ApplicationHelper.number_to_currency(cost)
  end
end
