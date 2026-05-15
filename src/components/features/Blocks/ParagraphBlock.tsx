import DOMPurify from 'dompurify';

export const ParagraphBlock = ({ data }: { data: any }) => {
  return (
    <p
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(data.text),
      }}
    />
  );
};
