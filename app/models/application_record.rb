class ApplicationRecord < ActiveRecord::Base
  primary_abstract_class

    # Add .render method to ActiveRecord objects. Located in app/lib/renderable
    include Renderable
end
