module Api
  module V1
    class BudgetEntriesController < ApplicationController
      before_action :authenticate_user!
      def index
        budget = Budget.find(params[:id])
        budget_entries = BudgetEntry.where(budget_id: budget.id)
        if params[:start].nil? || params[:end].nil?
          budget_entries = budget_entries.this_month
        elsif params[:start].empty? || params[:end].empty?
          budget_entries = budget_entries.this_month
          budget_entries = helpers.filter_categories(budget_entries)
          else
          budget_entries = helpers.filter_date(budget_entries)
          budget_entries = helpers.filter_categories(budget_entries)
        end
        render json: BudgetEntrySerializer.new(budget_entries).serializable_hash.to_json
      end

      def create
        budget_entry = BudgetEntry.new(budget_entry_params)
        budget_entry.date = Date.today
        budget_entry.user_id = current_user.id
        if budget_entry.save
          render json: BudgetEntrySerializer.new(budget_entry).serializable_hash.to_json
          else
          render json: budget_entry.errors.full_messages, status: 422
        end
      end

      def destroy
        budget_entry = BudgetEntry.find(params[:id])
        if budget_entry.destroy
          head :no_content
          else
          render json: budget_entry.errors.full_messages, status: 422
        end
      end

      private

      def budget_entry_params
        params.require(:budget_entry).permit(:category, :name, :price, :budget_id)
      end
    end
  end
end
