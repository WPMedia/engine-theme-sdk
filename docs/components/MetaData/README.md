# MetaData

## Description:
The MetaData component is to be used only with-in output-type components. 
It handles the rendering of the title tags and all meta tags with the 
exception of the viewport meta tag.

## Usage

To import into an output-type component:
`import { MetaData } from '@wpmedia/engine-theme-sdk';`

### Props:

- MetaTag (required): The MetaTag function that is passed into an output type.
- MetaTags (required): The MetaTags function that is passed into an output type.
- metaValue (required): The metaValue function that is passed into an output type.
- globalContent (optional): The globalContent object that is obtained from the `useFusionContext()`
in the `fusion:context` module.
- websiteName (optional): The name of the website.
- twitterSite (optional): The corresponding twitter site name.

## Note
This component should be placed high in the `<head>` section of the 
output-type see example below for ideal positioning:

```
      <head>  
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {gtmID
          ? (
            <script dangerouslySetInnerHTML={{ __html: gaScript }} />
          ) : null}
        <MetaData
          MetaTag={MetaTag}
          MetaTags={MetaTags}
          metaValue={metaValue}
          globalContent={gc}
          websiteName={websiteName}
          twitterSite={twitterSite}
        />
``` 
