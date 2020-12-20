class Content < ApplicationRecord
  validates_presenece_of :content_type, :text

  enum content_type: [:faq, :rules]
end
