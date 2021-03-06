import { format } from 'date-fns';
import { getMDXComponent } from 'mdx-bundler/client';
import { useMemo } from 'react';
import tw, { css } from 'twin.macro';

import SocialShare from '../../page-components/shared/components/SocialShare';
import { backgroundStyle, textStyle } from '../../styles/GlobalStyles';
import { ArticleCanvasProps as ArticleCanvasProperties } from './ArticleCanvas.types';
import { elementComponentMapping } from './ArticleCanvas.utils';

const defaultStyles = css({
    a: tw`text-rose-600 dark:text-blue-600 focus:(outline-width[3px] outline-style[dotted] outline-offset[3px] outline-color[currentColor])`,
    'ul, ol': tw`ml-8`,
    'h1, h2, h3, h4, h5, h6, pre, p, ul, ol, img': tw`my-5`,
    li: tw`list-style[decimal] p-1.5`,
});

const articleCanvasStyles = css([
    tw`max-w-[800px] my-16 mx-auto pt-5 pb-12 px-4 sm:(px-6 pt-7) md:(px-8 pt-12) rounded-xl`,
]);

export function ArticleCanvas({ code, frontmatter }: ArticleCanvasProperties) {
    const ArticleContent = useMemo(() => getMDXComponent(code), [code]);
    const publishedDate = format(
        new Date(frontmatter.publishedDate),
        'LLL do, yyyy'
    );
    return (
        <div>
            <main
                css={[
                    textStyle,
                    backgroundStyle,
                    defaultStyles,
                    articleCanvasStyles,
                ]}
            >
                <header css={tw`my-5`}>
                    <h1 css={tw`leading-9 text-center`}>{frontmatter.title}</h1>
                    <div
                        css={tw`border-t  border-gray-500 border-b py-2 my-8 `}
                    >
                        <div
                            css={tw`grid grid-cols-2 place-items-center max-w-xl mx-auto`}
                        >
                            <p css={tw`m-0!`}>{publishedDate}</p>
                            <p css={tw`m-0!`}>{frontmatter.author}</p>
                        </div>
                    </div>
                </header>
                <ArticleContent components={elementComponentMapping} />
                <SocialShare title={frontmatter.title} />
            </main>
        </div>
    );
}
