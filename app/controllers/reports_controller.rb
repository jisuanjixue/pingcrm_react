class ReportsController < ApplicationController
  # @route GET /reports (reports)
  def index
    render inertia: 'Reports/Index', props: {}
  end
end
