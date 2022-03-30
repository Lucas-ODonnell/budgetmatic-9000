class AddMonthlyBudgetToBudget < ActiveRecord::Migration[6.1]
  def change
    add_column :budgets, :monthly_budget, :integer
  end
end
