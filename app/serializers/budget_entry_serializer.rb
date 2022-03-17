class BudgetEntrySerializer
  include JSONAPI::Serializer
  attributes :category, :name, :price, :date
  belongs_to :budget
  attribute :date do |object|
    object.date.strftime("%B")
  end

  attribute :price do |object|
    price = object.price/100.0
    ApplicationHelper.number_to_currency(price)
  end
end
