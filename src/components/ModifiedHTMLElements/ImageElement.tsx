import Image from 'next/image';
import tw from 'twin.macro';

import { HTMLElementProps } from './ModifiedHTMLElements.types';

type ImageElementProps = HTMLElementProps<HTMLImageElement>;
export const ImageElement = (props: ImageElementProps) => {
    const { alt, src } = props as ImageElementProps & {
        alt: string;
        src: string;
    };
    const [altText, dimension] = alt.split('+');
    const { width, height } = JSON.parse(dimension ?? '{}');

    return (
        <Image
            css={tw`rounded-xl`}
            width={width ?? 3200}
            height={height ?? 1800}
            src={src}
            alt={altText}
        />
    );
};
