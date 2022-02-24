# How And Why To Migrate From <Video /> to <VideoPlayer />

## Why?

### Faster Page Speeds With <VideoPlayer />

The `<Video />` requires output types to load powaboot and powadrive scripts on every page, even when there's no video. Yet the embed markup included already includes those required scripts. Therefore, those scripts will be loaded only when needed using the `<VideoPlayer />`.

Furthermore, the `<VideoPlayer />` only loads on the client-side. A server-side render of the video slowed down the page (and resulted in bugs in some cases).

## How

1. Replace `<Video>` with `<VideoPlayer>` in the import from `engine-theme-sdk` and usage.
2. Extract `embed_html` from ans object. If you need a utility to do so, please use `extractVideoEmbedFromStory` from `@wpmedia/engine-theme-sdk`. Pass in the html as `embedMarkup` to `<VideoPlayer />`. The html will look like:

```html
<div
	class="powa"
	id="powa-e924e51b"
	data-org="corecomponents"
	data-env="prod"
	data-uuid="powa-e924e51b"
	data-aspect-ratio="0.562"
	data-api="prod"
>
	<script src="//111.cloudfront.net/prod/powaBoot.js?org=corecomponents"></script>
</div>
'
```

3. Remove powaBoot.js and powaDrive.js from output types. See [example](https://github.com/WPMedia/fusion-news-theme-blocks/commit/6e1ac8cbcb11539936130c9d4215c454c7d96661) for migration.

## Breaking Changes

- `aspectRatio` will default to what's passed inside the embed markup script rather than defaulting to `0.562`. You can still override the `aspectRatio` if specified.
