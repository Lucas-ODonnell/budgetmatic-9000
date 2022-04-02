require 'faker'

FactoryBot.define do
  factory :user do
    name { Faker::Name.name }
    email { Faker::Internet.email }
    password { Faker::Internet.password }
  end

  factory :budget do
    name { Faker::Name.name }
    monthly_budget { "7,000" }
    user
  end

  factory :budget_entry do
    category { "Food" }
    name { Faker::Name.name}
    price { "$67.32" }
    date { Faker::Date.in_date_period(month:2)}
    budget
    user
  end
end
