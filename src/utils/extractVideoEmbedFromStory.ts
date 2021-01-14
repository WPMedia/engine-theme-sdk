interface SchemaANS {
  type: string;
  promo_items?: {
    lead_art?: {
      type?: string;
      embed_html?: string;
    };
    basic?: {
      type?: string;
    };
  };
  embed_html?: string;
}

const extractVideoEmbedFromStory = (content: SchemaANS): string => {
  if (content && content.type === 'video') {
    return content.embed_html;
  }

  if (
    (content && content.type === 'story') && (
      content.promo_items
      && content.promo_items.lead_art
      && content.promo_items.lead_art.type === 'video'
    )
  ) {
    return content.promo_items.lead_art.embed_html;
  }

  return undefined;
};

export default extractVideoEmbedFromStory;
