import DOMPurify from 'dompurify';

export const HeaderBlock = ({ data }: { data: any }) => {
  const level = data.level || 1;

  const text = DOMPurify.sanitize(data.text);

  switch (level) {
    case 1:
      return (
        <h1
          dangerouslySetInnerHTML={{
            __html: text,
          }}
        />
      );

    case 2:
      return (
        <h2
          dangerouslySetInnerHTML={{
            __html: text,
          }}
        />
      );

    case 3:
      return (
        <h3
          dangerouslySetInnerHTML={{
            __html: text,
          }}
        />
      );

    case 4:
      return (
        <h4
          dangerouslySetInnerHTML={{
            __html: text,
          }}
        />
      );

    default:
      return (
        <h2
          dangerouslySetInnerHTML={{
            __html: text,
          }}
        />
      );
  }
};
