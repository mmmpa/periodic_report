module MarkdownRenderer
  extend ActiveSupport::Concern

  class Renderer < Redcarpet::Render::HTML
    def block_code(code, language)
      Pygments.highlight(code, lexer: language)
    end
  end

  included do |klass|
    attr_accessor :use_raw

    class << klass
      attr_accessor :markdown

      def render(*args)
        self.markdown ||= Redcarpet::Markdown.new(
          Renderer,
          autolink: true,
          tables: true,
          fenced_code_blocks: true
        )

        markdown.render(*args)
      end
    end

    def render_as_markdown!
      return if raw.nil?
      self.html = !!use_raw ? markdown : self.class.render(raw)
    end
  end
end