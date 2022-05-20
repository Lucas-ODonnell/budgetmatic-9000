class BudgetEntrySerializer
  include JSONAPI::Serializer
  attributes :category, :name, :price, :date
  belongs_to :budget
  attribute :price do |object|
    price = object.price/100.0
    ApplicationHelper.number_to_currency(price)
  end

  attribute :int_price do |object|
    object.price
  end
end
