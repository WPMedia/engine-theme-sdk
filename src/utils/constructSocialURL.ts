export enum SocialTypes {
  Email = 'email',
  Twitter = 'twitter',
  Instagram = 'instagram',
  Snapchat = 'snapchat',
  LinkedIn = 'linkedin',
  Reddit = 'reddit',
  Youtube = 'youtube',
  Medium = 'medium',
  Tumblr = 'tumblr',
  Pinterest = 'pinterest',
  SoundCloud = 'soundcloud',
  WhatsApp = 'whatsapp',
}

function constructSocialURL(type: string, field: string): string {
  switch (type) {
    case SocialTypes.Email:
      return `mailto:${field}`;
    case SocialTypes.Twitter:
      // https://twitter.com/jack
      return `https://twitter.com/${field}`;
    case SocialTypes.Instagram:
      // https://www.instagram.com/zuck/
      return `https://www.instagram.com/${field}/`;
    case SocialTypes.Snapchat:
      // https://www.snapchat.com/add/slc56
      return `https://www.snapchat.com/add/${field}`;
    case SocialTypes.LinkedIn:
      // https://www.linkedin.com/in/jackhowa/
      return `https://www.linkedin.com/in/${field}/`;
    case SocialTypes.Reddit:
      // https://www.reddit.com/user/NotAnishKapoor/
      return `https://www.reddit.com/user/${field}/`;
    case SocialTypes.Youtube:
      // https://www.youtube.com/user/chasereeves
      return `https://www.youtube.com/user/${field}`;
    case SocialTypes.Medium:
      // weird requires @ signs
      // https://medium.com/@dan_abramov
      return `https://medium.com/${field}`;
    case SocialTypes.Tumblr:
      // john green https://fishingboatproceeds.tumblr.com
      return `https://${field}.tumblr.com`;
    case SocialTypes.Pinterest:
      return `https://www.pinterest.com/${field}/`;
    case SocialTypes.SoundCloud:
      return `https://soundcloud.com/${field}`;
    case SocialTypes.WhatsApp:
      return `https://wa.me/${field}`;
    default:
      return field;
  }
}

export default constructSocialURL;
