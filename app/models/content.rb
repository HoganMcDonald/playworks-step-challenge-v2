class Content < ApplicationRecord
  validates_presence_of :content_type, :text

  enum content_type: [:faq, :rules]
end
