require "active_support/concern"

module InertiaErrors
  extend ActiveSupport::Concern

  included do
    rescue_form ActiveRecord::RecordNotFound do
      render inertia: 'Error/Show', props: { status: 404 }, status: :not_found
    end
end