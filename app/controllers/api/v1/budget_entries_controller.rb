module Api
  module V1
    class BudgetEntriesController < ApplicationController
      before_action :authenticate_user!
      def create
        budget = Budget.find_by(user_id: current_user.id)
        budget_entry = BudgetEntry.new(budget_entry_params)
        budget_entry.date = Date.today
        budget_entry.budget_id = budget.id
        if budget_entry.save
          render json: BudgetEntrySerializer.new(budget_entry).serializable_hash.to_json
          else
          render json: budget_entry.errors.full_messages, status: 422
        end
      end

      def update
        budget_entry = BudgetEntry.find(params[:id])
        if budget_entry.update(budget_entry_params)
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
        params.require(:budget_entry).permit(:category, :name, :price)
      end
    end
  end
end