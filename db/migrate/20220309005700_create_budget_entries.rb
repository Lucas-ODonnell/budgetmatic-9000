class CreateBudgetEntries < ActiveRecord::Migration[6.1]
  def change
    create_table :budget_entries do |t|
      t.string :category, null: false
      t.string :name, null: false
      t.integer :price, null: false
      t.date :date, null: false
      t.references :budget, null: false, foreign_key: true

      t.timestamps
    end
  end
end
