export const ImageBlock = ({ data }: { data: any }) => {
  return (
    <div
      style={{
        margin: '20px 0',
      }}
    >
      <img
        src={data.file?.url}
        alt="problem"
        style={{
          maxWidth: '100%',
          borderRadius: '10px',
        }}
      />

      {data.caption && (
        <p
          style={{
            textAlign: 'center',
            color: '#666',
            marginTop: '8px',
          }}
        >
          {data.caption}
        </p>
      )}
    </div>
  );
};
