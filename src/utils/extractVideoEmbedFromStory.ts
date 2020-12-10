const extractVideoEmbedFromStory = (content) => {
  if (!content || !content.type) return undefined;
  const contentEl = (
    (content.type === 'video' && content) || (
      content.type === 'story'
      && content.promo_items
      && content.promo_items.lead_art
      && content.promo_items.lead_art.type
      && content.promo_items.lead_art.type === 'video'
        ? content.promo_items.lead_art : undefined
    )
  );
  return contentEl ? contentEl.embed_html : undefined;
};

export default extractVideoEmbedFromStory;
