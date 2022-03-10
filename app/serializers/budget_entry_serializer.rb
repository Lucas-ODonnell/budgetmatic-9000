class BudgetEntrySerializer
  include JSONAPI::Serializer
  attributes :category, :name, :price, :date
  belongs_to :budget
end
