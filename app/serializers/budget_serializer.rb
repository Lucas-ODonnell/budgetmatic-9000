class BudgetSerializer
  include JSONAPI::Serializer
  attributes :name
  has_many :budget_entries

  attribute :monthly_budget do |object|
    monthly_budget = object.monthly_budget/100.0
    ApplicationHelper.number_to_currency(monthly_budget)
  end

  attribute :int_monthly_budget do |object|
    object.monthly_budget
  end

  attribute :category_totals do |object|
    total = Hash.new(0)
    object.budget_entries.this_month.each { |entry| total[entry.category] += entry.price }
    total
  end
end
