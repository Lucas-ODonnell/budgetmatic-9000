require 'faker'

FactoryBot.define do
  factory :budget do
    name { Faker::Name.name }
  end

  factory :budget_entry do
    category { "Food" }
    name { Faker::Name.name}
    price { "$67.32" }
    date { Faker::Date.in_date_period(month:2)}
    budget
  end
end
