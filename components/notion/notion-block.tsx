import React from "react";
import { BaseBlock, ExtendedRecordMap } from "notion-types";
import { getListNumber, textDecorationsToString } from "@/utils/notion";
import { HighlightedCode } from "./highlighted-code";
import { NotionText } from "./notion-text";
import { TweetEmbed } from "./tweet-embed";

// https://github.com/NotionX/react-notion-x/blob/3aef81f18d79dfa5c86a27bf3934d13c77664323/packages/react-notion-x/src/utils.ts#L66
const YOUTUBE_DOMAINS = new Set([
  "youtu.be",
  "youtube.com",
  "www.youtube.com",
  "youtube-nocookie.com",
  "www.youtube-nocookie.com",
]);
export const getYoutubeId = (url: string): string | null => {
  try {
    const { hostname } = new URL(url);
    if (!YOUTUBE_DOMAINS.has(hostname)) {
      return null;
    }
    const regExp =
      /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/i;

    const match = url.match(regExp);
    if (match && match[2].length == 11) {
      return match[2];
    }
  } catch {
    // ignore invalid urls
  }
  return null;
};

function BlockRenderer({
  block,
  recordMap,
  children,
}: {
  block: BaseBlock;
  recordMap: ExtendedRecordMap;
  children: React.ReactNode;
}) {
  switch (block.type) {
    case "page": {
      return (
        <p>
          {block.content?.map((blockId) => (
            <NotionBlock
              blockId={blockId}
              recordMap={recordMap}
              key={blockId}
            />
          ))}
        </p>
      );
    }
    case "text":
      if (block.properties === undefined) {
        return <div className=""> </div>;
      }
      return (
        <div className="whitespace-pre-wrap my-4">
          <NotionText value={block.properties.title} recordMap={recordMap} />
        </div>
      );
    case "header":
    case "sub_header":
    case "sub_sub_header":
      return (
        <h2 className="my-1">
          <NotionText value={block.properties.title} recordMap={recordMap} />
        </h2>
      );
    case "image":
      return (
        // todo: replace with nexjs image
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`https://www.notion.so/image/${encodeURIComponent(
            block.properties.source[0][0]
          )}?table=block&id=${block.id}`}
          alt="PictureInTheBlog"
        />
      );
    case "bulleted_list":
    case "numbered_list": {
      const wrapList = (content: React.ReactNode, start?: number) =>
        block.type === "bulleted_list" ? (
          <ul>{content}</ul>
        ) : (
          <ol start={start}>{content}</ol>
        );
      let output = null;
      if (block.content) {
        output = (
          <>
            {block.properties && (
              <li>
                <NotionText
                  value={block.properties.title}
                  recordMap={recordMap}
                />
              </li>
            )}
            {wrapList(children)}
          </>
        );
      } else {
        output = block.properties ? (
          <li>
            <NotionText value={block.properties.title} recordMap={recordMap} />
          </li>
        ) : null;
      }
      const isTopLevel =
        block.type !== recordMap.block[block.parent_id]?.value?.type;
      const start = getListNumber(block.id, recordMap.block);
      return isTopLevel ? wrapList(output, start) : output;
    }
    case "code": {
      return (
        <div className="my-4">
          <HighlightedCode
            language={textDecorationsToString(
              block.properties.language
            ).toLowerCase()}
            code={textDecorationsToString(block.properties.title)}
          />
        </div>
      );
    }
    case "quote": {
      return (
        <blockquote>
          <NotionText value={block.properties?.title} recordMap={recordMap} />
        </blockquote>
      );
    }
    // case 'to_do': {
    //   const isChecked = block.properties?.checked?.[0]?.[0] === 'Yes'
    //   return (
    //     <div className={cs('notion-to-do', blockId)}>
    //       <div className='notion-to-do-item'>
    //         <components.Checkbox blockId={blockId} isChecked={isChecked} />

    //         <div
    //           className={cs(
    //             'notion-to-do-body',
    //             isChecked && `notion-to-do-checked`
    //           )}
    //         >
    //           <NotionText value={block.properties?.title} recordMap={block} />
    //         </div>
    //       </div>

    //       <div className='notion-to-do-children'>{children}</div>
    //     </div>
    //   )
    // }
    case "tweet": {
      const source =
        recordMap.signed_urls?.[block.id] ?? block.properties?.source?.[0]?.[0];
      const id = source.split("?")[0].split("/").pop();
      if (id === undefined) {
        return null;
      }
      return (
        <div className="my-4">
          <TweetEmbed tweetId={id} />
        </div>
      );
    }
    case "video": {
      const source =
        recordMap.signed_urls?.[block.id] ?? block.properties?.source?.[0]?.[0];
      const youtubeVideoId = getYoutubeId(source);
      if (youtubeVideoId !== null) {
        const params = new URLSearchParams(source.split("?")[1]);
        const startTime = params.get("t");
        return (
          <div className="my-4">
            <iframe
              src={`https://www.youtube.com/embed/${youtubeVideoId}${
                startTime !== null ? `?t=${startTime}` : ""
              }`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen={true}
              className="w-full aspect-video"
            ></iframe>
          </div>
        );
      }
      return (
        <div className="my-4">
          <video src={source} controls={true} playsInline={true} />
        </div>
      );
    }
    default:
      console.log(`unsupported: ${block.type}`);
      return null;
  }
}

export function NotionBlock({
  blockId,
  recordMap,
}: {
  blockId: string;
  recordMap: ExtendedRecordMap;
}) {
  const block = recordMap.block[blockId]?.value;
  return (
    <BlockRenderer block={block} recordMap={recordMap}>
      {block.content?.map((childBlockId) => {
        return (
          <NotionBlock
            blockId={childBlockId}
            recordMap={recordMap}
            key={childBlockId}
          />
        );
      })}
    </BlockRenderer>
  );
}
