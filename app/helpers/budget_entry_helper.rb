module BudgetEntryHelper
  def filter_results(budget_entries)
    categories = [
      "Food", "Utilities", "Housing", "Transportation", "Insurance",
      "Medical", "Investments", "Personal", "Entertainment", "Misc"
    ]
    category = []
    params.each do |_k,v|
      if categories.include?(v.capitalize)
        category << budget_entries.filter_category(v.capitalize)
      end
    end
    budget_entries = category.flatten
    budget_entries
  end
end
