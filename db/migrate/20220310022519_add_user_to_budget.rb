class AddUserToBudget < ActiveRecord::Migration[6.1]
  def change
    add_reference :budgets, :user, null: false, foreign_key: true
  end
end
