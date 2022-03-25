module BudgetEntryHelper
  def filter_categories(budget_entries)
    categories = [
      "Food", "Utilities", "Housing", "Transportation", "Insurance",
      "Medical", "Investments", "Personal", "Entertainment", "Misc"
    ]
    category = []
    params.each do |_k,v|
      next unless categories.include?(v.capitalize)
      category << budget_entries.filter_category(v.capitalize) 
    end
    unless category.empty?
    budget_entries = category.flatten
    else
    budget_entries
    end
  end

  def filter_date(budget_entries)
    budget_entries.filter_date_range(params[:start], params[:end])
  end
end
