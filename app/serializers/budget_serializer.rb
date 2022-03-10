class BudgetSerializer
  include JSONAPI::Serializer
  attributes :name
  has_many :budget_entries
end
