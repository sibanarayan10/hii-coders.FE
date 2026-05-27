import DOMPurify from 'dompurify';
import { THEME } from '../../constants/theme';
import { Typography } from 'antd';


const { Paragraph } = Typography;

export const BlockViewer = ({ blocks, showParagraphOnly = false }: { blocks: any[], showParagraphOnly: boolean }) => {
    return <Paragraph style={{ color: THEME.textPrimary, fontSize: 14, lineHeight: 1.9, marginBottom: 20 }}>
        {blocks.map((part: any,) => {
            if (showParagraphOnly && part.type === "paragraph") {
                return <ParagraphBlock data={part.data} />
            } else {
                switch (part.type) {
                    case "paragraph": {
                        return <ParagraphBlock data={part.data} />
                    }
                    case "header": {
                        return <HeaderBlock data={part.data} />
                    }
                    case "image": {
                        return (
                            <ImageBlock data={part.data} />
                        )
                    }
                    case "quote": {
                        return (
                            <QuoteBlock data={part.data} />
                        )
                    }

                }

            }
        }

        )}
    </Paragraph>
}

const QuoteBlock = ({ data }: { data: any }) => {
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

const ParagraphBlock = ({ data }: { data: any }) => {
    return (
        <p
            dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(data.text),
            }}
        />
    );
};

const ImageBlock = ({ data }: { data: any }) => {
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

const HeaderBlock = ({ data }: { data: any }) => {
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