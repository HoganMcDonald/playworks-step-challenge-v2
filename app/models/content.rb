class Content < ApplicationRecord
  self.table_name = 'content'

  belongs_to :contest

  validates_presence_of :content_type, :text

  enum content_type: [:faq, :rules]
end
