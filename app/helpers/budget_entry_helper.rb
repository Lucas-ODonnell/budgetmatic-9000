module BudgetEntryHelper
  def filter_categories(budget_entries)
    category = []
    params.each do |_k,v|
      category << budget_entries.filter_category(v.capitalize)
    end
    unless category.first.empty?
    budget_entries = category.flatten
    else
    budget_entries
    end
  end

  def filter_date(budget_entries)
    budget_entries.filter_date_range(params[:start], params[:end])
  end
end
