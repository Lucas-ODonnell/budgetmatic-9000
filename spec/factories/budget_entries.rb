FactoryBot.define do
  factory :budget_entry do
    category { "MyString" }
    name { "MyString" }
    price { 1 }
    date { "2022-03-08" }
    budget { nil }
  end
end
