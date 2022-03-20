class RemoveTotalCostFromBudget < ActiveRecord::Migration[6.1]
  def change
    remove_column :budgets, :total_cost, :int
  end
end
