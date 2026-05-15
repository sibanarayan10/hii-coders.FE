import DOMPurify from 'dompurify';

export const QuoteBlock = ({ data }: { data: any }) => {
  return (
    <blockquote
      style={{
        borderLeft: '4px solid #1677ff',
        paddingLeft: '16px',
        margin: '20px 0',
        color: '#444',
        fontStyle: 'italic',
      }}
    >
      <div
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(data.text),
        }}
      />

      {data.caption && (
        <footer
          style={{
            marginTop: '10px',
            fontSize: '14px',
            color: '#888',
          }}
        >
          — {data.caption}
        </footer>
      )}
    </blockquote>
  );
};
