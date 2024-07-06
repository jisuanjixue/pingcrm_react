module Renderable
  def serializer(view = nil)
    self.class.serializer_name(view).constantize
  end

  def render(view: nil, options: {})
    serializer(view).render(self, options)
  end

  module ClassMethods
    def serializer(view = nil)
      serializer_name(view).constantize
    end

    def serializer_name(view = nil)
      if view
        "#{name.pluralize.camelize}::#{view.to_s.camelize}Serializer"
      else
        "#{name}Serializer"
      end
    end

    def render(view: nil, options: {})
      serializer(view).render(self, options)
    end
  end

  def self.included(base)
    base.extend(ClassMethods)
  end
end
